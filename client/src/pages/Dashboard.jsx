import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../utils/getAllProducts";
import { useNavigate } from "react-router";
import { CircleUserRound, Search } from "lucide-react";
import { IoBagOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [productsList, setProductsList] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const get10Products = async () => {
    const tempProductsList = (await getAllProducts()) || [];
    console.log(tempProductsList);
    setProductsList(tempProductsList);
  };

  const {user} = useAuth();

  useEffect(() => {
    const defaultproducts = () => {
      get10Products();
    };
    defaultproducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const sliderImages = [
    "UPLOADS/Slider1.webp",
    "UPLOADS/Slider2.webp",
    "UPLOADS/Slider3.webp",
    "UPLOADS/Slider4.webp",
    "UPLOADS/Slider5.webp",
    "UPLOADS/Slider6.webp",
    "UPLOADS/Slider7.webp",
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev == 0 ? sliderImages.length - 1 : prev-1);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col gap-10 rlative items-center">
      {/* Nav Bar */}
      <div
        className={` z-10 fixed top-5 flex justify-between items-center p-3 px-15 transition-all duration-300 ${
          isScrolled
            ? "bg-white/40 backdrop-blur-xs shadow-md rounded-full w-9/10"
            : "bg-transparent w-full"
        }`}
      >
        {/* OtherPages */}
        <div className="w-1/3 flex gap-7 uppercase tracking-tighter font-medium text-zinc-900">
          <a
            className="cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => navigate("/shop")}
          >
            Shop
          </a>
          <a className="cursor-pointer hover:opacity-60 transition-opacity">
            Collections
          </a>
          <a className="cursor-pointer hover:opacity-60 transition-opacity">
            About
          </a>
        </div>
        <div className="w-1/3 justify-center flex">
          <h1
            className="font-bold text-4xl font-serif cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Scatch
          </h1>
        </div>
        <div className="w-1/3 justify-end flex gap-7 uppercase tracking-tighter font-medium text-zinc-900">
          <Search className="cursor-pointer hover:opacity-60 transition-opacity" />
          <CircleUserRound
            className="cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => {
              navigate("/admin/createProduct");
            }}
          />
          <IoBagOutline
            size={25}
            className="cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => {
              navigate("/cart");
            }}
          />
        </div>
      </div>

      {/* Image Silder */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderImages.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt={`Slider Image ${index + 1}`}
                className="min-w-full h-full object-cover"
              ></img>
            );
          })}
        </div>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/50 transition"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-3 rounded-full hover:bg-white/50 transition"
      >
        <ChevronRight size={30} />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Shoe Collection Section */}
      <div className="w-full px-10 py-16">
        <div className="w-full">
          {/* Section Header */}
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif tracking-wide">
              Shoe Collection
            </h1>
            <a
              className="text-sm uppercase tracking-wider hover:underline cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Products Grid */}
        <div className="h-full gap-5 w-full flex overflow-x-scroll products-container">
          {productsList.map((product, index) => {
            if (index <= 7) {
              return <ProductCard product={product} key={product._id} />;
            }
          })}
        </div>
      </div>

      {/* new Collection Page */}
      <div className="relative w-full h-screen overflow-hidden flex items-center bg-linear-to-br from-[#faf8f5] via-[#fff6ec] to-[#efe4d8]">
        {/* Content Container */}
        <div className="max-w-7xl mx-auto w-full px-16 flex items-center justify-between">
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-6 max-w-md z-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-light">
                New Arrivals
              </p>
              <h1 className="text-6xl font-serif text-zinc-900 leading-tight">
                Unveiling the
                <br />
                <span className="italic font-light">New Collection</span>
              </h1>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Discover our latest curated selection of timeless pieces
              </p>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="group mt-4 flex items-center gap-3 text-zinc-900 font-medium uppercase tracking-wider text-sm hover:gap-5 transition-all duration-300"
            >
              Explore Collection
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Right Side - Product Image */}
          <div className="relative flex-1 flex justify-end items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/20 rounded-full blur-3xl opacity-50"></div>
              <img
                className="relative w-150 h-auto object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-cargo-50--M14735_PM1_Worn%20view.png?wid=1090&hei=1090"
                alt="New Collection"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-zinc-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-amber-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Mens Collection */}
      <div className="w-full h-screen flex ">
        {/* Left Side - Hero Image */}
        <div className="max-w-1/2 h-screen overflow-hidden">
          <img
            className="w-fit h-screen object-cover hover:scale-105 transition-transform duration-700 ease-out"
            src="https://www.louisvuitton.com/images/is/image/lv/MEN_06_LV-GOLF_LVCOM_DII.jpg?wid=2400"
            alt="Men's Collection Hero"
          />
        </div>

        {/* Right Side - Title and Products */}
        <div className="min-w-1/2 max-w-full ml-15 h-screen flex flex-col justify-center">
          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-center text-5xl font-serif text-zinc-900 mb-3 tracking-wide">
              Men's Collection
            </h2>
            <p className="text-center text-zinc-600 text-lg">
              Timeless Elegance & Modern Sophistication
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Product Card 1 */}
            <div className="group cursor-pointer max-w-60 mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-md h-56 w-56 flex items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-1"
                  src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-bandouliere-25--M26930_PM1_Side%20view.png?wid=1090&hei=1090"
                  alt="Keepall Bandouliere 25"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-zinc-900 font-medium text-xs uppercase tracking-wider">
                  Keepall Bandouliere 25
                </h3>
                <p className="text-zinc-500 text-xs mt-1">Travel Bag</p>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group cursor-pointer max-w-60 mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-md h-56 w-56 flex items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-1"
                  src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-christopher-mm--M27080_PM1_Side%20view.png?wid=1090&hei=1090"
                  alt="Christopher MM"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-zinc-900 font-medium text-xs uppercase tracking-wider">
                  Christopher MM
                </h3>
                <p className="text-zinc-500 text-xs mt-1">Backpack</p>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group cursor-pointer max-w-60 mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-md h-56 w-56 flex items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-1"
                  src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-bandouliere-50--M26866_PM1_Side%20view.png?wid=1090&hei=1090"
                  alt="Keepall Bandouliere 50"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-zinc-900 font-medium text-xs uppercase tracking-wider">
                  Keepall Bandouliere 50
                </h3>
                <p className="text-zinc-500 text-xs mt-1">Duffle Bag</p>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group cursor-pointer max-w-60 mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-md h-56 w-56 flex items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-1"
                  src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-rush-bumbag--M26933_PM1_Side%20view.png?wid=1090&hei=1090"
                  alt="Rush Bumbag"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-zinc-900 font-medium text-xs uppercase tracking-wider">
                  Rush Bumbag
                </h3>
                <p className="text-zinc-500 text-xs mt-1">Belt Bag</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/shop")}
              className="bg-zinc-900 text-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-zinc-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Men's Collection
            </button>
          </div>
        </div>
      </div>

      {/* Slider all types */}
      <div className="w-full p-15 flex">
        <div className="w-full flex overflow-x-scroll gap-2 products-container">
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-pochette-liv--M83008_PM1_Worn%20view.png?wid=490&hei=490  "
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-carryall-bb--M13014_PM1_Worn%20view.png?wid=490&hei=490"
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-nano-speedy--M82450_PM1_Worn%20view.png?wid=490&hei=490"
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-pochette-metis--M44875_PM1_Worn%20view.png?wid=490&hei=490"
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-on-my-side-pm--M20600_PM1_Worn%20view.png?wid=490&hei=490"
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-palm-springs-mm--M44874_PM1_Worn%20view.png?wid=490&hei=490 "
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
          <div className=" min-w-60 flex flex-col gap-3 items-center">
            <img
              className="h-100 object-cover"
              src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neonoe-mm--M45256_PM1_Worn%20view.png?wid=490&hei=490"
            ></img>
            <h1 className="text-lg font-semibold uppercase underline">
              Type-1
            </h1>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-fit p-20 border flex gap-5">
        {/* Part-1 */}
        <div className="flex flex-col justify-between gap-10 w-full">
          <div className="flex flex-col gap-4 text-xl">
            <h1 className="text-3xl font-bold">Scatch</h1>
            <div className="flex gap-3">
              <FaFacebook />
              <FaInstagram />
              <FaPinterest />
            </div>
          </div>

          <div className="text-zinc-500 font-medium">
            <p>
              Sactch LLC
              <br />
              1234 Fashion Avenue, Suite 567
              <br />
              New York, NY 100001, USA
            </p>
            <p>&copy; 2025 Scatch. All rightss reserved</p>
          </div>
        </div>

        {/* Part-2 */}
        <div className="flex flex-col gap-3 font-bold capitalize w-full">
          <a href="#">About</a>
          <a href="#">Contact Us</a>
          <a href="#">Shipping policy</a>
          <a href="#">Return policy</a>
          <a href="#">Initiate a retrun </a>
          <a href="#">FAQ's</a>
          <a href="#">privacy policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Accessiblity</a>
        </div>

        {/* Part-3 */}
        <div className="flex flex-col gap-3 font-bold capitalize w-full">
          <a href="#">Bags</a>
          <a href="#">outerwear</a>
          <a href="#">footware</a>
          <a href="#">accessories</a>
          <a href="#">apperal</a>
          <a href="#">new arrivals</a>
          <a href="#">Collections</a>
        </div>

        {/* Part-4 */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-serif italic mb-3">
              Sign up for Scatch updates
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Stay updated on our latest collections, exclusive offers,
              <br />
              and brand news
            </p>
          </div>

          <div className="flex">
            <input
              type="email"
              placeholder="E-mail address"
              className="flex-1 px-4 py-3 border-b-2 border-zinc-300 focus:border-zinc-900 outline-none transition-colors placeholder:text-zinc-400 bg-transparent"
            />
            <button className="bg-zinc-900 text-white px-8 py-3 font-semibold uppercase text-sm tracking-wider hover:bg-zinc-800 transition-colors">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            By entering your email, you agree to receive marketing
            communications from
            <br />
            Scatch and consent to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
