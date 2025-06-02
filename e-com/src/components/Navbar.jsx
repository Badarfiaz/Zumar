import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Confirmation modal component
const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-[#1C1C1E] p-6 rounded-lg max-w-sm w-full text-white shadow-xl border border-[#3A3A3C]">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#e0c97d] transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
);

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Monitor Firebase user state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sign out logic
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/Sign");
  };

  const handleSignOutClick = () => {
    setShowModal(true);
  };

  const confirmSignOut = async () => {
    setShowModal(false);
    await handleLogout();
  };

  return (
    <nav className="bg-[#1C1C1E] shadow-md px-6 py-4 flex justify-between items-center border-b border-[#3A3A3C]">
      <div className="flex items-center space-x-10">
        <div className="text-3xl font-serif font-bold text-[#D4AF37] cursor-pointer hover:text-[#E0C97D] transition">
          <Link to="/">Shirtopia</Link>
        </div>

        <ul className="hidden md:flex space-x-8 text-[#E5E5E5] font-serif tracking-wider text-lg">
          <li className="hover:text-[#D4AF37] cursor-pointer transition">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-[#D4AF37] cursor-pointer transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-[#D4AF37] cursor-pointer transition">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-[#D4AF37] cursor-pointer transition">
            <Link to="/shop">Shop Now</Link>
          </li>
          <li className="hover:text-[#D4AF37] cursor-pointer transition">
            {user ? (
              <button onClick={handleSignOutClick} className="focus:outline-none">
                Sign Out
              </button>
            ) : (
              <Link to="/Sign">Sign Up</Link>
            )}
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-5 relative">
        <div
          className="flex items-center"
          onMouseEnter={() => setShowSearch(true)}
          onMouseLeave={() => setShowSearch(false)}
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-[#D4AF37] hover:text-[#E0C97D] cursor-pointer transition" />
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="ml-3 border border-[#D4AF37] bg-[#2C2C2E] text-[#F5F5F5] font-serif rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition duration-200"
              autoFocus
            />
          )}
        </div>
        <button aria-label="View cart" className="relative">
          <ShoppingCartIcon className="h-6 w-6 text-[#D4AF37] hover:text-[#E0C97D] cursor-pointer transition" />
        </button>
      </div>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to sign out?"
          onConfirm={confirmSignOut}
          onCancel={() => setShowModal(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
