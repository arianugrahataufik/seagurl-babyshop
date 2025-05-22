import { FaBell, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <div
      id="header-container"
      className="flex flex-col md:flex-row justify-between items-center gap-4 p-4"
    >
      {/* Search Bar */}
      <div id="search-bar" className="relative w-full md:max-w-md">
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="border border-primary p-2 pr-10 bg-white w-full rounded-lg outline-none text-sm"
        />
        <FaSearch
          id="search-icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
        />
      </div>

      {/* Icon & Profile Section */}
      <div
        id="icons-container"
        className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4"
      >
        {/* Notification Icon */}
        <div className="relative p-3 bg-red-100 rounded-2xl text-red-400 cursor-pointer">
          <FaBell />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 text-black rounded-full px-1.5 py-0.5 text-xs">
            50
          </span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 border-l pl-3 border-gray-300">
          {/* Hide text on small screens */}
          <span className="hidden sm:inline text-sm">
            Hello, <b>Aria Ackerman</b>
          </span>
          <img
            src="https://d.ibtimes.co.uk/en/full/1446188/vladimir-putin.jpg?w=736"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
