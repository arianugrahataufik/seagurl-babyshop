import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#f9f4f2] font-poppins text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-2v bg-[#f9f4f2] sticky top-0 z-10">
          <Header />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <Outlet />
        </main>
      </div>  
    </div>
  );
}
