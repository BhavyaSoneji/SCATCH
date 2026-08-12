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
  const sliderImages = images.length ? images : defaultImages;
  return (
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
      navigation={true}
      className={className}
      effect="fade"
    >
      {sliderImages.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt={`Carousel slide ${i + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
