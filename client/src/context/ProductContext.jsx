import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import notify from "../utils/notifications";
import ProductContext from "./ProductContextObject";

export const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isLoggedIn) {
      setIsLoading(false);
      setIsError(false);
      setAllProducts([]);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const resp = await axios.get(
          "http://localhost:5000/products/allproducts",
          {
            withCredentials: true,
          },
        );
        setAllProducts(resp.data?.products || []);
      } catch (err) {
        setIsError(true);
        setAllProducts([]);
        notify.error("Failed to load products");
        console.error("Failed to load products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, loading]);

  const addProduct = useCallback((newProduct) => {
    setAllProducts((prev) => [...prev, newProduct]);
  }, []);

  const removeProduct = useCallback((id) => {
    setAllProducts((prev) => prev.filter((p) => p._id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
        isLoading,
        isError,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
