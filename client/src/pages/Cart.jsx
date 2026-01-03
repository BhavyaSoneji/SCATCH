import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { fetchCartProducts } from "../utils/fetchCartProducts";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const getCartProducts = async () => {
    const cart = await fetchCartProducts();
    setCartProducts(cart);
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div className="min-h-screen w-full flex felx-col gap-5 bg-zinc-50">
      <NavBar />
      <div className="mt-25 cart-container p-10 flex flex-col items-center w-full gap-5">
        <div className="w-full flex flex-col gap-10">
          <div className="w-md">
            <h1 className="text-4xl font-serif text-zinc-900 mb-4">Cart</h1>
            <div className="relative">
              <Search size={18} className="text-zinc-400 absolute top-1/2 -translate-1/2 left-1/20"></Search>
            <input
              type="text"
              className="pl-11 w-full outline-0 py-2.5 pr-4 text-sm bg-white border border-zinc-300 rounded-lg px-2 focus:ring-zinc-900 focus:ring-2 focus:transform transition-all 300"
              placeholder="Search products..."
            ></input>

            </div>
          </div>
          <div className="w-full flex flex-col gap-5 text-zinc-500">
            {cartProducts.length && (<div className="flex gap-1"><p className="text-zinc-950 font-medium">{cartProducts.length}</p> <p>{cartProducts.length>1?"Products":"Prodcut"}</p></div>)}
            <hr className="mb-5"></hr>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
          {cartProducts.map((product) => {
            console.log();

            return (
              <ProductCard
                id={product._id}
                discount={product.discount}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
