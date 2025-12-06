import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Package, Users, BarChart } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#232f3e] text-white p-4 hidden md:block">
            <h1 className="text-2xl font-bold mb-8">JIOM Admin</h1>
            <ul className="space-y-2">
                <li className="p-2 bg-gray-700 rounded cursor-pointer flex items-center gap-2"><BarChart className="w-4 h-4"/> Dashboard</li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2"><Package className="w-4 h-4"/> Products</li>
                <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2"><Users className="w-4 h-4"/> Users</li>
            </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-500">
                    <div className="text-gray-500 mb-1">Total Sales</div>
                    <div className="text-2xl font-bold">₹1,24,500</div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-green-500">
                    <div className="text-gray-500 mb-1">Active Orders</div>
                    <div className="text-2xl font-bold">45</div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-l-4 border-orange-500">
                    <div className="text-gray-500 mb-1">Products</div>
                    <div className="text-2xl font-bold">{MOCK_PRODUCTS.length}</div>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold">Product Inventory</h3>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add New Product</button>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PRODUCTS.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-2">
                                    <img src={p.image} className="w-8 h-8 object-contain" alt="" />
                                    <span className="line-clamp-1">{p.title}</span>
                                </td>
                                <td className="p-4">{p.category}</td>
                                <td className="p-4">₹{p.price}</td>
                                <td className="p-4 text-green-600 font-medium">In Stock</td>
                                <td className="p-4">
                                    <button className="text-blue-600 hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Admin;
