import { FaBaby } from "react-icons/fa"; 
import { BsPeopleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="w-full sm:w-64 min-h-screen flex flex-col bg-primary/50 p-6 sm:p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins-bold text-3xl sm:text-4xl text-kuning"
        >
          Babyshop
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-teks text-xs sm:text-sm"
        >
          Babyshop di Pekanbaru
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3 text-sm sm:text-base">
          <li>
            <div
              id="menu-1"
              className="hover:text-white flex items-center rounded-xl p-3 font-medium text-teks hover:bg-kuning/60 hover:font-bold font-poppins cursor-pointer"
            >
              <MdDashboard className="mr-3 text-lg text-pink-500 hover:text-white" />
              Dashboard
            </div>
          </li>
          <li>
            <div
              id="menu-2"
              className="hover:text-white flex items-center rounded-xl p-3 font-medium text-teks hover:bg-kuning/60 hover:font-bold font-poppins cursor-pointer"
            >
              <FaShoppingBag className="mr-3 text-lg text-pink-500 hover:text-white" />
              Product
            </div>
          </li>
          <li>
            <div
              id="menu-3"
              className="hover:text-white flex items-center rounded-xl p-3 font-medium text-teks hover:bg-kuning/60 hover:font-bold font-poppins cursor-pointer"
            >
              <BsPeopleFill className="mr-3 text-lg text-pink-500 hover:text-white" />
              Customer
            </div>
          </li>
          <li>
            <div
              id="menu-4"
              className="hover:text-white flex items-center rounded-xl p-3 font-medium text-teks hover:bg-kuning/60 hover:font-bold font-poppins cursor-pointer"
            >
              <IoMdSettings className="mr-3 text-lg text-pink-500 hover:text-white" />
              Setting
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto text-sm sm:text-base pt-10">
        <span id="footer-brand" className="font-bold text-teks">
          Ant Babyshop
        </span>
        <p id="footer-copyright" className="font-light text-teks">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
