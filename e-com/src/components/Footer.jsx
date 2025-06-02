import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1E] text-[#E5E5E5] pt-12 pb-8 mt-20 font-serif">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-5 tracking-wide text-[#D4AF37]">
            Shirtopia
          </h2>
          <p className="text-[#D8CAB8] text-sm md:text-base">
            Where timeless style meets effortless comfort. Explore our elevated essentials crafted with elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5 border-b border-[#D4AF37] pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-[#CFCFCF] text-sm md:text-base">
            <li>
              <a href="/" className="hover:text-[#D4AF37] transition duration-300">Home</a>
            </li>
            <li>
              <a href="/shop" className="hover:text-[#D4AF37] transition duration-300">Shop</a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#D4AF37] transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#D4AF37] transition duration-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-5 border-b border-[#D4AF37] pb-2">
            Subscribe
          </h3>
          <p className="text-[#CFCFCF] text-sm mb-5">
            Join our list for refined releases, private sales, and tailored updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-l-full w-full text-[#1C1C1E] bg-[#F5F5F5] font-medium focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] px-6 py-2 rounded-r-full font-semibold text-[#1C1C1E] hover:bg-[#E0C97D] transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-5 border-b border-[#D4AF37] pb-2">
            Follow Us
          </h3>
          <div className="flex space-x-6 text-[#BEBEBE] text-xl">
            <a href="#" className="hover:text-[#D4AF37] transition duration-300" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300" aria-label="Github">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-[#3A3A3C] pt-6 text-center text-[#A6A6A6] text-sm select-none">
        &copy; {new Date().getFullYear()} Shirtopia. All rights reserved.
      </div>
    </footer>
  );
}
