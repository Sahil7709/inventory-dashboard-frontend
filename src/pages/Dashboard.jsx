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
    const res = await axios.get("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Product</button>
        </div>
        <ProductTable products={products} setEditingProduct={setEditingProduct} setShowForm={setShowForm} fetchProducts={fetchProducts} />
        {showForm && <ProductForm product={editingProduct} setShowForm={setShowForm} fetchProducts={fetchProducts} />}
      </div>
    </div>
  );
};

export default Dashboard;
