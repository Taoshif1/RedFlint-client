import React from 'react';

export default function RedFlintLogo() {
  return (
    <div className="flex items-center text-2xl font-black italic tracking-wider select-none p-4 w-fit red-hat-display-900">
      {/* Double Slash */}
      <span className="text-white mr-1.5">//</span>
      
      {/* RED Text */}
      <span className="text-[#E50000]">RED</span>
      
      {/* FLINT Pill Block */}
      <span className="bg-white text-black px-1 py-0.5 rounded-[12px] ml-1 font-black">
        FLINT
      </span>
    </div>
  );
}
