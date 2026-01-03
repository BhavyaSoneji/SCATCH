import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useHandleSubmit } from "../utils/handleSubmit";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Plus,
  List
} from "lucide-react";

const AdminPanel = () => {
  const handleLogout = useHandleSubmit();
  const navigate = useNavigate();
  const location = useLocation(); // give a object with the details of your current location in the URL or website , it has pathName used to get the current route  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      exact: true,
    },
    {
      name: "Create Product",
      icon: Plus,
      path: "/admin/createProduct",
    },
    {
      name: "All Products",
      icon: List,
      path: "/admin/allproducts",
    },
    {
      name: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/admin/users",
    },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen w-full flex bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-zinc-900 text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Logo & Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800">
          {sidebarOpen && (
            <h1 className="text-2xl font-serif tracking-tight">Scatch</h1>
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
                  <Icon size={20} className="shrink-0" />
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
          <button
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <Settings size={20} className="shrink-0" />
            {sidebarOpen && (
              <span className="text-sm font-medium tracking-wide">
                Settings
              </span>
            )}
          </button>
          
          <button
            onClick={(e) => handleLogout(e, {}, "Logout")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && (
              <span className="text-sm font-medium tracking-wide">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-medium">
              Admin Panel
            </p>
            <h2 className="text-xl font-semibold text-zinc-900 mt-1">
              {navigationItems.find((item) => 
                isActive(item.path, item.exact)
              )?.name || "Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 rounded-lg">
              <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">Admin</p>
                <p className="text-xs text-zinc-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 products-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
