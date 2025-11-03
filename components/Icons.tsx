
import React from 'react';

const createIcon = (path: React.ReactNode): React.FC<{className?: string}> => ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {path}
  </svg>
);

export const SunIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  />
);

export const MoonIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  />
);

export const MenuIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />);

export const CloseIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />);

export const ChevronDownIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />);

export const ClearIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  />
);

export const IdeaIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  />
);

export const PersonalityIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  />
);

export const BotIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.785a2.5 2.5 0 015 0V4h-5v-.215zM6 6h12M7 9h10M7 12h10m-9 3h8m-5 3h2M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-3H8l-3 3z" />
);

export const UserIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
);

export const SendIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
);

export const MicIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
);

export const VolumeOnIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
);

export const VolumeOffIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.06v15.88a2.25 2.25 0 003.473 1.942l4.28-3.057a2.25 2.25 0 000-3.884l-4.28-3.057A2.25 2.25 0 009 4.06zM16.5 12l4.5-4.5m0 4.5-4.5-4.5" />
);

export const StopIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.253 9.253 9 9.563 9h4.874c.31 0 .563.253.563.563v4.874c0 .31-.253.563-.563.563H9.563A.563.563 0 019 14.437V9.563z" />
);

export const LogoutIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
);

export const DownloadIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
);

export const PreviewIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
);

export const ChatIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
);
