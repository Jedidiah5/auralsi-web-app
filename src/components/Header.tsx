import React from 'react';
import { FileSearch } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden">
              <img 
                src="/logo.ico" 
                alt="Auralis Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Auralis
              </h1>
              <p className="text-sm text-gray-400">AI Document Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <FileSearch className="w-4 h-4" />
            <span>Upload • Analyze • Understand</span>
          </div>
        </div>
      </div>
    </header>
  );
};