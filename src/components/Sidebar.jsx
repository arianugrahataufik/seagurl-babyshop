import { RiAdminFill } from "react-icons/ri"; 
import { RiAdminLine } from "react-icons/ri"; 
import { BsBox2Fill } from "react-icons/bs"; 
import { BsBox2 } from "react-icons/bs"; 
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import {
  FaUsers,
  FaRegUser,
  FaCog,
  FaRegSun,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaMessage, FaRegMessage } from "react-icons/fa6";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      name: "Dashboard",
      iconOutline: <MdOutlineDashboard />,
      iconFill: <MdDashboard />,
      to: "/",
    },
    {
      name: "Product",
      iconOutline: <BsBox2 /> ,
      iconFill: <BsBox2Fill />,
      to: "/product",
    },
    {
      name: "Customer",
      iconOutline: <FaRegUser />,
      iconFill: <FaUser />,
      to: "/customer",
    },
    {
      name: "Quote of the Day",
      iconOutline: <FaProjectDiagram />,
      iconFill: <FaProjectDiagram />, // Sama aja karena nggak ada versi outline-nya
      to: "/quotes",
    },
    {
      name: "User",
      iconOutline:<RiAdminLine />,
      iconFill: <RiAdminFill />,
      to: "/user",
    },
    {
      name: "Review",
      iconOutline: <FaRegMessage />,
      iconFill: <FaMessage />,
      to: "/review",
    },
    {
      name: "Settings",
      iconOutline: <FaRegSun />,
      iconFill: <FaCog />,
      to: "/setting",
    },
  ];

  return (
    <aside
      className={`bg-bgnav min-h-screen flex flex-col transition-all font-poppins duration-300 ${
        collapsed ? "w-20" : "w-64"
      } overflow-hidden`}
    >
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-6`}>
        {!collapsed && (
          <h1 className="text-white font-bold text-xl tracking-wide">LA Baby World</h1>
        )}
      </div>

      {/* Create Project Button */}
      <div className="px-4 mb-6">
        <button
          className={`flex items-center gap-2 bg-menu text-white w-full py-2 rounded-full font-medium hover:bg-orange-600 transition-all ${
            collapsed ? "justify-center px-0" : "justify-start px-4"
          }`}
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
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-4 p-4 rounded-full transition-all text-sm ${
                      isActive
                        ? "bg-white text-menu font-semibold"
                        : "hover:bg-white/20"
                    } ${collapsed ? "justify-center" : "justify-start"}`}
                  >
                    <span className="text-lg">
                      {isActive ? item.iconFill : item.iconOutline}
                    </span>
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                )}
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
