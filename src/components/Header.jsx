import { FaSearch, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#e9dcd2] rounded-b-2xl shadow-md">
      {/* Left: Page Title */}
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-72">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Notification Icon */}
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <FaBell className="text-gray-600 text-sm" />
        </button>

        {/* Profile Info */}
        <div className="flex items-center bg-white rounded-full px-2 py-1 pr-3 shadow-sm">
          <img
            src="/img/profile/user1.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-black leading-tight mb-1.5">
              Seagull Airra
            </p>
            <p className="text-xs text-gray-500 -mt-1">Product manager</p>
          </div>
          <IoMdArrowDropdown className="text-gray-500 ml-2" />
        </div>
      </div>
    </header>
  );
}
