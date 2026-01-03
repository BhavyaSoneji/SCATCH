import axios from "axios";

export const getAllProducts = async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/products/shop", {
        withCredentials: true,
      });
      const productsList = response.data.products || [];
      return productsList;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
}