// // src/pages/AdminDashboard.jsx
// import React, { useState } from "react";
// import Addproducts from "../components/Addproducts";
// import ManageProducts from "./ManageProducts";

// const AdminDashboard = () => {
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   return (
//     <div className="container mx-auto my-10 p-4">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         🛠 Admin Dashboard
//       </h1>

//       {/* Add Product */}
//       <Addproducts onProductAdded={() => setRefreshFlag(!refreshFlag)} />

//       <hr className="my-10" />

//       {/* Manage Products */}
//       <ManageProducts refreshFlag={refreshFlag} />
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import Addproducts from "../components/Addproducts";
import ManageProducts from "./ManageProducts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add"); // default tab
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-10">🛠 Admin Dashboard</h1>

      {/* Dashboard Navbar / Tabs */}
      <div className="flex justify-center mb-8 space-x-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "add" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "manage" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          📦 Manage Products
        </button>
      </div>

      {/* Content */}
      {activeTab === "add" && (
        <Addproducts onProductAdded={() => setRefreshFlag(!refreshFlag)} />
      )}

      {activeTab === "manage" && <ManageProducts refreshFlag={refreshFlag} />}
    </div>
  );
};

export default AdminDashboard;
