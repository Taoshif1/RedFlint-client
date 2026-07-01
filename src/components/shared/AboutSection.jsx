import React from "react";

const AboutSection = () => {
  return (
    <div className="min-h-[70vh] bg-base-200 flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-6xl w-full border border-base-300 overflow-hidden p-8 lg:p-12 items-center gap-8 lg:gap-12">
        

        <div className="flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-base-200 flex items-center justify-center p-4 ring-4 ring-primary/10 shadow-inner">

            <img
              src="YOUR_LOGO_URL"
              alt="RedFlint Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
        
      
        <div className="flex-1 text-center lg:text-left">
          
          <h2 className="text-3xl font-extrabold text-base-content tracking-tight mb-4">
            <span className="text-red-600">RedFlint</span> × Men's Fashion Network
          </h2>
          
          <p className="text-base-content/70 text-base leading-relaxed max-w-2xl">
            <strong className="text-red-600 font-bold">RedFlint</strong> is a premium menswear collaboration platform dedicated to scaling digital apparel brands. We partner with leading men's clothing websites and manufacturers to optimize supply chains, integrate smart sharing technology, and unlock sustainable retail solutions for modern consumers worldwide.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
