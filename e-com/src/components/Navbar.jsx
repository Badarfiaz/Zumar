import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-[#1f2937] border border-gray-600 text-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
      <p className="mb-4 text-lg">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
);

function Navbar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Navigation links configuration
  const navLinks = [
    { path: "/", name: "Home", protected: false },
    { path: "/jewelry", name: "Jewelry", protected: false },
    { path: "/women", name: "Women's Collection", protected: false },
   ];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(getAuth());
    navigate("/sign");
  };

  const confirmSignOut = async () => {
    setShowModal(false);
    await handleLogout();
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Filter links based on authentication status
  const filteredLinks = navLinks.filter(link => !link.protected || user);

  return (
    <>
      <nav className="bg-[#111827] text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button onClick={toggleSidebar} className="md:hidden">
            <Bars3Icon className="h-6 w-6 text-emerald-400" />
          </button>
          <Link to="/" className="text-2xl font-bold font-mono text-emerald-400 hover:text-emerald-300 transition">
            LuxeBoutique
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {filteredLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className="hover:text-emerald-400 transition"
                onClick={closeSidebar}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <button 
                onClick={() => setShowModal(true)} 
                className="hover:text-emerald-400 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/sign" 
                className="hover:text-emerald-400 transition"
                onClick={closeSidebar}
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>

        {/* User and Cart Icons */}
        <div className="flex items-center space-x-4">
          {user && (
            <Link to="/user">
              <UserIcon className="h-6 w-6 text-emerald-400 hover:text-emerald-300 transition" />
            </Link>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-emerald-400 hover:text-emerald-300 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden" onClick={closeSidebar} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-64 h-full z-50 bg-[#111827] backdrop-blur-md border-r border-gray-700 shadow-lg transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-mono font-bold text-emerald-400">LuxeBoutique</h2>
          <button onClick={toggleSidebar}>
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 text-white text-base p-5">
          {filteredLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                onClick={closeSidebar}
                className="block py-2 hover:text-emerald-400 transition"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <button 
                onClick={() => { closeSidebar(); setShowModal(true); }}
                className="block py-2 hover:text-emerald-400 transition text-left w-full"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/sign" 
                onClick={closeSidebar}
                className="block py-2 hover:text-emerald-400 transition"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to sign out?"
          onConfirm={confirmSignOut}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Navbar;