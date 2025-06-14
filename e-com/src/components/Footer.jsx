import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF9] text-[#2D2D2D] pt-16 pb-10 font-serif border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-emerald-500">
            ElegaWear
          </h2>
          <p className="text-[#555] text-sm md:text-base leading-relaxed">
            Where grace meets craftsmanship. Explore our curated earrings designed for timeless allure and elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-emerald-400 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-[#444] text-sm md:text-base">
            <li>
              <a href="/" className="hover:text-emerald-500 transition duration-300">Home</a>
            </li>
            <li>
              <a href="/shop" className="hover:text-emerald-500 transition duration-300">Shop</a>
            </li>
            <li>
              <a href="/about" className="hover:text-emerald-500 transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-emerald-500 transition duration-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-emerald-400 pb-2">
            Connect
          </h3>
          <div className="flex space-x-5 text-[#555] text-xl">
            <a href="#" className="hover:text-emerald-500 transition duration-300" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-emerald-500 transition duration-300" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-emerald-500 transition duration-300" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-emerald-500 transition duration-300" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-[#888] text-sm">
        &copy; {new Date().getFullYear()} ElegaWear. All rights reserved.
      </div>
    </footer>
  );
}
