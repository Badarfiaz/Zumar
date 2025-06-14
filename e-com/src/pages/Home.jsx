import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import BannerCarousel from "../components/BannerCarousel";
import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  return (
    <div className="bg-[#FDFCFB] text-[#1C1C1E] font-serif">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 md:px-8 bg-gradient-to-b from-white via-[#FAFAF9] to-[#F5F5F5]">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Elevate Your Look with <span className="text-emerald-400">Elegant Earrings</span>
        </h1>
        <p className="max-w-2xl mx-auto text-[#4A4A4A] text-lg md:text-xl font-medium">
          Crafted with precision, designed for grace. Discover earrings that speak your style.
        </p>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1E] mb-3">
            Our Signature Collection
          </h2>
          <p className="text-[#666] text-base md:text-lg">
            Each pair curated for timeless sparkle and elegance.
          </p>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-xl text-[#888]">
              Loading earrings...
            </p>
          ) : (
            products.map(product => (
              <div
                key={product.id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col items-center text-center"
              >
                <div className="overflow-hidden rounded-xl mb-4 w-full h-64">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1E] mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-[#666] italic mb-3">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-emerald-500">${product.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="mb-24 px-4 md:px-8">
        <BannerCarousel />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
