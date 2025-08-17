//17/08/2025 morning
// import React, { useState } from 'react';

// const Addproducts = ({ onProductAdded }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     image: '',
//     description: '',
//     price: '',
//     category: ''
//   });
//   const [status, setStatus] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('Adding product...');

//     try {
//       // 🔑 Get token from localStorage
//       const token = localStorage.getItem("token");
//       const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//       // const token = currentUser?.token;

//       if (!token) {
//         setStatus("❌ No token found. Please login as admin.");
//         return;
//       }
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await fetch(`${API_BASE_URL}/api/products`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // ✅ send token
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to add product.");
//       }

//       setStatus("✅ Product added successfully!");
//       setFormData({
//         title: '',
//         image: '',
//         description: '',
//         price: '',
//         category: ''
//       });

//       // refresh parent list
//       if (onProductAdded) onProductAdded();

//     } catch (err) {
//       console.error("Error adding product:", err);
//       setStatus(`Error: ${err.message}`);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto my-8">
//       <h2 className="text-2xl font-bold text-center mb-6">Add a New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//           ></textarea>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             min="0"
//             step="0.01"
//             className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
//         >
//           Add Product
//         </button>
//       </form>
//       {status && (
//         <p className={`mt-4 text-center ${status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
//           {status}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Addproducts;

import React, { useState } from 'react';

const Addproducts = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    price: '',
    category: ''
  });
  const [status, setStatus] = useState('');

  // ✅ Shared categories for dropdown
  const categories = ["Electronics", "Clothing", "Books", "Furniture", "Toys", "Sports", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Adding product...');

    try {
      // 🔑 Get token from localStorage
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!token) {
        setStatus("❌ No token found. Please login as admin.");
        return;
      }
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ send token
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product.");
      }

      setStatus("✅ Product added successfully!");
      setFormData({
        title: '',
        image: '',
        description: '',
        price: '',
        category: ''
      });

      // refresh parent list
      if (onProductAdded) onProductAdded();

    } catch (err) {
      console.error("Error adding product:", err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto my-8">
      <h2 className="text-2xl  text-black font-bold text-center mb-6">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 🔽 Category Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
