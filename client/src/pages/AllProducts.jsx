import {
  Ban,
  BrushCleaning,
  Funnel,
  LoaderCircle,
  PencilLine,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import useAllProducts from "../context/useAllProducts";
import { useNavigate } from "react-router";
import { deleteProduct } from "../utils/deleteProduct";

const AllProducts = () => {
  const { allProducts, isLoading, isError,removeProduct } = useAllProducts();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const products = allProducts.filter((product) =>
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (sortBy) {
      case "Name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "low-high":
        return [...products].sort(
          (a, b) => (a.price - a.discountPrice) - (b.price - b.discountPrice),
        );
      case "high-low":
        return [...products].sort(
          (a, b) => (b.price - b.discountPrice) - (a.price - a.discountPrice),
        );
      default:
        return products;
    }
  }, [allProducts, searchQuery, sortBy]);

  // Product Delete Fuction
  const deleteProductEvent = async(id) => {
    const data = await deleteProduct(id, allProducts);
    removeProduct(id);
  };

  return (
    <>
      <div className="p-6 h-full">
        <div className="flex flex-col rounded-lg bg-gray-50 w-full border border-gray-200 h-full">
          {/* Top Section of Search bar and buttons */}
          <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-72">
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-white w-full">
                <Search className="text-gray-500" size={18} />
                <input
                  type="text"
                  className="text-sm outline-none w-full placeholder-gray-400"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Other Buttons */}
            <div className="flex flex-row gap-2.5 items-center">
              {/* Sorting Dropdown */}
              <div className="border border-gray-200 rounded-md px-2 py-1 bg-white text-sm text-gray-700">
                <select
                  name="Sort"
                  id=""
                  className="bg-transparent outline-none"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                  }}
                >
                  <option value="default">Featured</option>
                  <option value="Name">Name</option>
                  <option value="low-high">Price: LOW - HIGH</option>
                  <option value="high-low">Price: HIGH - LOW</option>
                </select>
              </div>
              {/* Filter Button */}
              <button className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center gap-2 bg-white text-gray-700">
                <Funnel strokeWidth="1.5" size={16} />
                <span>Filter</span>
              </button>
              {/* Add New Product Button */}
              <button className="px-3 py-1 rounded-md text-sm bg-black text-white hover:bg-gray-900">
                <div
                  className="flex items-center gap-2 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/admin/createproduct");
                  }}
                >
                  <Plus strokeWidth="2" size={16} />
                  <span>Add New Product</span>
                </div>
              </button>
            </div>
          </div>
          {/* Table of Products */}

          <div className="overflow-y-auto bg-white rounded-b-lg h-full">
            {/* Loading Div Section */}
            {isLoading ? (
              <div className="w-full h-full flex flex-col justify-center items-center font text-black">
                <LoaderCircle className="animate-spin" />
                Loading Products...
              </div>
            ) : // Error Section
            isError ? (
              <div className="w-full h-full flex flex-col justify-center items-center font text-black">
                <Ban color="red" />
                Failed Loading Products...
              </div>
            ) : allProducts.length == 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4 h-full">
                <div className="w-24 h-24 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Search size={40} className="text-zinc-400" />
                </div>
                <p className="text-lg font-medium text-zinc-900">
                  No products found
                </p>
                <p className="text-sm text-zinc-600">
                  Try to add new products
                </p>
              </div>
            ) : (
              // Output Table Section
              <table className="w-full text-sm">
                {/* Table Head Portion */}
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-500 bg-gray-100">
                    <th className="text-left px-6 py-3 border-2 border-gray-200">
                      Product
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      ID
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      Category
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      Price
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      Original
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      Stock
                    </th>
                    <th className="text-center px-6 py-3 border-2 border-gray-200">
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                {/* Table Body Portion */}
                <tbody>
                  {filteredProducts.map((value, index) => {
                    return (
                      <tr
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors "
                        key={index}
                      >
                        <td className="pl-4 py-4 flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                            <img
                              className="w-full h-full object-contain"
                              src={value.frontImage}
                              alt="product"
                            />
                          </div>
                          <div className="leading-tight">
                            <div className="font-medium text-gray-800">
                              {value.name}
                            </div>
                            <div className="text-xs text-gray-500">Type</div>
                          </div>
                        </td>
                        <td className="py-4 text-center text-gray-600 font-mono">
                          {value._id}
                        </td>
                        <td className="px-4 py-4 text-center">Mens</td>
                        <td className="px-4 py-4 text-center font-semibold">
                          ₹{value.discountPrice==0?value.price:value.discountPrice}
                        </td>
                        <td className="px-4 py-4 text-center text-gray-500">
                          ₹{value.price}
                        </td>
                        <td className="px-4 py-4 text-center">10</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center gap-3">
                            <Trash2
                              size={18}
                              className="text-red-500 hover:text-red-700 active:scale-90 transition-all 300 ease-in"
                              onClick={() => {
                                deleteProductEvent(value._id);
                              }}
                            />
                            <PencilLine
                              size={18}
                              className="text-blue-600 hover:text-blue-700 active:scale-90 transition-all 300 ease-in"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
