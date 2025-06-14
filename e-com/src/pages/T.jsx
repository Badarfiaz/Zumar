import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const products = [{
    id: 1,
    name: 'Classic White Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    colors: ['White', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Printed T-Shirt - White',
    price: 39.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S01e7c5c3f5bf4632b8e94d2d73cd6f6e5_jpg_640x640Q90_jpg.jpg?v=1664899580',
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Printed T-Shirt - Cream',
    price: 34.99,
    image: 'https://shopgroove.pk/cdn/shop/files/S3b462927b74e44ba98a0ac5b79db3a669-1080x_1.jpg?v=1723511428',
    colors: ['Cream', 'Orange'],
    sizes: ['M', 'L'],
  },
  {
    id: 4,
    name: 'Printed T-Shirt - Black',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S3de10d87d99b4ef787a75caaa6dba0dak_jpg_640x640Q90_jpg.jpg?v=1664899581',
    colors: ['Black', 'Charcoal'],
    sizes: ['S', 'M', 'XL'],
  },
  {
    id: 5,
    name: 'Printed T-Shirt - Orange',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/files/Sf33b14ab45964009908821bdc5ae38baw-1080x_1.jpg?v=1723511431',
    colors: ['Orange'],
    sizes: ['L', 'XL'],
  },
  {
    id: 6,
    name: 'Printed T-Shirt - Charcoal',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/S522ae347b33e49d89e916206a8e820b8h_jpg_640x640Q90_jpg.jpg?v=1664899714',
    colors: ['Charcoal'],
    sizes: ['M', 'L'],
  },
  {
    id: 7,
    name: 'Printed T-Shirt - BLB',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/H161e0ee4bb894fb78bccf8a006d3b385t_jpg_640x640Q90_jpg.jpg?v=1664899913',
    colors: ['Black', 'BLB'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'Printed T-Shirt - Green',
    price: 44.99,
    image: 'https://shopgroove.pk/cdn/shop/products/H1046773e37df4983bdea77cc41463938e.jpg_640x640q90-_1.jpg?v=1664899498',
    colors: ['Green'],
    sizes: ['M', 'L'],
  },];

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
      await addDoc(collection(db, 't-shirts'), {
        ...productWithOptions,
        addedAt: Timestamp.now(),
      });
      console.log('✅ Product added to Firebase');
    } catch (error) {
      console.error('❌ Error adding to Firebase:', error);
    }
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#2D2D2D] px-6 py-10 font-sans">
      <h2 className="text-4xl font-extrabold text-center text-emerald-500 mb-12 font-serif">
        Shop Our T-Shirts
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {products.map((product) => {
          const selected = selectedOptions[product.id] || {};
          return (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 font-serif">{product.name}</h3>
                <p className="text-emerald-500 font-semibold text-lg mb-4">${product.price.toFixed(2)}</p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleChange(product.id, 'color', color)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selected.color === color
                          ? 'bg-emerald-500 text-white font-semibold'
                          : 'bg-white border-emerald-500 text-emerald-500'
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
                          ? 'bg-emerald-500 text-white font-semibold'
                          : 'bg-white border-emerald-500 text-emerald-500'
                      } hover:opacity-90 transition`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition font-bold"
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
