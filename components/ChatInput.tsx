
import React, { useState, useRef, KeyboardEvent } from 'react';
import { SendIcon, MicIcon, VolumeOnIcon, VolumeOffIcon, StopIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onVoiceInput: (setInputText: (text: string) => void) => void;
  isListening: boolean;
  isTtsEnabled: boolean;
  setTtsEnabled: (enabled: boolean) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onVoiceInput,
  isListening,
  isTtsEnabled,
  setTtsEnabled,
  isSpeaking,
  stopSpeaking,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceClick = () => {
    onVoiceInput(setText);
  }

  return (
    <div className="p-4 md:p-6 bg-white/30 dark:bg-black/30 backdrop-blur-md border-t border-black/10 dark:border-white/10">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        
        { isSpeaking ? (
          <button
              onClick={stopSpeaking}
              className="p-3 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors"
              aria-label="Stop speaking"
            >
              <StopIcon />
          </button>
        ) : (
          <button
            onClick={() => setTtsEnabled(!isTtsEnabled)}
            className={`p-3 rounded-full ${isTtsEnabled ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'} hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 transition-colors`}
            aria-label="Toggle text-to-speech"
          >
            {isTtsEnabled ? <VolumeOnIcon /> : <VolumeOffIcon />}
          </button>
        )}

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or ask anything..."
            rows={1}
            className="w-full py-3 pl-4 pr-12 text-md bg-gray-100 dark:bg-gray-800 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent max-h-40"
            disabled={isLoading}
          />
          <button
            onClick={handleVoiceClick}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
              isListening ? 'text-red-500 animate-pulse' : 'text-gray-500 hover:text-purple-600'
            }`}
            disabled={isLoading}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            <MicIcon />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="p-3 rounded-full bg-purple-600 text-white disabled:bg-purple-400 disabled:cursor-not-allowed hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
