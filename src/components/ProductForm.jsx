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
        await axios.put(`http://localhost:5000/api/products/${product._id}`, form, config);
      } else {
        await axios.post("http://localhost:5000/api/products", form, config);
      }
      fetchProducts();
      setShowForm(false);
    } catch (err) {
      alert("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form className="bg-white p-4 rounded w-96" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-3">{product ? "Edit Product" : "Add Product"}</h2>
        {["name", "quantity", "price", "category"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
        ))}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">{product ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
