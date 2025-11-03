
import React, { useState } from 'react';

interface PreviewWindowProps {
  html: string;
  css: string;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ html, css }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>
  `;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="p-2 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="flex items-center justify-center">
            <div className="flex items-center p-1 rounded-full bg-black/5 dark:bg-white/5">
                <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full ${activeTab === 'preview' ? 'bg-white dark:bg-gray-700 shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                Preview
                </button>
                <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full ${activeTab === 'code' ? 'bg-white dark:bg-gray-700 shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                Code
                </button>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'preview' ? (
          <iframe
            srcDoc={srcDoc}
            title="Website Preview"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            className="border-0"
          />
        ) : (
          <div className="p-4 md:p-6 text-sm text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-bold mb-2 text-purple-500">HTML</h3>
            <pre className="p-4 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-x-auto">
              <code>{html || '// No HTML code generated.'}</code>
            </pre>
            <h3 className="text-lg font-bold mt-6 mb-2 text-purple-500">CSS</h3>
            <pre className="p-4 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-x-auto">
              <code>{css || '// No CSS code generated.'}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewWindow;
