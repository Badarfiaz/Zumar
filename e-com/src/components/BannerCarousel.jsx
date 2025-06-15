import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const banners = [
  {
    title: "Elegant Earrings",
    subtitle: "Where sparkle meets sophistication — find your perfect pair.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0563/9621/0499/products/GoldPlatedEarrings.jpg?v=1640707782",
    buttonText: "Browse Collection",
    link: "/",
  },
  {
    title: "Radiant Deals",
    subtitle: "Enjoy up to 50% off — indulge without compromise.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0661/4167/8516/products/GoldenDrops.jpg?v=1678862646",
    buttonText: "Explore Offers",
    link: "/women",
  },
  {
    title: "New Arrivals",
    subtitle: "Timeless drops & modern studs — just landed.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0680/4150/7116/products/IMG_9210.jpg?v=1672917796",
    buttonText: "See What's New",
    link: "/jewlery",
  },
];

export default function BannerCarousel() {
  return (
    <div className="mt-8">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={7000}
        showStatus={false}
        showArrows={false}
        swipeable
        emulateTouch
      >
        {banners.map((banner, idx) => (
          <div key={idx} className="relative h-[65vh] md:h-[85vh] bg-cover bg-center" style={{ backgroundImage: `url(${banner.imageUrl})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-2xl text-left">
                <h2 className="text-4xl md:text-5xl font-serif text-emerald-300 font-bold mb-4 drop-shadow">
                  {banner.title}
                </h2>
                <p className="text-gray-200 text-lg md:text-xl mb-6 leading-relaxed">
                  {banner.subtitle}
                </p>
                <Link
                  to={banner.link}
                  className="inline-block px-6 py-3 border border-emerald-400 text-emerald-400 font-medium rounded-full hover:bg-emerald-400 hover:text-black transition duration-300"
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
