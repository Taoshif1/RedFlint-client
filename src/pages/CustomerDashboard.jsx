import React from "react";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-[#fcf9f6] text-[#231b1b] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Main Profile Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-gray-200 pb-8 pt-6">
          <div className="flex items-center gap-6">
            
            {/* Profile Image Box */}
            <div className="w-[100px] h-[100px] bg-gray-300 overflow-hidden">
              <img 
                src="https://unsplash.com" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* User Details and Typography */}
            <div className="flex flex-col justify-end h-[100px] pb-1">
              <p className="text-[10px] tracking-wider text-gray-400 uppercase font-semibold mb-2">
                Account Member Since 2022
              </p>
              <h2 className="text-3xl font-bold tracking-wide text-[#231b1b] leading-none mb-2">
                ALEXANDER VAUGHN
              </h2>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                vaughn.design@studio.com
              </p>
            </div>
          </div>

          {/* 2. Action Buttons (Edit Profile & Logout) */}
          <div className="flex gap-3 w-full md:w-auto">
            <button className="border border-[#231b1b] text-[#231b1b] bg-transparent rounded-none text-[10px] tracking-widest uppercase px-6 py-3 font-bold hover:bg-[#231b1b] hover:text-white transition-all duration-300">
              Edit Profile
            </button>
            <button className="bg-[#231b1b] text-white border border-[#231b1b] rounded-none text-[10px] tracking-widest uppercase px-6 py-3 font-bold hover:bg-gray-800 transition-all duration-300">
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
