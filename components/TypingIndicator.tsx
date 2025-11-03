
import React from 'react';
import { BotIcon } from './Icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
        <BotIcon />
      </div>
      <div className="max-w-lg px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 rounded-tl-none shadow-md">
        <div className="flex items-center justify-center space-x-1 h-5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot-1"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot-2"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
