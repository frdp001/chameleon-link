
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-lg font-bold text-gray-900">NexusAI</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">© 2024 NexusAI. Built with passion & precision.</p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
