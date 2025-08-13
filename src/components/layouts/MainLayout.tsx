import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/layouts/Navbar";
import { useAppSelector } from "@/store/store";

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />
        <main className="flex-1 overflow-y-auto w-full bg-gray-100 py-4 sm:py-3 lg:py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm mt-auto">
          © {new Date().getFullYear()}{" "}
          <span className="text-secondary">Interswitch Test Case Study.</span>.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
