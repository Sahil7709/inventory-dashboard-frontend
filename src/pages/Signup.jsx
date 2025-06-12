import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post
      (
        "https://inventory-dashboard-backend-4uwy.onrender.com/api/auth/register", 
        // "http://localhost:5000/api/auth/register", 
        form);
      alert("Signup successful!");
      navigate("/");   
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white w-full max-w-lg p-8 sm:p-10 rounded-2xl shadow-md space-y-6"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-semibold transition-colors duration-200"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;