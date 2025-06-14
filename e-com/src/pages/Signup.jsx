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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-serif">
    <div className="bg-white border border-gray-300 text-[#2D2D2D] p-6 rounded-2xl max-w-sm w-full shadow-xl">
      <p className="mb-6 text-center text-lg">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md font-semibold hover:bg-emerald-600 transition"
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
        setModalMessage("Logged In Successfully!");
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
    <div className="flex flex-col min-h-screen justify-between bg-[#FAFAF9] text-[#2D2D2D] font-serif">
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 font-semibold rounded-l-full transition duration-300 ${
                isSignUp
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`px-6 py-2 font-semibold rounded-r-full transition duration-300 ${
                !isSignUp
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition duration-300"
            >
              {isSignUp ? "Create Account" : "Log In"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>

          {!isSignUp && (
            <p className="mt-4 text-sm text-center text-gray-500">
              Forgot your password?{" "}
              <a href="#" className="text-emerald-500 hover:underline">
                Reset here
              </a>
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          message={modalMessage}
          onConfirm={handleModalConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Signup;
