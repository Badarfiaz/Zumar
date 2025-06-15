import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
 import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Jewelry products data - can be moved to a separate file if needed
const jewelryProducts = [
  {
    id: 1,
    name: 'Diamond Pendant Necklace',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    colors: ['Silver', 'Gold'],
    sizes: ['16"', '18"', '20"'],
  },
  {
    id: 2,
    name: 'Pearl Stud Earrings',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['White', 'Cream'],
    sizes: ['6mm', '8mm', '10mm'],
  },
  {
    id: 3,
    name: 'Gold Bangle Bracelet',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1611591437281-4608be122683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['Yellow Gold', 'Rose Gold'],
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: 4,
    name: 'Sapphire Halo Ring',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1603974372039-adc5d7a02651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['Blue', 'Pink'],
    sizes: ['5', '6', '7', '8'],
  },
  {
    id: 5,
    name: 'Diamond Tennis Bracelet',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1611594606050-dfe9c5802ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['White Gold', 'Yellow Gold'],
    sizes: ['7"', '7.5"', '8"'],
  },
  {
    id: 6,
    name: 'Emerald Drop Earrings',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['Green'],
    sizes: ['Small', 'Medium'],
  },
  {
    id: 7,
    name: 'Infinity Love Ring',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1603974372039-adc5d7a02651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['Silver', 'Rose Gold'],
    sizes: ['5', '6', '7', '8'],
  },
  {
    id: 8,
    name: 'Charm Bracelet',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1611591437281-4608be122683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    colors: ['Silver', 'Gold'],
    sizes: ['7"', '7.5"', '8"'],
  },
];

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (productId, key, value) => {
    setSelectedOptions(prev => ({
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
      alert('Please select both color and size before adding to cart.');
      return;
    }

    const productWithOptions = { 
      ...product, 
      color, 
      size,
      addedAt: Date.now() 
    };
    
    addToCart(productWithOptions);

    try {
      await addDoc(collection(db, 'jewelry'), {
        ...productWithOptions,
        addedAt: Timestamp.now(),
      });
      console.log('💎 Jewelry added to cart and Firebase');
    } catch (error) {
      console.error('❌ Error adding to Firebase:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-4 py-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Luxurious Jewelry Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite handcrafted pieces that add elegance to every occasion
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jewelryProducts.map((product) => {
            const selected = selectedOptions[product.id] || {};
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    New
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 font-serif line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-emerald-600 font-bold whitespace-nowrap">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Color Options */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Color:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleOptionChange(product.id, 'color', color)}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            selected.color === color
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-white border-gray-300 text-gray-700'
                          } hover:bg-emerald-50 hover:border-emerald-300 transition`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Options */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Size:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleOptionChange(product.id, 'size', size)}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            selected.size === size
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-white border-gray-300 text-gray-700'
                          } hover:bg-emerald-50 hover:border-emerald-300 transition`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Add to Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Shop;