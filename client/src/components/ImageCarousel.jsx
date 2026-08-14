import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const defaultImages = [
  "/UPLOADS/Slider1.webp",
  "/UPLOADS/Slider2.webp",
  "/UPLOADS/Slider3.webp",
  "/UPLOADS/Slider4.webp",
  "/UPLOADS/Slider5.webp",
  "/UPLOADS/Slider6.webp",
  "/UPLOADS/Slider7.webp",
];

const ImageCarousel = ({ images = defaultImages, className = "w-full h-125 rounded-xl" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const wrapperRef = useRef(null); // 👈 ref on the wrapper div

  const sliderImages = images.length ? images : defaultImages;

  return (
    // 👇 Add ref here, and remove any fixed height — it will auto match Swiper's height
    <div ref={wrapperRef} className="relative w-full h-full">

      {/* PREV BUTTON */}
      <button
        ref={prevRef}
        style={{ top: "50%", transform: "translateY(-50%)" }} // 👈 inline style instead of Tailwind
        className="absolute left-3 z-10
                   bg-black/50 hover:bg-black/80
                   text-white
                   w-10 h-10 rounded-full
                   flex items-center justify-center
                   transition-all duration-200 shadow-lg cursor-pointer"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* NEXT BUTTON */}
      <button
        ref={nextRef}
        style={{ top: "50%", transform: "translateY(-50%)" }} // 👈 inline style instead of Tailwind
        className="absolute right-3 z-10
                   bg-black/50 hover:bg-black/80
                   text-white
                   w-10 h-10 rounded-full
                   flex items-center justify-center
                   transition-all duration-200 shadow-lg cursor-pointer"
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        navigation={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation = {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };
        }}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className={className} // h-125 is here, wrapper will auto match it
      >
        {sliderImages.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Carousel slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default ImageCarousel;