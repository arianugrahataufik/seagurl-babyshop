import React from "react";
import { FaTruck } from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="bg-cyan-700 text-white text-sm px-4 py-2 relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-2 sm:gap-0">
        {/* Kiri: Info pengiriman */}
        <div className="flex items-center gap-2">
          <FaTruck className="text-white" />
          <span className="text-center sm:text-left">
            Free shipping on orders over <strong>$150</strong>
          </span>
        </div>

        {/* Kanan: Link Login/Register */}
        <div className="flex gap-4 text-center sm:text-right">
          <a href="/login" className="hover:underline transition duration-200">
            Login
          </a>
          <a href="/register" className="hover:underline transition duration-200">
            Register
          </a>
        </div>
      </div>

      {/* Scallop Border */}
      <div className="absolute top-full left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[30px]"
        >
          <path
            d="M0,0 C50,100 150,100 200,0 C250,100 350,100 400,0 C450,100 550,100 600,0 C650,100 750,100 800,0 C850,100 950,100 1000,0 C1050,100 1150,100 1200,0 L1200,120 L0,120 Z"
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
};

export default TopHeader;
