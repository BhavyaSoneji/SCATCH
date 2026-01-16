import React, { useState } from "react";
import { Trash2, Plus, Minus, Heart, Delete } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartProductCard = ({
  id,
  name,
  price,
  discount,
  image,
  qty
}) => {

  const [quantity, setQuantity] = useState(qty);

  const handleQtyInc = () => {
    if (quantity < 10) setQuantity(quantity+1);
  };

  const handleQtyDec = () => {
    if (quantity > 1) setQuantity(quantity-1);
  };

  const {removeFromCart} = useCart();
  return (
    <div className="flex h-50 gap-10 w-full rounded-lg shadow-lg p-5 ">
      <div className="h-full bg-zinc-200 rounded-lg px-3 py-2">
        <img
          className="object-contain h-full  hover:scale-110 transition-all 700 ease-in"
          src={image}
        ></img>
      </div>

      <div className="flex flex-col gap-2 w-md">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium font-sans text-zinc-700 line-clamp-1">
            {name}
          </h1>
          <div className="flex gap-3 items-center">
            {discount > 0 ? (
              <>
                <h2 className="text-lg font-bold ">
                  ₹{discount}
                </h2>
                <h2 className="text-md font-medium text-zinc-400 line-through">₹{price}</h2>
              </>
            ) : (
              <h2 className="text-lg font-bold">₹{price}</h2>
            )}
          </div>
        </div>
        <p className="text-green-600">In Stcok</p>
        <div className="flex gap-2">
          <div>Quntity : </div>
          <div className="flex text-sm ">
            <button
              className={`px-2 py-1 rounded-l-lg border border-zinc-300 outline-0 hover:bg-zinc-200 active:bg-zinc-300 transition-all 300 ${
                quantity > 1 ? "cursor-default" : "cursor-not-allowed"
              }`}
              onClick={() => {
                handleQtyDec();
              }}
            >
              <Minus size={15}></Minus>
            </button>
            <span className="px-5 py-1 border border-zinc-300 outline-0">
              {quantity}
            </span>
            <button
              className={`px-2 py-1 border rounded-r-lg border-zinc-300 outline-0 hover:bg-zinc-200 active:bg-zinc-300 transition-all 300 ${
                quantity < 10 ? "cursor-default" : "cursor-not-allowed"
              }`}
              onClick={() => {
                handleQtyInc();
              }}
            >
              <Plus size={15}></Plus>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-end">
          <div className="bg-zinc-200 p-1.5 rounded-md hover:bg-red-200 active:bg-red-300 active:red-400">
            <Trash2
              className="text-zinc-600 w-full h-full hover:text-red-500"
              size={20}
              onClick={()=>{
                removeFromCart(id);
              }}
            ></Trash2>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-zinc-500">Items Total:</p>
          <h2 className="text-xl font-bold">₹{discount!=0?discount*qty:price*qty}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
