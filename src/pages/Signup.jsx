// pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4 font-bold">Signup</h2>
        <input type="text" name="name" placeholder="Full Name" required className="w-full mb-3 p-2 border rounded" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" name="email" placeholder="Email" required className="w-full mb-3 p-2 border rounded" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" name="password" placeholder="Password" required className="w-full mb-3 p-2 border rounded" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Signup</button>
        <p className="text-sm mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
