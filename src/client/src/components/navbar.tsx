// src/client/src/components/NavBar.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./authForm";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { firstName, logout } = useAuth();

  return (
    <>
      <nav className="bg-white shadow-md border-b-32 border-[#9990DA]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-center space-y-1">
            <img
              src="/petPics/logo_test.png"
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="text-sm font-bold text-purple-800">
              Fluffer's House
            </span>
          </Link>

          <ul className="hidden md:flex flex-1 justify-center space-x-10 text-purple-900 font-semibold text-xl">
            <li>
              <Link to="/" className="hover:text-purple-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pets" className="hover:text-purple-500">
                Adopt
              </Link>
            </li>
            <li>
              <Link to="/petFood" className="hover:text-purple-500">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-purple-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-purple-500">
                Cart
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            {firstName ? (
              <button
                onClick={logout}
                className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-500"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-500"
              >
                Log In/Sign Up
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="md:hidden px-4 pb-4 space-y-2 text-purple-900 font-medium text-lg">
            <li>
              <Link to="/" className="block hover:text-purple-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pets" className="block hover:text-purple-500">
                Adopt
              </Link>
            </li>
            <li>
              <Link to="/petFood" className="block hover:text-purple-500">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/faq" className="block hover:text-purple-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block hover:text-purple-500">
                Cart
              </Link>
            </li>
            <li>
              {firstName ? (
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-500"
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full text-center mt-2 px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700"
                >
                  Log In
                </button>
              )}
            </li>
          </ul>
        )}
      </nav>

      {showLogin && <AuthForm onClose={() => setShowLogin(false)} />}
    </>
  );
}
