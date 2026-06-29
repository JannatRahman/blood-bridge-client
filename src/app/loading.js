import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute w-24 h-24 bg-red-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
        
        {/* Inner Spinning Ring */}
        <div className="w-16 h-16 border-4 border-red-900/30 border-t-red-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <h2 className="mt-6 text-lg font-medium tracking-widest text-red-500 uppercase animate-pulse">
        Loading
      </h2>
    </div>
  );
};

export default Loading;