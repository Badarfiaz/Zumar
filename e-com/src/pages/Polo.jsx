import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const products = [
  {
    id: 1,
    name: 'Zipper Polo Shirt',
    price: 29.99,
    image: 'https://thehawk.pk/cdn/shop/products/1_8d9d9da0-613c-4108-9930-b0b276395477.jpg?v=1679415467&width=1100',
    colors: ['Olive', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Zipper Polo Shirt',
    price: 39.99,
    image: 'https://thehawk.pk/cdn/shop/products/a5736647dc5b445e5a197c02a66609d4.jpg?v=1680808653&width=1100',
    colors: ['Black', 'Grey'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Zipper Polo Shirt',
    price: 34.99,
    image: 'https://thehawk.pk/cdn/shop/products/IMG_20230323_155650.jpg?v=1679569540&width=1100',
    colors: ['White'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Zipper Polo Shirt',
    price: 44.99,
    image: 'https://thehawk.pk/cdn/shop/products/IMG_20230323_154459.png?v=1679568925&width=1100',
    colors: ['Green', 'Olive'],
    sizes: ['S', 'M', 'XL'],
  },
  {
    id: 5,
    name: 'Drop Shoulder Polo',
    price: 44.99,
    image: 'https://fittedshop.com/cdn/shop/files/3a_8bfac3ce-51e4-4967-b644-95e1c8e93bf3.jpg?v=1748240495&width=1800',
    colors: ['Olive'],
    sizes: ['L', 'XL'],
  },
  {
    id: 6,
    name: 'Sailor Polo Shirt',
    price: 44.99,
    image: 'https://leftoversden.com/cdn/shop/files/0_41.jpg?v=1741416800',
    colors: ['White', 'Blue'],
    sizes: ['M', 'L'],
  },
  {
    id: 7,
    name: 'Polo Shirt',
    price: 44.99,
    image: 'https://jsstore.com.pk/wp-content/uploads/2022/11/12-2-600x758.jpg',
    colors: ['Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'Polo Shirt',
    price: 44.99,
    image: 'https://jsstore.com.pk/wp-content/uploads/2022/11/11-2-600x758.jpg',
    colors: ['Mustard'],
    sizes: ['M', 'L'],
  },
];

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleChange = (productId, key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value,
      },
    }));
  };

  const handleAddToCart = async (product) => {
    const options = selectedOptions[product.id] || {};
    const { color, size } = options;

    if (!color || !size) {
      alert('Please select both color and size.');
      return;
    }

    const productWithOptions = { ...product, color, size };
    addToCart(productWithOptions);

    try {
      await addDoc(collection(db, 'polo-shirts'), {
        ...productWithOptions,
        addedAt: Timestamp.now(),
      });
      console.log('✅ Product added to Firebase');
    } catch (error) {
      console.error('❌ Error adding to Firebase:', error);
    }
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#2D2D2D] px-4 py-10">
      <h2 className="text-4xl text-center text-emerald-500 font-extrabold mb-12 tracking-tight font-serif">
        Premium Polo Shirts
      </h2>

     <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">

        {products.map((product) => {
          const selected = selectedOptions[product.id] || {};
          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 font-serif">{product.name}</h3>
                <p className="text-emerald-500 text-lg font-medium mb-4">${product.price.toFixed(2)}</p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleChange(product.id, 'color', color)}
                      className={`px-4 py-1 rounded-full text-sm border ${
                        selected.color === color
                          ? 'bg-emerald-500 text-white font-bold'
                          : 'text-emerald-500 border-emerald-500'
                      } hover:opacity-90 transition`}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleChange(product.id, 'size', size)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selected.size === size
                          ? 'bg-emerald-500 text-white font-bold'
                          : 'text-emerald-500 border-emerald-500'
                      } hover:opacity-90 transition`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
