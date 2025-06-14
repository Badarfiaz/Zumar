import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function User() {
  const [user, setUser] = useState(null);
  const { cartItems } = useCart();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#2D2D2D] p-6 font-serif">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-emerald-500 mb-6 border-b border-emerald-500 pb-2">
          User Profile
        </h1>

        {user ? (
          <>
            <div className="mb-8 text-lg">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-emerald-500 mb-4">Cart Items</h2>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="bg-[#F3F4F6] p-5 rounded-2xl shadow-sm">
                    <p><span className="font-semibold">Product:</span> {item.name}</p>
                    <p><span className="font-semibold">Price:</span> ${item.price}</p>
                    <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                    {item.color && (
                      <p><span className="font-semibold">Color:</span> <span className="text-emerald-600">{item.color}</span></p>
                    )}
                    {item.size && (
                      <p><span className="font-semibold">Size:</span> <span className="text-emerald-600">{item.size}</span></p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items in cart.</p>
            )}
          </>
        ) : (
          <div className="text-lg">
            <p>
              Please{' '}
              <Link to="/Sign" className="text-emerald-500 underline hover:text-emerald-600 transition">
                sign in
              </Link>{' '}
              to view your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
