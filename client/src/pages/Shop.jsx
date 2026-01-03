import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { getAllProducts } from "../utils/getAllProducts";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const categories = ["Keepall", "Monogram", "Dopp", "BackPack", "BB"];

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const productsList = await getAllProducts();
      console.log(productsList);
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (err) {
      console.error("Error Fetching Products", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price =
        product.discount && product.discount < product.price // if discount then check if discount < price then return discount otherwise
          ? product.discount
          : product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) =>
          product.name.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Sale filter
    if (onSaleOnly) {
      filtered = filtered.filter((product) => {
        product.discount > 0 && product.discount < product.price;
      });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, selectedCategories, onSaleOnly, products]);

  // Apply sorting
  useEffect(() => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) => (a.discount || a.price) - (b.discount || b.price)
        );
        break;
      case "price-high":
        sorted.sort(
          (a, b) => (b.discount || b.price) - (a.discount || a.price)
        );
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  }, [sortBy]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: 1000000 });
    setSelectedCategories([]);
    setOnSaleOnly(false);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <NavBar />

      {/* Simple Header search bar*/}
      <div className="pt-25 pb-8 px-10">
        <div className="max-w-7xl">
          <h1 className="text-4xl font-serif text-zinc-900 mb-4">Shop</h1>

          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full px-10 mx-auto  pb-12">
        <div className="flex gap-5">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden lg:block"
            } w-full lg:w-72 shrink-0`}
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-zinc-200 sticky top-24">
              
              {/* Filter header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-zinc-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6 pb-6 border-b border-zinc-200">
                <h4 className="text-sm font-medium text-zinc-900 mb-3 uppercase tracking-wider">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                      />
                      <span className="text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-zinc-200">
                <h4 className="text-sm font-medium text-zinc-900 mb-3 uppercase tracking-wider">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-zinc-600 mb-1 block">
                        Min
                      </label>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-600 mb-1 block">
                        Max
                      </label>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-full accent-zinc-900"
                  />
                </div>
              </div>

              {/* Sale Items */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  />
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                    Sale Items Only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-zinc-200">
              <div className="flex items-center gap-4">
                {/* <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium border border-zinc-300 hover:border-zinc-900 transition-colors rounded-lg"
                >
                  <SlidersHorizontal size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button> */}
                
                <p className="text-sm text-zinc-600">
                  <span className="font-semibold text-zinc-900">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs uppercase tracking-wider text-zinc-600 font-medium">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 text-xs uppercase tracking-wider font-medium border border-zinc-300 bg-white hover:border-zinc-900 transition-colors cursor-pointer focus:outline-none focus:border-zinc-900 rounded-lg"
                  >
                    <option value="default">Featured</option>
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="animate-pulse space-y-3 text-center">
                  <div className="w-12 h-12 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Loading collection...
                  </p>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      discount={product.discount}
                      showSale={
                        product.discount > 0 && product.discount < product.price
                      }
                      id={product._id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-24 h-24 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Search size={40} className="text-zinc-400" />
                </div>
                <p className="text-lg font-medium text-zinc-900">
                  No products found
                </p>
                <p className="text-sm text-zinc-600">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {filteredProducts.length > 6 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 w-12 h-12 bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-lg rounded-lg"
        >
          <span className="text-xl">↑</span>
        </button>
      )}
    </div>
  );
};

export default Shop;
