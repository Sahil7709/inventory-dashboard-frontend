import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://inventory-dashboard-backend-4uwy.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("googleUser", JSON.stringify(result.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input type="email" name="email" placeholder="Email" required className="w-full mb-3 p-2 border rounded" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" name="password" placeholder="Password" required className="w-full mb-3 p-2 border rounded" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-600 text-white p-2 rounded mb-2">Login</button>
        <button type="button" onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded mb-3">Login with Google</button>
        <p className="text-sm">Don’t have an account? <Link to="/signup" className="text-blue-500">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
