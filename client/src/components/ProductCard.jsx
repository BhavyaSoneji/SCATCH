import React from 'react';
import { addTocart } from '../utils/addToCart';

const ProductCard = ({ 
  id,
  image, 
  name, 
  price, 
  discount, 
  bgColor = "#ffffff",
  showSale = false, 
}) => {

  // const navigate = useNavigate();

  const handleAddToCart = async(id)=>{
  await addTocart(id);
  }

  return (
    <div className='relative h-105 w-68 bg-white shrink-0' style={{ backgroundColor: bgColor }}>
      {/* Sale Badge */}
      {showSale && discount && discount < price && (
        <div className="absolute top-4 right-4 bg-zinc-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
          Sale
        </div>
      )}
      
      {/* Product Image */}
      <div className='h-4/6 bg-zinc-200 flex flex-col justify-end overflow-hidden'>
        <img 
          className='hover:scale-105 transition-transform duration-500 ease-out' 
          src={image}
          alt={name}
        />
      </div>
      
      {/* Product Info */}
      <div className='h-2/6 flex flex-col w-full px-5 py-2 justify-between'>
      
       <div className='flex flex-col gap-2'>
          <h3 className="text-nowrap overflow-hidden text-xs uppercase tracking-wider font-medium leading-relaxed">
            {name}
          </h3>
          
          {/* Price Section */}
          <div className="flex items-center gap-3">
            {discount && discount < price ? (
              <>
                <span className="text-sm font-semibold">₹ {discount}</span>
                <span className="text-xs line-through opacity-60">₹ {price}</span>
              </>
            ) : (
              <span className="text-sm font-semibold">₹ {price}</span>
            )}
          </div>
       </div>
        
        {/* Add to Bag Button */}
        <button 
          className=" mb-1 w-full py-2 text-xs uppercase tracking-wider font-medium border border-zinc-900 transition-all duration-300 hover:bg-zinc-900 hover:text-zinc-50"
            onClick={()=>{
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
