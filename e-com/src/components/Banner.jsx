import { Link } from 'react-router-dom';

export default function Banner({ title, subtitle, imageUrl, buttonText, link }) {
  return (
    <section
      className="
        relative h-[70vh] md:h-[80vh] bg-cover bg-center 
        rounded-xl overflow-hidden shadow-lg border border-emerald-200 
        transition-transform duration-500 ease-in-out hover:scale-[1.015]
      "
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="
          absolute inset-0 bg-gradient-to-br 
          from-black/70 via-black/50 to-black/30 
          flex items-center justify-start px-8 md:px-16
        "
      >
        <div className="max-w-xl text-left text-white space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-emerald-300 drop-shadow-lg">
            {title || "Timeless Elegance"}
          </h2>

          <p className="text-base md:text-lg text-gray-200 font-serif leading-relaxed">
            {subtitle ||
              "Discover handcrafted earrings that whisper sophistication. Elevate every occasion with a touch of shimmer and grace."}
          </p>

          <Link
            to={link || "/"}
            className="
              inline-block mt-4 bg-emerald-500 text-white font-semibold 
              px-6 py-3 rounded-full shadow-md hover:bg-emerald-600 
              transition duration-300 tracking-wide
            "
          >
            {buttonText || "Browse Collection"}
          </Link>
        </div>
      </div>
    </section>
  );
}
