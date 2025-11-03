
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Personality, Theme, User, ViewMode } from './types';
import { PROMPT_CATEGORIES, PERSONALITY_PROMPTS } from './constants';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AuthPage from './components/AuthPage';
import PreviewWindow from './components/PreviewWindow';
import { SunIcon, MoonIcon, MenuIcon, ChatIcon, PreviewIcon } from './components/Icons';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(`chatHistory_${currentUser?.email}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [personality, setPersonality] = useState<Personality>('Friendly');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTtsEnabled, setTtsEnabled] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [previewContent, setPreviewContent] = useState({ html: '', css: '' });

  const chatRef = useRef<Chat | null>(null);
  const recognitionRef = useRef<any>(null);

  const initializeChat = useCallback(() => {
    try {
      if (process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: PERSONALITY_PROMPTS[personality],
          },
        });
      }
    } catch (error) {
      console.error("Failed to initialize Gemini chat:", error);
    }
  }, [personality]);

  useEffect(() => {
    if (currentUser) {
      initializeChat();
    }
  }, [currentUser, initializeChat]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`chatHistory_${currentUser.email}`, JSON.stringify(messages));
    }
  }, [messages, currentUser]);
  
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);
  
  const parseCodeFromResponse = (text: string) => {
    const htmlMatch = text.match(/```html([\s\S]*?)```/);
    const cssMatch = text.match(/```css([\s\S]*?)```/);
    return {
        html: htmlMatch ? htmlMatch[1].trim() : '',
        css: cssMatch ? cssMatch[1].trim() : '',
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { author: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setViewMode('chat');

    try {
      if (!chatRef.current) throw new Error("Chat not initialized. Check your API key.");
      
      const response = await chatRef.current.sendMessage({ message: text });
      const botMessageContent = response.text;
      
      const { html, css } = parseCodeFromResponse(botMessageContent);
      if (html || css) {
        setPreviewContent({ html, css });
        setViewMode('preview');
      }

      const botMessage: Message = { author: 'bot', content: botMessageContent };
      setMessages((prev) => [...prev, botMessage]);

      if (isTtsEnabled) speak(botMessageContent);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        author: 'bot',
        content: "I'm having trouble connecting right now. Please check your API key or try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (setInputText: (text: string) => void) => {
    if (!recognitionRef.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      return;
    }
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleSendMessage(transcript);
    };
    recognitionRef.current.start();
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/```[\s\S]*?```/g, '')); // remove code blocks from speech
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error("Speech synthesis error", e);
        setIsSpeaking(false);
      }
      speechSynthesis.speak(utterance);
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (currentUser) {
        localStorage.removeItem(`chatHistory_${currentUser.email}`);
    }
    initializeChat();
  };
  
  const downloadChat = () => {
    const chatText = messages.map(m => `${m.author.toUpperCase()}: ${m.content}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChatGPTZ-history-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePersonalityChange = (newPersonality: Personality) => {
    setPersonality(newPersonality);
    clearChat();
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    const savedMessages = localStorage.getItem(`chatHistory_${user.email}`);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setMessages([]);
  };

  if (!currentUser) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }
  
  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900`}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-indigo-50/10 via-purple-100/10 to-transparent dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-transparent animate-background-pan"></div>
      
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        promptCategories={PROMPT_CATEGORIES}
        onPromptClick={(prompt) => handleSendMessage(prompt)}
        clearChat={clearChat}
        downloadChat={downloadChat}
        personality={personality}
        onPersonalityChange={handlePersonalityChange}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out">
        <header className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 md:hidden">
              <MenuIcon />
            </button>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
              ChatGPTZ
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-full bg-black/5 dark:bg-white/5">
                <button
                  onClick={() => setViewMode('chat')}
                  className={`px-3 py-1 text-sm font-semibold flex items-center gap-1 rounded-full transition-colors ${viewMode === 'chat' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                  <ChatIcon className="w-4 h-4" /> Chat
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 text-sm font-semibold flex items-center gap-1 rounded-full transition-colors ${viewMode === 'preview' ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                >
                  <PreviewIcon className="w-4 h-4" /> Preview
                </button>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </header>

        {viewMode === 'chat' ? (
            <ChatWindow 
            messages={messages} 
            isLoading={isLoading} 
            isTtsEnabled={isTtsEnabled}
            setTtsEnabled={setTtsEnabled}
            isSpeaking={isSpeaking}
            stopSpeaking={() => speechSynthesis.cancel()}
            onSendMessage={handleSendMessage} 
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
            />
        ) : (
            <PreviewWindow html={previewContent.html} css={previewContent.css} />
        )}
      </main>
    </div>
  );
};

export default App;
