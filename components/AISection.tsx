
import React, { useState } from 'react';
import { askGemini } from '../services/geminiService';

export const AISection: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    
    const result = await askGemini(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Nexus Assistant</h2>
        </div>
        {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>}
      </div>

      <div className="p-8">
        {!response && !loading && (
          <div className="text-center py-10 text-gray-400 italic">
            Ask me anything about web development, AI, or this starter kit...
          </div>
        )}

        {response && (
          <div className="prose prose-indigo max-w-none p-6 bg-indigo-50/30 rounded-2xl text-gray-800 leading-relaxed whitespace-pre-wrap animate-in fade-in zoom-in-95 duration-500">
            {response}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to build today?"
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-16"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
