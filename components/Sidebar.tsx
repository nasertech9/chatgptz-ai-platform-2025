
import React, { useState } from 'react';
import { Personality, PromptCategory, User } from '../types';
import { ChevronDownIcon, ClearIcon, CloseIcon, DownloadIcon, IdeaIcon, LogoutIcon, PersonalityIcon, UserIcon } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  promptCategories: PromptCategory[];
  onPromptClick: (prompt: string) => void;
  clearChat: () => void;
  downloadChat: () => void;
  personality: Personality;
  onPersonalityChange: (personality: Personality) => void;
  currentUser: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  promptCategories,
  onPromptClick,
  clearChat,
  downloadChat,
  personality,
  onPersonalityChange,
  currentUser,
  onLogout
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(promptCategories[0]?.name || null);

  const personalities: Personality[] = ['Friendly', 'Professional', 'Creative', 'Witty'];

  const handlePromptClick = (prompt: string) => {
    onPromptClick(prompt);
    if (window.innerWidth < 768) { // md breakpoint
      setIsOpen(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed md:relative top-0 left-0 z-40 flex flex-col h-full w-64 md:w-72 bg-white/50 dark:bg-black/50 backdrop-blur-lg border-r border-black/10 dark:border-white/10 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-lg font-semibold">ChatGPTZ Menu</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <IdeaIcon />
                Prompt Ideas
              </h3>
              <div className="space-y-1">
                {promptCategories.map((category) => (
                  <div key={category.name}>
                    <button
                      onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                      className="flex items-center justify-between w-full p-2 text-left rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <span className="font-medium">{category.name}</span>
                      <ChevronDownIcon className={`transform transition-transform ${openCategory === category.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openCategory === category.name && (
                      <div className="pl-4 mt-1 space-y-1 border-l-2 border-purple-500/50">
                        {category.prompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handlePromptClick(prompt)}
                            className="w-full p-2 text-sm text-left text-gray-600 dark:text-gray-300 rounded-md hover:bg-purple-500/10"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <PersonalityIcon />
                AI Personality
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {personalities.map((p) => (
                  <button
                    key={p}
                    onClick={() => onPersonalityChange(p)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      personality === p
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button
                onClick={clearChat}
                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-500/10 rounded-md hover:bg-red-500/20"
              >
              <ClearIcon />
              Clear Chat
            </button>
          </div>
        </div>

        <div className="p-2 border-t border-black/10 dark:border-white/10">
            <div className='p-2 rounded-lg bg-black/5 dark:bg-white/5'>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                </div>
                <div className='space-y-2'>
                    <button
                        onClick={downloadChat}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-300 bg-purple-500/10 rounded-md hover:bg-purple-500/20"
                    >
                        <DownloadIcon />
                        Download Chat
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/10 rounded-md hover:bg-black/10 dark:hover:bg-white/20"
                    >
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
