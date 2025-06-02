import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const banners = [
  {
    title: "Welcome to Shirtopia",
    subtitle: "Discover premium t-shirts that match your legacy.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    buttonText: "Shop Now",
    link: "/shop",
  },
  {
    title: "Summer Refinement",
    subtitle: "Up to 40% off — effortless elegance for warmer days.",
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1a6",
    buttonText: "Explore Sale",
    link: "/summer-sale",
  },
  {
    title: "New Classics",
    subtitle: "Tailored arrivals with timeless appeal.",
    imageUrl: "https://images.unsplash.com/photo-1555529669-93bcb38e1f82",
    buttonText: "View Collection",
    link: "/new",
  },
];

export default function BannerCarousel() {
  return (
    <div className="mt-10">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={6000}
        showStatus={false}
        showArrows={true}
        swipeable
        emulateTouch
      >
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="relative h-[65vh] md:h-[80vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1E]/90 via-[#2D2D2D]/80 to-[#3C3C3C]/80 flex items-center justify-center text-center px-6">
              <div className="max-w-3xl">
                <h2 className="text-[#D4AF37] text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide">
                  {banner.title}
                </h2>
                <p className="text-[#EEEBDD] text-lg md:text-xl mb-8 font-medium italic">
                  {banner.subtitle}
                </p>
                <Link
                  to={banner.link}
                  className="inline-block border-2 border-[#D4AF37] text-[#D4AF37] font-semibold px-8 py-3 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
