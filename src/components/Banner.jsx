import { FaArrowRight } from "react-icons/fa";

export default function Banner() {
  return (
    <div id="promo-banner-container" className="px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-pink-50 p-6 sm:p-8 rounded-xl shadow-md">

        {/* Left Text Side */}
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left mt-6 lg:mt-0">
          <p className="text-sm font-poppins-bold text-pink-500">
            Welcome Back, Admin 👋
          </p>
          <h2 className="text-2xl sm:text-3xl font-poppins-bold text-pink-800 leading-snug">
            Your Babyshop Dashboard at a Glance
          </h2>
          <p className="text-pink-700 text-sm sm:text-base font-poppins">
            Track orders, deliveries, and customer satisfaction. Manage everything with love — because every baby deserves the best! 💕
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="mt-3 inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-barlow-bold px-5 py-3 rounded-lg text-sm transition">
              <span>Manage Products</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3731/3731013.png"
            alt="Baby Product"
            className="w-40 sm:w-52 lg:w-60"
          />
        </div>
      </div>
    </div>
  );
}
