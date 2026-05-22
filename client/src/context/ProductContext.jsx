import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const resp = await axios.get("http://localhost:5000/products/allproducts", {
          withCredentials: true,
        });
        // backend returns { status: true, products: [...] }
        setAllProducts(resp.data?.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        setAllProducts,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useAllProducts = () => {
  return useContext(ProductContext);
};
