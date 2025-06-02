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
    <div className="bg-[#F5F5F2] min-h-screen font-serif text-[#1C1C1E]">
      {/* Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#1C1C1E] tracking-tight">
          Welcome to <span className="text-[#D4AF37]">Shirtopia</span>
        </h1>
        <p className="text-lg md:text-xl text-[#4A4A4A] font-medium max-w-2xl mx-auto">
          Timeless essentials. Uncompromising comfort. Tailored to those who know better.
        </p>
      </header>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {products.length === 0 ? (
            <p className="text-[#8C8C8C] col-span-full text-center text-xl">
              Loading products...
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl mb-4 border border-[#E0E0E0]"
                />
                <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-2">
                  {product.name}
                </h2>
                <p className="text-[#555] italic mb-4 text-sm">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-[#D4AF37]">${product.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mb-24 px-4 md:px-8">
        <BannerCarousel />
      </section>

      <Footer />
    </div>
  );
}
