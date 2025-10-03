"use client";

import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import useAuth from "@/hooks/useAuth";

export default function Header({role}:{role:"admin"|"agent"}) {
  const { logout } = useAuth();
  
  return (
    <nav className="w-full backdrop-blur-3xl sticky shadow-xs top-0 z-50 font-outfit dark:border-b-1">
      <div className="max-w-7xl mx-auto md:px-0 px-8 py-4 flex items-center justify-between">
        {/* Logo/Name Section */}
        <Link href={"/"} className="text-3xl font-semibold hover:text-primary transition duration-300 ease-in-out">
          AgentX
        </Link>

        {/* Role-specific Links */}
        <div className="md:flex hidden items-center space-x-4">
          {role === "admin" && (
            <Link href={"/admin/dashboard"} className="text-lg font-medium hover:text-primary transition duration-300 ease-in-out">
              Admin Dashboard
            </Link>
          )}
          {role === "agent" && (
            <Link href={"/agent/dashboard"} className="text-lg font-medium hover:text-primary transition duration-300 ease-in-out">
              Agent Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Logout Button With Theme Switcher */}
        <div className="hidden md:flex space-x-4 items-center">
          <ThemeSwitcher/>
          <button
            onClick={logout}
            className="bg-red-400 hover:bg-red-300 text-white font-bold py-2.5 h-fit px-6 rounded-xl focus:outline-none transition duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Mobile Logout Button With Theme Switcher */}
        <div className="md:hidden flex space-x-2">
          <ThemeSwitcher/>
          <button
            onClick={logout}
            className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
