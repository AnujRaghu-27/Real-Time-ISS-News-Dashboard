import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      {
        name: 'astra-chat-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const hfResponse = await axios.post(
                    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
                    JSON.parse(body),
                    {
                      headers: {
                        'Authorization': `Bearer ${env.VITE_AI_TOKEN}`,
                        'Content-Type': 'application/json'
                      }
                    }
                  );
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(hfResponse.data));
                } catch (error) {
                  console.error('Middleware Error:', error.response?.data || error.message);
                  res.statusCode = error.response?.status || 500;
                  res.end(JSON.stringify(error.response?.data || { error: 'Uplink failed' }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ]
  }
})
