import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-center">
        <div className="text-white text-xl font-bold tracking-wider font-serif">TUBEMOTOR</div>
        <div className="text-gray-300 text-xs tracking-[0.2em]">AI</div>
        <div className="text-blue-300 text-[10px] tracking-widest font-light mt-1">CONTENT SUITE</div>
      </div>
    </div>
  );
};

export default Logo;