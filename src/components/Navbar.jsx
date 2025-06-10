import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <span className="text-lg sm:text-3xl font-bold text-gray-800">Inventory Dashboard</span>
        <div className="flex items-center">
          {/* Hamburger Button for Mobile */}
          <button
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          {/* Logout Button for Desktop */}
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-600 hover:bg-red-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 flex flex-col items-end">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;