import React from 'react';
import axios from 'axios';

const ProductTable = ({ products, setEditingProduct, setShowForm, fetchProducts }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`https://inventory-dashboard-backend-4uwy.onrender.com/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  return (
    <table className="w-full border shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Qty</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod._id}>
            <td className="p-2 border">{prod.name}</td>
            <td className="p-2 border">{prod.quantity}</td>
            <td className="p-2 border">{prod.price}</td>
            <td className="p-2 border">{prod.category}</td>
            <td className="p-2 border">
              <button onClick={() => { setEditingProduct(prod); setShowForm(true); }} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => handleDelete(prod._id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
