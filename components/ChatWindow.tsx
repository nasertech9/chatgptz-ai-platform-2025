
import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  isTtsEnabled: boolean;
  setTtsEnabled: (enabled: boolean) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  onSendMessage: (text: string) => void;
  onVoiceInput: (setInputText: (text: string) => void) => void;
  isListening: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  isTtsEnabled,
  setTtsEnabled,
  isSpeaking,
  stopSpeaking,
  onSendMessage,
  onVoiceInput,
  isListening
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        onVoiceInput={onVoiceInput}
        isListening={isListening}
        isTtsEnabled={isTtsEnabled}
        setTtsEnabled={setTtsEnabled}
        isSpeaking={isSpeaking}
        stopSpeaking={stopSpeaking}
      />
    </div>
  );
};

export default ChatWindow;
