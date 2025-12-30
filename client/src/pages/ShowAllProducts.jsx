import React, { useEffect } from 'react'
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ShowAllProducts = () => {
  useEffect(()=>{
    const response = axios.get('http://localhost:3000/products/');
  })


  return (
    <div className="min-h-screen w-full bg-zinc-50 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif tracking-wide text-zinc-900 mb-2">All Products</h1>
          <p className="text-sm uppercase tracking-wider text-zinc-600">Discover Our Collection</p>
        </div>
        {/* Products Grid */}
        <div className='flex flex-wrap gap-8 h-full '>
           <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="BLACK LEATHER KITTEN HEEL SANDAL"
            price={230}
            discount={180}
            showSale={true}
          />

          <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="BLACK LEATHER KITTEN HEEL SANDAL"
            price={230}
            discount={180}
            showSale={true}
          />
          
          <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="LUXURY EVENING CLUTCH"
            price={320}
          />
          
          <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="PREMIUM LEATHER TOTE"
            price={450}
          />
          
          <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="VINTAGE CROSSBODY BAG"
            price={280}
            discount={220}
            showSale={true}
          />
          
          <ProductCard 
            image="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
            name="DESIGNER SHOULDER BAG"
            price={390}
          />  

        </div>
      </div>
    </div>
  )
}

export default ShowAllProducts