import React from "react";
import { UseCart } from "../context/cartContext";
import { useNavigate } from "react-router";

const ProductCard = ({
  id,
  frontImage,
  name,
  price,
  discountPrice,
  bgColor = "#ffffff",
  showSale = false,
}) => {
  const { addToCart } = UseCart();

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  const navigate = useNavigate();

  const handleShowProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="relative h-105 w-68 bg-white shrink-0"
      style={{ backgroundColor: bgColor }}
      onClick={() => {
        handleShowProduct(id);
      }}
    >
      {/* Sale Badge */}
      {showSale && discountPrice && discountPrice < price && (
        <div className="absolute top-4 right-4 bg-zinc-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
          Sale
        </div>
      )}

      {/* Product Image */}
      <div className="h-4/6 justify-center bg-zinc-200 flex flex-col overflow-hidden">
        <img
          className="hover:scale-105 transition-transform duration-500 ease-out"
          src={frontImage}
          alt={name}
        />
      </div>

      {/* Product Info */}
      <div className="h-2/6 flex flex-col w-full px-5 py-2 justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-1 text-xs uppercase tracking-wider font-medium leading-relaxed">
            {name}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            {discountPrice && discountPrice < price ? (
              <>
                <span className="text-sm font-semibold">₹ {discountPrice}</span>
                <span className="text-xs line-through opacity-60">
                  ₹ {price}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold">₹ {price}</span>
            )}
          </div>
        </div>

        {/* Add to Bag Button */}
        <button
          className=" mb-1 w-full text-xs uppercase tracking-wider font-medium shadow-md border-zinc-50 bg-zinc-50 py-3 rounded-md transition-all duration-300 hover:bg-zinc-900 hover:text-zinc-50"
          onClick={() => {
            handleAddToCart(id);
          }}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
