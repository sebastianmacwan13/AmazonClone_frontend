import React, { useState } from 'react';

// New component for adding a product, now in its own file.
const Addproducts = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    price: '',
    category: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Adding product...');

    try {
      // NOTE: For a real application, you'd need a way to authenticate the admin user.
      // The backend you provided uses a `verifyAdmin` middleware, which would require
      // an authentication token in the headers. For this example, we'll assume
      // the middleware is disabled or a test token is used for demonstration.
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${adminAuthToken}` // Example for a real app
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add product.');
      }

      setStatus('Product added successfully!');
      setFormData({
        title: '',
        image: '',
        description: '',
        price: '',
        category: ''
      });
      // Call the parent function to refresh the product list
      onProductAdded();

    } catch (e) {
      console.error("Error adding product:", e);
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
        >
          Add Product
        </button>
      </form>
      {status && (
        <p className={`mt-4 text-center ${status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default Addproducts;
