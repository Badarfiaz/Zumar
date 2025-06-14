import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    address: '',
    email: '',
    paymentMethod: 'Cash on Delivery',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cartItemsCol = collection(db, 'cartItems');
        const tshirtsCol = collection(db, 't-shirts');

        const [cartItemsSnapshot, tshirtsSnapshot] = await Promise.all([
          getDocs(cartItemsCol),
          getDocs(tshirtsCol),
        ]);

        const cartItemsList = cartItemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const tshirtsList = tshirtsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allProducts = [...cartItemsList, ...tshirtsList];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getProductDetails = (cartItem) => {
    const matchById = products.find(p => p.id === cartItem.id);
    return matchById || { ...cartItem };
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleProceedToBuy = () => setShowForm(true);

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const { name, email, address, paymentMethod } = orderData;
    const itemsSummary = cartItems
      .map(item => `${item.name} x ${item.quantity} (${item.color || 'No Color'}, ${item.size || 'No Size'}) - ₹${item.price * item.quantity}`)
      .join(', ');

    const messageContent = `
      Name: ${name}
      Email: ${email}
      Address: ${address}
      Payment: ${paymentMethod}
      Order: ${itemsSummary}
      Total: ₹${getTotalPrice()}
    `;

    emailjs.send(
      'service_fqrzmsd',
      'template_wmpn0ci',
      {
        user_name: name,
        user_email: email,
        message: messageContent,
      },
      'Ac-dhmFbROV__5uNp'
    ).then(() => {
      setMessage('Thank you for your purchase! A confirmation email has been sent.');
      clearCart();
      setShowForm(false);
    }).catch(() => {
      setMessage('Order confirmed, but we could not send a confirmation email.');
      clearCart();
      setShowForm(false);
    });
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen text-[#2D2D2D] py-16 px-6 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold mb-10 text-emerald-500 border-b border-emerald-500 pb-4">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-xl text-center">{message || 'Your cart is empty.'}</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cartItems.map((item, index) => {
                const product = getProductDetails(item);
                return (
                  <li key={index} className="flex flex-col sm:flex-row sm:items-center bg-[#F3F4F6] p-6 rounded-2xl shadow-sm gap-6">
                    <img
                      src={product.image || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-xl shadow"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="text-2xl font-bold font-serif">{product.name}</p>
                      <p className="text-lg text-emerald-500 font-medium">${product.price}</p>
                      {item.color && (
                        <p className="text-sm text-gray-600">
                          Color: <span className="text-emerald-600 font-semibold">{item.color}</span>
                        </p>
                      )}
                      {item.size && (
                        <p className="text-sm text-gray-600">
                          Size: <span className="text-emerald-600 font-semibold">{item.size}</span>
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <button onClick={() => decreaseQuantity(item)} className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-full font-bold text-white transition">−</button>
                        <span className="text-lg font-semibold">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-full font-bold text-white transition">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wide self-start sm:self-center transition">
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-3xl font-bold">Total: ${getTotalPrice()}</p>
              <button
                onClick={handleProceedToBuy}
                className="bg-emerald-500 text-white text-lg font-bold py-3 px-6 rounded-xl hover:bg-emerald-600 transition-all duration-200 font-serif"
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleSubmitOrder}
              className="bg-white text-[#2D2D2D] p-8 rounded-2xl shadow-2xl max-w-lg w-full space-y-5 font-serif"
            >
              <h2 className="text-2xl font-bold mb-4 text-emerald-500">Enter Your Details</h2>
              <input type="text" name="name" placeholder="Full Name" value={orderData.name} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="email" name="email" placeholder="Email Address" value={orderData.email} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <textarea name="address" placeholder="Shipping Address" value={orderData.address} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <select name="paymentMethod" value={orderData.paymentMethod} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Card Payment">Card Payment</option>
              </select>

              {orderData.paymentMethod === 'Card Payment' && (
                <>
                  <input type="text" name="cardNumber" placeholder="Card Number" value={orderData.cardNumber} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={orderData.expiryDate} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="text" name="cvv" placeholder="CVV" value={orderData.cvv} onChange={handleInputChange} required className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </>
              )}

              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold text-white transition">Confirm Order</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
