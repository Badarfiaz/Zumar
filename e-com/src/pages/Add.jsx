import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiTrash2, FiPlus, FiMinus, FiX, FiCreditCard, FiTruck } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
        const productsCol = collection(db, 'products');
        const snapshot = await getDocs(productsCol);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getProductDetails = (cartItem) => {
    return products.find(p => p.id === cartItem.id) || { ...cartItem };
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToBuy = () => setShowForm(true);

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const { name, email, address, paymentMethod } = orderData;
      const itemsSummary = cartItems
        .map(item => {
          const product = getProductDetails(item);
          return `${product.name} (${item.quantity}x) - $${(product.price * item.quantity).toFixed(2)}`;
        })
        .join('\n');

      const totalPrice = getTotalPrice().toFixed(2);
      const orderDetails = `
        Customer: ${name}
        Email: ${email}
        Delivery Address: ${address}
        Payment Method: ${paymentMethod}
        
        Order Items:
        ${itemsSummary}
        
        Total: $${totalPrice}
      `;

      await emailjs.send(
        'service_fqrzmsd',
        'template_wmpn0ci',
        {
          user_name: name,
          user_email: email,
          message: orderDetails,
        },
        'Ac-dhmFbROV__5uNp'
      );

      setMessage({
        text: 'Thank you for your purchase! A confirmation has been sent to your email.',
        type: 'success'
      });
      clearCart();
      setShowForm(false);
    } catch (error) {
      setMessage({
        text: 'Order confirmed! (Email notification failed)',
        type: 'warning'
      });
      clearCart();
      setShowForm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Shopping Bag</h1>
          <p className="text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {message.text && (
          <div className={`mb-8 p-4 rounded-lg ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {message.text}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-xl text-gray-500 mb-6">Your cart is currently empty</p>
            <a href="/" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                const product = getProductDetails(item);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-48 bg-gray-100 flex items-center justify-center">
                        <img
                          src={product.image || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-emerald-600 font-medium mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item)}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>

                        <div className="mt-4">
                          {item.color && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Color:</span> {item.color}
                            </p>
                          )}
                          {item.size && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Size:</span> {item.size}
                            </p>
                          )}
                        </div>

                        <div className="mt-6 flex items-center">
                          <button 
                            onClick={() => decreaseQuantity(item)}
                            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="mx-4 text-lg font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => addToCart(item)}
                            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-emerald-600 font-bold text-xl">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToBuy}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500 transition"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                  <textarea
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setOrderData({...orderData, paymentMethod: 'Cash on Delivery'})}
                      className={`p-4 border rounded-lg flex items-center justify-center transition ${orderData.paymentMethod === 'Cash on Delivery' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <FiTruck className="mr-2" />
                      <span>Cash on Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderData({...orderData, paymentMethod: 'Card Payment'})}
                      className={`p-4 border rounded-lg flex items-center justify-center transition ${orderData.paymentMethod === 'Card Payment' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <FiCreditCard className="mr-2" />
                      <span>Card Payment</span>
                    </button>
                  </div>
                </div>

                {orderData.paymentMethod === 'Card Payment' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={orderData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={orderData.expiryDate}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={orderData.cvv}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Complete Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;