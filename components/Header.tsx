
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
            NexusAI
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </nav>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
          Connect
        </button>
      </div>
    </header>
  );
};
