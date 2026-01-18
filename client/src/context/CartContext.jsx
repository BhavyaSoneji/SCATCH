import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import notify from "../utils/notifications"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  
  const fetchCart = async () => {
    try{
        const resp = await axios.get('http://localhost:5000/users/userwithcart',{
          withCredentials:true
        });
        console.log(resp);
        setCart(resp.data.cart);
        return resp.data.cart || [];
    }catch(err){
        console.log(err);
    }
  };

  const addToCart = async(id) => {
    await axios.get(`http://localhost:5000/users/addtocart/${id}`,{
      withCredentials:true
    }).then((resp)=>{
      if(resp.data.status){
        notify.success("Product added to cart..");
        fetchCart();
      }
      else{
        notify.error("Error removing product")
        console.log(resp.data?.message || "Error Adding to Cart");
      }
    })
  };

  const updateQty = () => {};

  const removeFromCart = (id) => {
    axios
      .get(`http://localhost:5000/users/deletefromcart/${id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if(resp.data.status){
          notify.success("Product removed from cart..")
          fetchCart();
          console.log(resp.data.message);
        }
        else{
          notify.error("Error removing product")
          console.log(resp.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCart = () => {};

  useEffect(() => {
    const fetch = async()=>{
      const cart = await fetchCart();
      setCart(cart);
    }
    fetch();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        fetchCart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        setIsLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
