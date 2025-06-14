import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Sample T-Shirts
const tShirts = [
  {
    id: 1,
    name: 'Classic White Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop',
    category: 't',
  },
  {
    id: 2,
    name: 'Printed T-Shirt - White',
    price: 39.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S01e7c5c3f5bf4632b8e94d2d73cd6f6e5_jpg_640x640Q90_jpg.jpg?v=1664899580',
    category: 't',
  },
  {
    id: 3,
    name: 'Printed T-Shirt - Cream',
    price: 34.99,
    image: 'https://shopgroove.pk/cdn/shop/files/S3b462927b74e44ba98a0ac5b79db3a669-1080x_1.jpg?v=1723511428',
    category: 't',
  },
  {
    id: 4,
    name: 'Printed T-Shirt - Black',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S3de10d87d99b4ef787a75caaa6dba0dak_jpg_640x640Q90_jpg.jpg?v=1664899581',
    category: 't',
  },
  {
    id: 5,
    name: 'Printed T-Shirt - Orange',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/files/Sf33b14ab45964009908821bdc5ae38baw-1080x_1.jpg?v=1723511431',
    category: 't',
  },
  {
    id: 6,
    name: 'Printed T-Shirt - Charcoal',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S522ae347b33e49d89e916206a8e820b8h_jpg_640x640Q90_jpg.jpg?v=1664899714',
    category: 't',
  },
];

const polos = [
  {
    id: 1,
    name: 'Olive Zipper Polo Shirt',
    price: 29.99,
    image: 'https://thehawk.pk/cdn/shop/products/1_8d9d9da0-613c-4108-9930-b0b276395477.jpg?v=1679415467&width=1100',
    category: 'polo',
  },
  {
    id: 2,
    name: 'Black Zipper Polo Shirt',
    price: 39.99,
    image: 'https://thehawk.pk/cdn/shop/products/a5736647dc5b445e5a197c02a66609d4.jpg?v=1680808653&width=1100',
    category: 'polo',
  },
  {
    id: 3,
    name: 'White Zipper Polo Shirt',
    price: 34.99,
    image: 'https://thehawk.pk/cdn/shop/products/IMG_20230323_155650.jpg?v=1679569540&width=1100',
    category: 'polo',
  },
  {
    id: 4,
    name: 'Green Zipper Polo Shirt',
    price: 44.99,
    image: 'https://thehawk.pk/cdn/shop/products/IMG_20230323_154459.png?v=1679568925&width=1100',
    category: 'polo',
  },
  {
    id: 5,
    name: 'Mustard Polo Shirt',
    price: 44.99,
    image: 'https://jsstore.com.pk/wp-content/uploads/2022/11/11-2-600x758.jpg',
    category: 'polo',
  },
];

const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Shop = () => {
  const randomTShirts = getRandomItems(tShirts, 4);
  const randomPolos = getRandomItems(polos, 4);
  const mixedProducts = [...randomTShirts, ...randomPolos].sort(() => 0.5 - Math.random());

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#2D2D2D] px-4 py-10 font-serif">
      <h2 className="text-3xl font-bold text-center mb-10 text-emerald-500">Shop Our Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {mixedProducts.map((product, index) => (
          <div
            key={`${product.id}-${product.category}-${index}`}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-emerald-500 text-md mb-4">${product.price.toFixed(2)}</p>
              <Link
                to={`/${product.category}`}
                className="block text-center bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-semibold"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
