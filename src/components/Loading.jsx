import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E9DED6] text-gray-700">
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-[#FFB86B] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-4 h-4 bg-[#FF6B6B] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-4 h-4 bg-[#6BCB77] rounded-full animate-bounce" />
      </div>
      <p className="text-lg font-medium tracking-wide">Sabar boss, lagi loading...</p>
    </div>
  );
};

export default Loading;
