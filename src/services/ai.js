import axios from 'axios';

// Calling local Vite proxy endpoint to hide token and bypass CORS
const PROXY_URL = '/api/chat';

export const chatWithAstra = async (userMessage, context) => {
  // We no longer need to check for HF_TOKEN here as the proxy handles it securely
  
  const systemPrompt = `You are Astra, an ISS Mission Control AI.
CONTEXT:
- Position: ${context.issLocation}
- Astronauts: ${context.crew.map(p => p.name).join(', ')}
- News: ${context.news.map(a => a.title).join(' | ')}

RULE: Answer ONLY using the context above. If information is missing, say you don't have that data.`;

  const fullPrompt = `<s>[INST] ${systemPrompt}\n\nUser: ${userMessage} [/INST]`;

  console.log('Astra: Routing request through mission proxy...');

  try {
    const response = await axios.post(
      PROXY_URL,
      {
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false
        },
        options: {
          wait_for_model: true
        }
      },
      {
        // No Authorization header here - handled by Vite proxy
        timeout: 60000
      }
    );

    console.log('Astra: Proxy downlink successful.');

    const result = response.data[0]?.generated_text || response.data?.generated_text;
    
    if (!result) {
      console.warn('Astra: Received empty response from proxy', response.data);
      return "The satellite signal is weak. I couldn't interpret the telemetry.";
    }

    return result.trim();

  } catch (error) {
    console.error('Astra: Proxy Uplink Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 503) {
      return "Mission control AI is initializing through proxy. Please retry in 20 seconds.";
    }
    
    if (error.response?.status === 404) {
      return "Proxy Error: AI Endpoint not found. Please verify vite.config.js configuration.";
    }

    throw new Error(error.response?.data?.error || 'Uplink failed via proxy');
  }
};
