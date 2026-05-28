import { useContext } from "react";
import ProductContext from "./ProductContextObject";

const useAllProducts = () => {
  return useContext(ProductContext);
};

export default useAllProducts;