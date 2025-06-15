import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const products = [
  {
    id: 1,
    name: 'Silk Blouse',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    colors: ['Ivory', 'Blush'],
    sizes: ['XS', 'S', 'M'],
  },
  {
    id: 2,
    name: 'Wool Coat',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    colors: ['Camel', 'Black'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Cashmere Sweater',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    colors: ['Cream', 'Heather Grey'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'Linen Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    colors: ['White', 'Khaki'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 5,
    name: 'Denim Jacket',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    colors: ['Classic Blue', 'Black'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 6,
    name: 'Midi Skirt',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    colors: ['Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M'],
  },
  {
    id: 7,
    name: 'Wide-Leg Trousers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    colors: ['Black', 'Beige'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'Knit Cardigan',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    colors: ['Grey', 'Rose'],
    sizes: ['XS', 'S', 'M', 'L'],
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
      alert('Please select both color and size before adding to cart.');
      return;
    }

    const productWithOptions = { ...product, color, size };
    addToCart(productWithOptions);

    try {
      await addDoc(collection(db, 'womens-fashion'), {
        ...productWithOptions,
        addedAt: Timestamp.now(),
      });
      console.log('✅ Outfit added to Firebase');
    } catch (error) {
      console.error('❌ Error adding to Firebase:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 px-4 py-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Elegant Women's Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover timeless pieces for every occasion
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const selected = selectedOptions[product.id] || {};
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-80 overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 font-serif">{product.name}</h3>
                    <span className="text-emerald-600 font-bold">${product.price.toFixed(2)}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Color:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleChange(product.id, 'color', color)}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            selected.color === color
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-white border-gray-300 text-gray-700'
                          } hover:bg-gray-50 hover:border-emerald-300 transition`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Size:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleChange(product.id, 'size', size)}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            selected.size === size
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-white border-gray-300 text-gray-700'
                          } hover:bg-gray-50 hover:border-emerald-300 transition`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold shadow-md hover:shadow-lg"
                  >
                    Add to Cart
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