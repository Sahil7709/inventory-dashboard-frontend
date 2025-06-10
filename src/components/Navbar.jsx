// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <span className="font-bold">Inventory Dashboard</span>
      <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
