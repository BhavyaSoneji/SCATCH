import React from "react";
import { Outlet } from "react-router";
import Button from "../components/Button";
import { useHandleSubmit } from "../utils/handleSubmit";
const AdminPanel = () => {
  const handleLogout = useHandleSubmit();
  return (
    <div className="h-screen max-h-full w-full flex flex-col fixed">
      {/* Nav Bar */}
      <div className=" h-1/9 w-full border flex justify-end p-10 items-center">
        <div className="w-1/10">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors cursor-pointer "
            onClick={(e) => {
              handleLogout(e, {}, "Logout");
            }}
          >Logout</button>
        </div>
      </div>

      {/* lower part */}
      <div className="h-8/9 max-h-full w-full flex">
        
        {/* Horizontal Nav Bar */}
        <div className=" w-1/7 max-h-screen border">
        </div>

        {/* dynamin part */}
        <div className="overflow-y-scroll relative w-6/7 h-full products-container">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default AdminPanel;
