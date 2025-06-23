import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaBox,
  FaUsers,
  FaCog,
  FaRegClock,
  FaLayerGroup,
  FaThLarge,
  FaProjectDiagram,
  FaUserSecret,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, to: "/" },
    { name: "Product", icon: <FaBox />, to: "/product" },
    { name: "Customer", icon: <FaUsers />, to: "/customer" },
    // { name: "Tasks", icon: <FaThLarge />, to: "/tasks" },
    // { name: "Time Log", icon: <FaRegClock />, to: "/time-log" },
    { name: "Quote of the Day", icon: <FaProjectDiagram />, to: "/quotes" },
    { name: "User", icon: <FaUserSecret />, to: "/user" },
    { name: "Review", icon: <FaMessage />, to: "/review" },
    // { name: "Users", icon: <FaUsers />, to: "/users" },
    // { name: "Project Template", icon: <FaLayerGroup />, to: "/templates" },
    { name: "Settings", icon: <FaCog />, to: "/setting" },
  ];

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 p-4 rounded-full transition-all text-sm
     ${isActive ? "bg-white text-menu font-semibold" : "hover:bg-white/20 "}
     ${collapsed ? "justify-center" : "justify-start"}`;

  return (
    <aside
      className={`bg-bgnav min-h-screen flex flex-col transition-al font-poppins duration-300
      ${collapsed ? "w-20" : "w-64"} overflow-hidden`}
    >
      {/* Logo & Collapse Button */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-6`}>
        {!collapsed && (
          <h1 className="text-white font-bold text-xl tracking-wide">
            LA Baby World
          </h1>
        )}
        {/* <button
          className="text-white text-xl hover:text-kuning"
          onClick={toggleSidebar}
        >
          {collapsed ? <IoMdArrowForward /> : <IoMdArrowBack />}
        </button> */}
      </div>

      {/* Create Project Button */}
      <div className="px-4 mb-6">
        <button
          className={`flex items-center gap-2 bg-menu text-white w-full py-2 rounded-full font-medium hover:bg-orange-600 transition-all
            ${collapsed ? "justify-center px-0" : "justify-start px-4"}`}
        >
          <FaPlus className="text-sm text-white" />
          {!collapsed && <span>Create new</span>}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <ul className="space-y-4">
          {menuItems.map((item, i) => (
            <li key={i}>
              <NavLink to={item.to} className={menuClass}>
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Button */}
      <div className="mt-auto py-6 flex justify-center">
        <button className="bg-menu w-10 h-10 rounded-full text-white text-lg font-bold hover:scale-105 transition">
          ?
        </button>
      </div>
    </aside>
  );
}
