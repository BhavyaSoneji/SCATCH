import React from 'react'
import { useNavigate } from "react-router";
import { CircleUserRound, Search } from "lucide-react";
import { IoBagOutline } from "react-icons/io5";

const NavBar = () => {
    const navigate = useNavigate();
    
  return (
    <div
        className="fixed w-full flex justify-between items-center p-5 px-15 z-10 shadow-2xs bg-white ">
        {/* OtherPages */}
        <div className="flex gap-7 uppercase tracking-tighter font-medium text-zinc-900">
          <a className="cursor-pointer hover:opacity-60 transition-opacity" onClick={()=>navigate('/shop')}>Shop</a>
          <a className="cursor-pointer hover:opacity-60 transition-opacity">Collections</a>
          <a className="cursor-pointer hover:opacity-60 transition-opacity">About</a>
        </div>
        <div>
          <h1 className="font-bold text-4xl font-serif cursor-pointer" onClick={()=>navigate('/dashboard')}>Scatch</h1>
        </div>
        <div className="flex gap-7 uppercase tracking-tighter font-medium text-zinc-900">
          <Search className="cursor-pointer hover:opacity-60 transition-opacity" />
          <CircleUserRound className="cursor-pointer hover:opacity-60 transition-opacity" onClick={()=>{navigate('/admin/createProduct')}} />
          <IoBagOutline size={25} className="cursor-pointer hover:opacity-60 transition-opacity" onClick={()=>{navigate('/cart')}}/>
        </div>
      </div>
  )
}

export default NavBar