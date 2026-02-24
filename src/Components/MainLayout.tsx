import React from "react";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../contexts/useSidebar";
import InsuranceSidebar from "./sidebar";
import Navbar from "./navbar";

const MainLayout: React.FC = () => {
  const { isOpen, setIsOpen, isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <InsuranceSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 w-full transition-all duration-200 flex flex-col">
        {/* Navbar */}
        <Navbar onMenuClick={() => setIsOpen(true)} />

        {/* Page Content */}
        <main className="p-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
