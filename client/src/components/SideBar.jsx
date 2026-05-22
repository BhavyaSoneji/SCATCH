import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Settings, LogOut, Menu, X } from "lucide-react";
import { useHandleSubmit } from "../utils/handleSubmit";

/**
 * Reusable sidebar navigation component.
 * Expects navigationItems: [{ name, icon, path, exact? }]
 */
const SideBar = ({ navigationItems = [], showSettings = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = useHandleSubmit();

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-zinc-900 text-white flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800">
        {sidebarOpen && (
          <h1
            className="text-2xl font-serif tracking-tight hover:cursor-pointer"
            onClick={
              ()=>{
                navigate("/dashboard")
              }
            }
          >
            Scatch
          </h1>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-white text-zinc-900"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {Icon && <Icon size={20} className="shrink-0" />}
                {sidebarOpen && (
                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings & Logout */}
      <div className="p-3 border-t border-zinc-800 space-y-1">
        {showSettings && (
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200">
            <Settings size={20} className="shrink-0" />
            {sidebarOpen && (
              <span className="text-sm font-medium tracking-wide">
                Settings
              </span>
            )}
          </button>
        )}

        <button
          onClick={(e) => handleSubmit(e, {}, "Logout")}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-400 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} className="shrink-0" />
          {sidebarOpen && (
            <span className="text-sm font-medium tracking-wide">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
