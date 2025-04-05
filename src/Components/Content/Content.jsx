import React, { useEffect, useState } from "react";
// import $ from 'jquery';
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Squares from "../../assets/Squares.png";
import detail from "../../assets/detail.png";

import U1 from "../../assets/User/1.png";
import U3 from "../../assets/User/3.png";
import U4 from "../../assets/User/4.png";
import U5 from "../../assets/User/5.png";
import U6 from "../../assets/User/6.png";
import U7 from "../../assets/User/7.png";

export default function Content() {
  const [data, setContentData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    value: "",
    date: "",
    status: ""
  });

  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then((res) => res.json())
      .then((data) => setContentData(data));
  }, []);

  // Overview data
  const overviewData = {
    turnover: 92405,
    turnoverChange: 5.39,
    profit: 32218,
    profitChange: 5.39,
    newCustomers: 298,
    newCustomersChange: 6.84,
  };
  
  const iconMap = {
    "1.png": U1,
    "3.png": U3,
    "4.png": U4,
    "5.png": U5,
    "6.png": U6,
    "7.png": U7,
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      company: item.company,
      value: item.value,
      date: item.date,
      status: item.status
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentItem = data.find(item => item.id === editingId);
    
    // PUT request to update the item
    fetch(`http://localhost:3001/content/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...currentItem,
        ...formData
      }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        // Update the data in the state
        setContentData(data.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        ));
        // Exit edit mode
        setEditingId(null);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans border border-gray-200 rounded-lg">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-pink-500 mr-2 text-lg">
            <img src={Squares} alt="" />
          </span>
          <h2 className="text-lg font-semibold">Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Turnover Card */}
          <div className="bg-pink-50 rounded-lg p-4 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">Turnover</p>
                <p className="text-3xl font-bold mb-1">
                  ${overviewData.turnover.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  <span>▲ {overviewData.turnoverChange}%</span>{" "}
                  <span className="text-gray-500">period of change</span>
                </p>
              </div>
              <div className="bg-white p-2 rounded-md shadow-sm">
                <span className="text-pink-500 text-xl">🛒</span>
              </div>
            </div>
          </div>

          {/* Profit Card */}
          <div className="bg-blue-50 rounded-lg p-4 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">Profit</p>
                <p className="text-3xl font-bold mb-1">
                  ${overviewData.profit.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  <span>▲ {overviewData.profitChange}%</span>{" "}
                  <span className="text-gray-500">period of change</span>
                </p>
              </div>
              <div className="bg-white p-2 rounded-md shadow-sm">
                <span className="text-blue-500 text-xl">$</span>
              </div>
            </div>
          </div>

          {/* New Customer Card */}
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 mb-1">New customer</p>
                <p className="text-3xl font-bold mb-1">
                  {overviewData.newCustomers}
                </p>
                <p className="text-sm text-green-600">
                  <span>▲ {overviewData.newCustomersChange}%</span>{" "}
                  <span className="text-gray-500">period of change</span>
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded-md shadow-sm">
                <span className="text-blue-500 text-xl">👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-pink-500 mr-2 text-lg">
              <img src={detail} alt="" />
            </span>
            <h2 className="text-lg font-semibold">Detailed report</h2>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center bg-white border border-pink-200 rounded px-4 py-1 text-sm text-gray-600">
              <span className="mr-1">⬇️</span> Import
            </button>
            <button className="flex items-center bg-white border border-pink-200 rounded px-4 py-1 text-sm text-gray-600">
              <span className="mr-1">⬆️</span> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className={`hover:bg-gray-50 ${editingId === order.id ? 'bg-gray-50' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img 
                          src={iconMap[order.avata] || iconMap["1.png"]} 
                          alt={order.name}
                          className="h-8 w-8 rounded-full bg-gray-200 mr-3" 
                        />
                        <span className="text-sm font-medium">{order.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {order.company}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      ${order.value}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "In-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {editingId !== order.id ? (
                        <button 
                          className="text-gray-400 hover:text-gray-600" 
                          onClick={() => handleEdit(order)}
                        >
                          ✏️
                        </button>
                      ) : (
                        <button 
                          className="text-gray-400 hover:text-gray-600" 
                          onClick={handleCancel}
                        >
                          ❌
                        </button>
                      )}
                    </td>
                  </tr>
                  
                  {editingId === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="px-4 py-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Customer Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Order Value
                            </label>
                            <input
                              type="text"
                              name="value"
                              value={formData.value}
                              onChange={handleChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Order Date
                            </label>
                            <input
                              type="text"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                              required
                            >
                              <option value="New">New</option>
                              <option value="In-progress">In-progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          
                          <div className="flex items-end space-x-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-pink-500 border border-transparent rounded-md text-sm text-white hover:bg-pink-600"
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">63 results</span>
          <div className="flex space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              ❮
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              4
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-400">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              10
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              11
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}