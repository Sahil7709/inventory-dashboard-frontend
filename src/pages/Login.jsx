import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://inventory-dashboard-backend-4uwy.onrender.com/api/auth/login",
        // "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        "https://inventory-dashboard-backend-4uwy.onrender.com/api/auth/google-login",
        {
          idToken,
        }
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-md space-y-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
