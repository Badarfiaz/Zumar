import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <div className="text-white text-center mt-10">Loading...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#1C1C1E] text-[#E5E5E5] font-serif">
        <style>
          {`
            @keyframes shackleOpen {
              0% { transform: rotate(0deg); }
              50% { transform: rotate(-50deg); }
              100% { transform: rotate(0deg); }
            }

            @keyframes shackleClose {
              0% { transform: translateY(-20px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }

            .shackle {
              transform-origin: center bottom;
              animation: shackleOpen 1.5s ease-in-out infinite, shackleClose 1.5s ease-in-out infinite;
              animation-fill-mode: forwards;
            }

            .lock-body {
              fill: #D4AF37;
              filter: drop-shadow(0 0 6px #d4af37);
            }

            .lock-svg-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100px;
              width: 80px;
              margin: 0 auto 1.5rem;
            }
          `}
        </style>

        <div className="bg-[#2A2A2C] border border-[#3A3A3C] rounded-2xl p-10 text-center shadow-lg max-w-sm w-full">
          <div className="lock-svg-container" aria-label="Lock icon" role="img">
            <svg
              width="80"
              height="100"
              viewBox="0 0 64 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="shackle"
                d="M20 30 Q20 10 32 10 Q44 10 44 30"
                stroke="#D4AF37"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                className="lock-body"
                x="12"
                y="30"
                width="40"
                height="50"
                rx="8"
                ry="8"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">
            Access Denied
          </h2>
          <p className="text-[#A6A6A6] text-sm mb-6">
            Please log in to access this page.
          </p>
          <button
            onClick={() => navigate("/Sign")}
            className="mt-2 px-6 py-2 rounded-md bg-[#D4AF37] text-[#1C1C1E] font-semibold hover:bg-[#e0c97d] transition duration-300"
          >
            Go to Signup
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
