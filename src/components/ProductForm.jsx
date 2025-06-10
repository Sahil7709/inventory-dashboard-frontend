import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, setShowForm, fetchProducts }) => {
  const [form, setForm] = useState({ name: '', quantity: '', price: '', category: '' });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (product) {
        await axios.put(`https://inventory-dashboard-backend-4uwy.onrender.com/api/products/${product._id}`, form, config);
      } else {
        await axios.post("https://inventory-dashboard-backend-4uwy.onrender.com/api/products", form, config);
      }
      fetchProducts();
      setShowForm(false);
    } catch (err) {
      alert("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 z-50">
      <form
        className="bg-white w-full max-w-lg p-8 sm:p-10 rounded-2xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        {["name", "quantity", "price", "category"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        ))}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {product ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;