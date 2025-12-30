import React from 'react'

const Demo = () => {
  // Sample product data - replace with actual data from API
  const sampleProduct = {
    image: "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090",
    name: "Luxury Leather Bag",
    price: 450,
    discount: 399,
    bgColor: "#f5f5f4",
    panelColor: "#ffffff",
    textColor: "#000000"
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif tracking-wide text-zinc-900 mb-2">All Products</h1>
          <p className="text-sm uppercase tracking-wider text-zinc-600">Discover Our Collection</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Single Product Card Template */}
          <div 
            className="group cursor-pointer"
            style={{ backgroundColor: sampleProduct.bgColor }}
          >
            {/* Product Image Container */}
            <div className="relative aspect-square overflow-hidden bg-zinc-200 flex items-end justify-center">
              <img
                src={sampleProduct.image}
                alt={sampleProduct.name}
                className="w-full h-fit object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              {/* Discount Badge */}
              {sampleProduct.discount && sampleProduct.discount < sampleProduct.price && (
                <div className="absolute top-4 right-4 bg-zinc-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  Sale
                </div>
              )}
            </div>

            {/* Product Info Panel */}
            <div 
              className="p-5 flex flex-col gap-2 transition-all duration-300"
              style={{ 
                backgroundColor: sampleProduct.panelColor,
                color: sampleProduct.textColor 
              }}
            >
              {/* Product Name */}
              <h3 className="text-xs uppercase tracking-wider font-medium leading-relaxed">
                {sampleProduct.name}
              </h3>

              {/* Price Section */}
              <div className="flex items-center gap-3">
                {sampleProduct.discount && sampleProduct.discount < sampleProduct.price ? (
                  <>
                    <span className="text-sm font-semibold">${sampleProduct.discount}</span>
                    <span className="text-xs line-through opacity-60">${sampleProduct.price}</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold">${sampleProduct.price}</span>
                )}
              </div>

              {/* Add to Bag Button - Shows on Hover */}
              <button 
                className="mt-3 w-full py-2 text-xs uppercase tracking-wider font-medium border transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                style={{ 
                  borderColor: sampleProduct.textColor,
                  color: sampleProduct.textColor 
                }}
              >
                Add to Bag
              </button>
            </div>
          </div>

          {/* Duplicate for demo - remove when using actual data */}
          <div 
            className="group cursor-pointer"
            style={{ backgroundColor: "#fef3c7" }}
          >
            <div className="relative aspect-square overflow-hidden bg-zinc-200 flex items-end justify-center">
              <img
                src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
                alt="Product"
                className="w-full h-fit object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div 
              className="p-5 flex flex-col gap-2 transition-all duration-300"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
            >
              <h3 className="text-xs uppercase tracking-wider font-medium leading-relaxed">
                Classic Vintage Collection
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">$320</span>
              </div>
              <button 
                className="mt-3 w-full py-2 text-xs uppercase tracking-wider font-medium border border-black transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
              >
                Add to Bag
              </button>
            </div>
          </div>

          <div 
            className="group cursor-pointer"
            style={{ backgroundColor: "#e0e7ff" }}
          >
            <div className="relative aspect-square overflow-hidden bg-zinc-200 flex items-end justify-center">
              <img
                src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-side-trunk-silhouette--M27222_PM2_Front%20view.png?wid=1090&hei=1090"
                alt="Product"
                className="w-full h-fit object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 right-4 bg-zinc-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                Sale
              </div>
            </div>
            <div 
              className="p-5 flex flex-col gap-2 transition-all duration-300"
              style={{ backgroundColor: "#1e1b4b", color: "#ffffff" }}
            >
              <h3 className="text-xs uppercase tracking-wider font-medium leading-relaxed">
                Premium Evening Clutch
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">$280</span>
                <span className="text-xs line-through opacity-60">$350</span>
              </div>
              <button 
                className="mt-3 w-full py-2 text-xs uppercase tracking-wider font-medium border border-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-zinc-900"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo