
import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-24 pb-16 text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
        The Future of Web <br /> 
        <span className="text-indigo-600">Built with Intelligence</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
        NexusAI is a clean, modern foundation for your next project. We combine the power of React 18 with Gemini's advanced reasoning capabilities.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={onGetStarted}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          Try Assistant Now
        </button>
        <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all">
          View Docs
        </button>
      </div>
    </section>
  );
};
