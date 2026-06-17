import React from 'react';

const TopBanner = () => {
  return (
    <div className="bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto">

        <div className="py-3 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">

            🔥 FREE SHIPPING ON ORDERS OVER $100
            <span className="mx-10">•</span>

            NEW SUMMER COLLECTION NOW LIVE
            <span className="mx-10">•</span>

            PREMIUM FABRICS
            <span className="mx-10">•</span>

            EXCLUSIVE LIMITED DROPS
            <span className="mx-10">•</span>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBanner;