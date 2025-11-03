import React from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Split by ``` blocks, keeping the delimiters
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null; // handle empty strings from split

        if (part.startsWith('```')) {
          // It's a code block
          const code = part.replace(/```(?:\w+\n)?([\s\S]+)```/, '$1').trim();
          return (
            <pre key={index} className="code-block">
              <code>{code}</code>
            </pre>
          );
        } else {
          // It's regular text with potential inline markdown
          const html = part
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            .replace(/\n/g, '<br />');
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        }
      })}
    </>
  );
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.author === 'bot';

  return (
    <div className={`flex items-start gap-4 animate-fade-in ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
          <BotIcon />
        </div>
      )}
      <div
        className={`max-w-lg md:max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed chat-message-content ${
          isBot
            ? 'bg-white dark:bg-gray-800 rounded-tl-none shadow-md'
            : 'bg-purple-600 text-white rounded-br-none shadow-lg'
        }`}
      >
        {isBot ? (
          <ContentRenderer content={message.content} />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
