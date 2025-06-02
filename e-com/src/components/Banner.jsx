import { Link } from 'react-router-dom';

export default function Banner({ title, subtitle, imageUrl, buttonText, link }) {
  return (
    <section
      className="relative bg-cover bg-center h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden shadow-xl border-[3px] border-[#A67B5B] hover:scale-[1.02] transition-transform duration-500 ease-in-out"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1C1C1E]/90 via-[#3E2F2F]/70 to-[#4B3621]/60 flex flex-col items-center justify-center text-center px-6">
        <div className="text-[#F8F5F2] max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-md tracking-wide uppercase">
            {title}
          </h1>
          <p className="text-lg md:text-2xl mb-10 font-serif italic tracking-wide text-[#EDE6DB]">
            {subtitle}
          </p>
          <Link
            to={link}
            className="inline-block bg-[#D4AF37] text-[#1C1C1E] font-serif font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#E0C97D] transition-all duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
