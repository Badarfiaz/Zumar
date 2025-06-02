import React from 'react';

const products = [
  {
    id: 1,
    name: 'Classic White Shirt',
    price: 29.99,
    image: 'https://via.placeholder.com/300x400?text=White+Shirt',
  },
  {
    id: 2,
    name: 'Black Denim Shirt',
    price: 39.99,
    image: 'https://via.placeholder.com/300x400?text=Black+Shirt',
  },
  {
    id: 3,
    name: 'Flannel Red Shirt',
    price: 34.99,
    image: 'https://via.placeholder.com/300x400?text=Flannel+Shirt',
  },
  {
    id: 4,
    name: 'Linen Blue Shirt',
    price: 44.99,
    image: 'https://via.placeholder.com/300x400?text=Linen+Shirt',
  },
];

const Shop = () => {
  return (
    <div className="bg-[#1C1C1E] min-h-screen text-white px-4 py-8 font-serif">
      <h2 className="text-3xl text-[#D4AF37] font-bold text-center mb-10">Shop Our Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#2C2C2E] rounded-lg overflow-hidden shadow-md border border-[#3A3A3C] hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-[#D4AF37] text-md mb-4">${product.price.toFixed(2)}</p>
              <button className="w-full bg-[#D4AF37] text-black py-2 rounded hover:bg-[#E0C97D] transition font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
