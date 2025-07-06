import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden bg-gray-950">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black animate-gradient-xy"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob-1"></div>
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob-2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob-3"></div>
    </div>
  );
};

export default Background;
