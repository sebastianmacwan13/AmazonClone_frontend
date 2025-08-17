//17/08/2025
// import React, { useEffect, useState } from "react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const ManageProducts = ({ refreshFlag }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const token = currentUser?.token;

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/products`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           setProducts([]);
//         }
//       } else {
//         setProducts([]);
//         console.error("Fetch failed:", data.message);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await fetch(`${API_BASE_URL}/api/products/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editingProduct) return;
//     try {
//       await fetch(`${API_BASE_URL}/api/products/${editingProduct.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editingProduct),
//       });
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [refreshFlag]);

//   return (
//     <div className="my-8">
//       <h2 className="text-2xl font-bold text-center mb-6">Manage Products</h2>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-gray-500">No products found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm sm:text-base">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="p-2 border">Image</th>
//                 <th className="p-2 border">Title</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p.id} className="text-center hover:bg-gray-700">
//                   <td className="p-2 border">
//                     <img
//                       src={p.image}
//                       alt={p.title}
//                       className="w-12 h-12 sm:w-16 sm:h-16 object-cover mx-auto rounded"
//                     />
//                   </td>
//                   <td className="p-2 border truncate max-w-[150px]">{p.title}</td>
//                   <td className="p-2 border">₹{p.price}</td>
//                   <td className="p-2 border">{p.category || "N/A"}</td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       onClick={() => setEditingProduct(p)}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.id)}
//                       className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Editing Form */}
//       {editingProduct && (
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h3 className="text-xl font-bold mb-4">Edit Product</h3>
//           <input
//             type="text"
//             className="border p-2 w-full mb-2"
//             value={editingProduct.title}
//             onChange={(e) =>
//               setEditingProduct({ ...editingProduct, title: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="border p-2 w-full mb-2"
//             value={editingProduct.image}
//             onChange={(e) =>
//               setEditingProduct({ ...editingProduct, image: e.target.value })
//             }
//           />
//           <textarea
//             className="border p-2 w-full mb-2"
//             value={editingProduct.description}
//             onChange={(e) =>
//               setEditingProduct({
//                 ...editingProduct,
//                 description: e.target.value,
//               })
//             }
//           ></textarea>
//           <input
//             type="number"
//             className="border p-2 w-full mb-2"
//             value={editingProduct.price}
//             onChange={(e) =>
//               setEditingProduct({ ...editingProduct, price: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             className="border p-2 w-full mb-2"
//             value={editingProduct.category || ""}
//             onChange={(e) =>
//               setEditingProduct({ ...editingProduct, category: e.target.value })
//             }
//           />
//           <button
//             onClick={handleUpdate}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProducts;

import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageProducts = ({ refreshFlag }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser?.token;

  // Example categories for dropdown
  const categories = ["Electronics", "Clothing", "Books", "Furniture", "Toys", "Sports", "Other"];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } else {
        setProducts([]);
        console.error("Fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      await fetch(`${API_BASE_URL}/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProduct),
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshFlag]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Products</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="text-center hover:bg-gray-700">
                  <td className="p-2 border">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-2 border truncate max-w-[150px]">{p.title}</td>
                  <td className="p-2 border">₹{p.price}</td>
                  <td className="p-2 border">{p.category || "N/A"}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Drawer Sidebar for Editing */}
      {editingProduct && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setEditingProduct(null)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-900  dark:text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="p-6 relative h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4">Edit Product</h3>

              <div className="flex-1 overflow-y-auto">
                <input
                  type="text"
                  className="border p-2 w-full mb-2"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="border p-2 w-full mb-2"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 w-full mb-2"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <input
                  type="number"
                  className="border p-2 w-full mb-2"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                />

                {/* 🔽 Category Dropdown */}
                <select
                  className="border p-2 w-full mb-4 bg-gray-900"
                  value={editingProduct.category || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>

              {/* Close button (X) */}
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
