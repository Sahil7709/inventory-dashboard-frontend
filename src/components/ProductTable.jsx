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
    <table className="w-full min-w-[600px] bg-white rounded-lg shadow-md text-sm sm:text-base">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-semibold text-gray-700">Name</th>
          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-semibold text-gray-700">Qty</th>
          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-semibold text-gray-700">Price</th>
          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-semibold text-gray-700 hidden sm:table-cell">Category</th>
          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod._id} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-3 sm:px-6 sm:py-4">{prod.name}</td>
            <td className="px-4 py-3 sm:px-6 sm:py-4">{prod.quantity}</td>
            <td className="px-4 py-3 sm:px-6 sm:py-4">{prod.price}</td>
            <td className="px-4 py-3 sm:px-6 sm:py-4 hidden sm:table-cell">{prod.category}</td>
            <td className="px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingProduct(prod); setShowForm(true); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md font-semibold transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md font-semibold transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;