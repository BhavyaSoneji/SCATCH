import React from "react";
import NavBar from "../components/NavBar";
import { Search } from "lucide-react";
import CartProductCard from "../components/CartProductCard";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { useState } from "react";
const Cart = () => {

  const navigate = useNavigate();
  const {cart} = useCart();

  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const setDefault = ()=>{
      setFilteredProducts(cart);
    }
    setDefault();
  },[])

  useEffect(()=>{
    const search = ()=>{
      if(searchValue.trim()===""){
        setFilteredProducts(cart);
      }
      else{
        const filtered = cart.filter((value) => {
          return value.product.name.toLowerCase().includes(searchValue.toLowerCase());
        })
        setFilteredProducts(filtered);
      }
    }
    search();
  },[searchValue,cart])

  return (
    <div className="min-h-screen w-full flex felx-col gap-5 bg-zinc-50">
      <NavBar />
      <div className="mt-15 cart-container p-10 flex flex-col items-center w-full gap-5">
        <div className="w-full flex flex-col gap-10">
          <div className="w-md">
            <h1 className="text-4xl font-  text-zinc-900 mb-4">Cart</h1>
            <div className="relative">
              <Search
                size={18}
                className="text-zinc-400 absolute top-1/2 -translate-1/2 left-1/20"
              ></Search>
              <input
                type="text"
                className="pl-11 w-full outline-0 py-2.5 pr-4 text-sm bg-white border border-zinc-300 rounded-lg px-2 focus:ring-zinc-900 focus:ring-2 focus:transform transition-all 300"
                placeholder="Search products..."
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              ></input>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 text-zinc-500">
            {filteredProducts.length && (
              <div className="flex gap-1">
                <p className="text-zinc-950 font-medium">
                  {filteredProducts.length}
                </p>
                <p>{filteredProducts.length > 1 ? "Products" : "Prodcut"}</p>
              </div>
            )}
            <hr className="mb-5"></hr>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid gap-5">
            {filteredProducts.map((product, index) => {
              return (
                <CartProductCard
                  key={index}
                  id={product.product._id}
                  discount={product.product.discount}
                  image={product.product.image}
                  name={product.product.name}
                  price={product.product.price}
                  qty={product.qty}
                />
              );
            })}
          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center gap-3 text-xl text-zinc-500">
            <p>No Products added to cart...</p>
            <button className="px-3 py-1 bg-zinc-900 h-fit w-fit rounded-lg text-zinc-200 outline-0" onClick={()=>{
              navigate('/shop')
            }}>Show Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
