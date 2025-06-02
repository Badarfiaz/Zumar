import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Footer from "../components/Footer";

// Styled Modal
const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 font-serif">
    <div className="bg-[#1C1C1E] border border-[#3A3A3C] text-[#E5E5E5] p-6 rounded-2xl max-w-sm w-full shadow-xl">
      <p className="mb-6 text-center">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-[#3A3A3C] hover:bg-[#555] transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-[#D4AF37] text-[#1C1C1E] rounded-md font-semibold hover:bg-[#e0c97d] transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("user", JSON.stringify({ email }));
        setModalMessage("Account Created!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("user", JSON.stringify({ email }));
        setModalMessage("Account Logged in!");
      }

      setEmail("");
      setPassword("");
      setFullName("");
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#1C1C1E] text-[#E5E5E5] font-serif">
      {/* Form Container */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-[#2A2A2D] p-8 rounded-2xl shadow-2xl w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 font-semibold rounded-l-full transition duration-300 ${
                isSignUp
                  ? "bg-[#D4AF37] text-[#1C1C1E]"
                  : "bg-[#3A3A3C] text-[#A6A6A6]"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`px-6 py-2 font-semibold rounded-r-full transition duration-300 ${
                !isSignUp
                  ? "bg-[#D4AF37] text-[#1C1C1E]"
                  : "bg-[#3A3A3C] text-[#A6A6A6]"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-[#1C1C1E] border border-[#3A3A3C] rounded-md placeholder-[#888] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#1C1C1E] border border-[#3A3A3C] rounded-md placeholder-[#888] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#1C1C1E] border border-[#3A3A3C] rounded-md placeholder-[#888] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#D4AF37] text-[#1C1C1E] font-semibold rounded-md hover:bg-[#e0c97d] transition duration-300"
            >
              {isSignUp ? "Create Account" : "Log In"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {!isSignUp && (
            <p className="mt-4 text-sm text-center text-[#A6A6A6]">
              Forgot your password?{" "}
              <a href="#" className="text-[#D4AF37] hover:underline">
                Reset here
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ConfirmationModal
          message={modalMessage}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Signup;
