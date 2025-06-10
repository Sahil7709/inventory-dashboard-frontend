import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://inventory-dashboard-backend-4uwy.onrender.com/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Inventory</h2>
          <button
            onClick={() => { setEditingProduct(null); setShowForm(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors duration-200 w-full sm:w-auto"
          >
            + Add Product
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <ProductTable
            products={products}
            setEditingProduct={setEditingProduct}
            setShowForm={setShowForm}
            fetchProducts={fetchProducts}
          />
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg p-8 sm:p-10 rounded-2xl shadow-md">
              <ProductForm
                product={editingProduct}
                setShowForm={setShowForm}
                fetchProducts={fetchProducts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;