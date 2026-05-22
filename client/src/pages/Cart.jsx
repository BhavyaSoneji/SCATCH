import React, { useMemo } from "react";
import NavBar from "../components/NavBar";
import { Search } from "lucide-react";
import CartProductCard from "../components/CartProductCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { UseCart } from "../context/CartContext";
const Cart = () => {
  
  const {cart} = UseCart();

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const setDefault = async () => {
      setFilteredProducts(cart);
    };
    setDefault();

    console.log(cart);

  }, []);

  useEffect(() => {
    const search = () => {
      if (searchValue.trim() === "") {
        setFilteredProducts(cart);
      } else {
        const filtered = cart.filter((value) => {
          return value.product.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });
        setFilteredProducts(filtered);
      }
    };
    search();
  }, [searchValue, cart]);

  // Cart Price Details calculation
  const priceDetails = useMemo(() => {
    return filteredProducts.reduce(
      (acc, currentProduct) => {
        console.log(currentProduct);
        const price = currentProduct.product.price;
        const qty = currentProduct.qty;
        const discount = currentProduct.product.discount;

        const totalAmount = price * qty;
        const payableAmount = discount * qty;

        discount==0?acc.payablePrice += totalAmount : acc.payablePrice += payableAmount;

        acc.totalPrice += totalAmount;
        return acc;
      },
      {
        totalPrice: 0,
        payablePrice: 0,
      }
    );
  }, [filteredProducts]);

  return (
    <div className="min-h-screen w-full flex felx-col gap-5 bg-zinc-50">
      <NavBar />
      <div className="mt-15 cart-container p-10 flex flex-col items-center w-full gap-5">
        <div className="w-full flex flex-col gap-10">
          {/* Heading Section  */}
          <div className="w-md">
            <h1 className="text-4xl font-  text-zinc-900 mb-4">Cart</h1>
            {/* Search Bar */}
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
          {/* Product Count seciton */}
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
        {/* Main Cart Products section */}
        {filteredProducts.length > 0 ? (
          // Main Section OR Cart Products section
          <div className="grid gap-5">
            {filteredProducts.map((product, index) => {
              return (
                <CartProductCard
                  key={index}
                  id={product.product._id}
                  discount={product.product.discount}
                  frontImage={product.product.frontImage}
                  name={product.product.name}
                  price={product.product.price}
                  qty={product.qty}
                />
              );
            })}
            {/* Order Summery Section */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white border border-zinc-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">₹{priceDetails.totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Discount Amount</span>
                    <span className="font-medium text-zinc-900">₹{priceDetails.totalPrice - priceDetails.payablePrice}</span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="font-medium text-zinc-900">Free</span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span>Tax</span>
                    <span className="font-medium text-zinc-900"></span>
                  </div>
                </div>

                <hr className="my-4 border-zinc-200" />

                <div className="flex justify-between text-lg font-semibold text-zinc-900 mb-6">
                  <span>Total</span>
                  <span>₹ {priceDetails.payablePrice}</span>
                </div>

                <button
                  className="w-full bg-zinc-900 text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors outline-0 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                  onClick={() => {
                    
                  }}
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-zinc-500 text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center gap-3 text-xl text-zinc-500">
            <p>No Products added to cart...</p>
            <button
              className="px-3 py-1 bg-zinc-900 h-fit w-fit rounded-lg text-zinc-200 outline-0"
              onClick={() => {
                navigate("/shop");
              }}
            >
              Show Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
