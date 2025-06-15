 
import { Link } from "react-router-dom";
 

export default function Home() {
  
  return (
    <div className="bg-[#F8F5F2] text-[#1A1A1A] font-sans">
      {/* Modern Hero Section */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        >
          <source src="/luxury-fashion.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-white">
              <span className="text-emerald-300">Curated</span> Luxury for the Modern Woman
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover handcrafted accessories that elevate your everyday elegance. 
              Each piece tells a story of craftsmanship and timeless style.
            </p>
            <Link to="/jewelry" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-medium tracking-widest">COLLECTIONS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Signature Lines</h2>
            <p className="max-w-2xl mx-auto text-[#666] text-lg">
              Our seasonal collections blend contemporary design with enduring quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80"
                alt="Handbags"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Artisan Handbags</h3>
                  <Link to={"/women"} className="text-white border-b border-white/50 pb-1 hover:border-white transition-colors">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80"
                alt="Footwear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Luxury Footwear</h3>
                  <Link to={"/women"} className="text-white border-b border-white/50 pb-1 hover:border-white transition-colors">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                alt="Jewelry"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Statement Jewelry</h3>
                  <Link to={"/jewelry"} className="text-white border-b border-white/50 pb-1 hover:border-white transition-colors">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-emerald-600 font-medium tracking-widest">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-12">Women Love Our Pieces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The craftsmanship is exceptional. I receive compliments every time I wear their pieces.",
                author: "Sarah J., Fashion Editor"
              },
              {
                quote: "Finally found accessories that match both my professional and personal style.",
                author: "Michelle T., Lawyer"
              },
              {
                quote: "Investment pieces that I know I'll wear for years to come. Worth every penny.",
                author: "Amanda R., Entrepreneur"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#F8F5F2] p-8 rounded-xl">
                <div className="text-5xl text-emerald-600 mb-4">“</div>
                <p className="text-lg italic mb-6">{testimonial.quote}</p>
                <p className="font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-16 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our World</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe for exclusive access to new collections, private events, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-emerald-400 text-white placeholder-white/60"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

     </div>
  );
}