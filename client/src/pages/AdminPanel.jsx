import React from "react";
import { Outlet, useLocation } from "react-router";
import SideBar from "../components/SideBar";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus,
  List
} from "lucide-react";

const AdminPanel = () => {
  const location = useLocation(); // give a object with the details of your current location in the URL or website , it has pathName used to get the current route  

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
      <SideBar navigationItems={navigationItems} showSettings={true} />

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
        <div className="flex-1 overflow-y-auto bg-zinc-100 products-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
