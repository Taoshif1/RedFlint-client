import React from 'react';

export default function RedFlintLogo() {
  return (
    <div className="flex items-center text-2xl font-black italic tracking-wider select-none p-4 w-fit red-hat">
      {/* Double Slash */}
      <span className="text-white mr-1.5">//</span>
      
      {/* RED Text - Now uses your theme primary red */}
      <span className="text-primary">RED</span>
      
      {/* FLINT Pill Block */}
      <span className="bg-base-content text-base-100 px-1.5 py-0.5 rounded-box ml-1 font-black">
        FLINT
      </span>
    </div>
  );
}
