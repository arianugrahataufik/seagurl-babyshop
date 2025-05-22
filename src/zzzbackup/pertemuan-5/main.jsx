import { MdFastfood } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import PageHeader from "./components/PageHeader";
import TopHeader from "./components/TopHeader";

createRoot(document.getElementById("root")).render(
  <div id="app-container" className="min-h-screen flex flex-col">
    <div id="layout-wrapper" className="flex flex-row flex-1">
      <Sidebar />
      <div id="main-content" className="bg-secondary/35 flex-1 p-4">
        <Header />
        <Dashboard />
      </div>
    </div>
  </div>
);
