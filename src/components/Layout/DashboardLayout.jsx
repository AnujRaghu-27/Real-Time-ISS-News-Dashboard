import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatBotButton from '../Dashboard/ChatBotButton';
import { motion } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-800">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 lg:p-6 mt-16 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      <ChatBotButton />
    </div>
  );
};

export default DashboardLayout;
