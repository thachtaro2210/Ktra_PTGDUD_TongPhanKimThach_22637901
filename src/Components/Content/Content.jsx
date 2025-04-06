import React, { useEffect, useState } from "react";
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
import t1 from "../../assets/tx.png";
import t2 from "../../assets/ty.png";
import dola from "../../assets/dola.png";
import cart from "../../assets/cart.png";
import hu from "../../assets/human.png";
import pen from "../../assets/create.png";
import plus from "../../assets/plus.png"; // You'll need to add this icon

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
  
  // Add user modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    company: "",
    value: "",
    date: new Date().toLocaleDateString("en-US"),
    status: "New",
    avata: "1.png"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // You can adjust this value as needed

  // Get current items for display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages based on data length
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to go to a specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  console.log(paginate);
  
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // Show all page numbers if total pages are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(currentPage + 1, totalPages - 1);
      
      // Ensure we show at least 3 numbers in middle section
      if (start > end - 2) {
        start = end - 2;
      }
      if (end < start + 2) {
        end = start + 2;
      }
      
      // Adjust for boundaries
      start = Math.max(2, start);
      end = Math.min(totalPages - 1, end);
      
      // Add middle section
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed before last page
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

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

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
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

  const handleAddUser = (e) => {
    e.preventDefault();
    
    // POST request to add new user
    fetch("http://localhost:3001/content", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
      .then(response => response.json())
      .then(newUser => {
        // Add the new user to the data state
        setContentData([...data, newUser]);
        // Close the modal and reset the form
        setShowAddModal(false);
        setNewUserData({
          name: "",
          company: "",
          value: "",
          date: new Date().toLocaleDateString("en-US"),
          status: "New",
          avata: "1.png"
        });
        // Go to the last page to see the newly added user
        setCurrentPage(Math.ceil((data.length + 1) / itemsPerPage));
      })
      .catch(error => {
        console.error('Error adding new user:', error);
      });
  };

  const handleSelectAvatar = (avatar) => {
    setNewUserData({
      ...newUserData,
      avata: avatar
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
              <div className=" rounded-md shadow-sm">
                <span className="text-pink-500 text-xl"><img src={cart} alt="" /></span>
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
              <div className="rounded-md shadow-sm">
                <span className="text-blue-500 text-xl"><img src={dola} alt="" /></span>
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
              <div className=" rounded-md shadow-sm">
                <span className="text-blue-500 text-xl"><img src={hu} alt="" /></span>
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
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center bg-amber-50 text-white border border-pink-600 rounded px-4 py-1 text-sm hover:bg-pink-600 transition-colors items-center"
            >
              <span className="mr-1"><img src={plus} alt="" className="w-2 h-2 rounded-2xl" /></span> 
            </button>
            <button className="flex items-center bg-white border border-pink-200 rounded px-4 py-1 text-sm text-gray-600">
              <span className="mr-1"><img src={t1} alt="" /></span> Import
            </button>
            <button className="flex items-center bg-white border border-pink-200 rounded px-4 py-1 text-sm text-gray-600">
              <span className="mr-1"><img src={t2} alt="" /></span> Export
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
              {currentItems.map((order) => (
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
                    <td className="px-2 py-3 text-sm">
                      {editingId !== order.id ? (
                        <button 
                          className="text-gray-400 hover:text-gray-600" 
                          onClick={() => handleEdit(order)}
                        >
                          <img src={pen} alt="" className="w-2xs" />
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
          <span className="text-sm text-gray-500">{data.length} results</span>
          <div className="flex space-x-1">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ❮
            </button>
            
            {getPageNumbers().map((pageNum, index) => 
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400">
                  ...
                </span>
              ) : (
                <button 
                  key={pageNum}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentPage === pageNum ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}
            
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Semi-transparent overlay */}
    <div className="fixed inset-0 bg-opacity-50 pointer-events-auto"></div>
    
    {/* Modal positioned with z-index to appear above overlay */}
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden">
      <div className="px-6 py-4 bg-pink-50 border-b border-pink-100">
        <h3 className="text-lg font-semibold text-gray-800">Add New User</h3>
      </div>
      
      <form onSubmit={handleAddUser} className="px-6 py-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Avatar
          </label>
          <div className="flex space-x-2 mb-2">
            {Object.entries(iconMap).map(([key, src]) => (
              <div 
                key={key}
                onClick={() => handleSelectAvatar(key)}
                className={`h-12 w-12 rounded-full cursor-pointer border-2 ${
                  newUserData.avata === key ? 'border-pink-500' : 'border-transparent'
                }`}
              >
                <img 
                  src={src} 
                  alt={`Avatar ${key}`}
                  className="h-full w-full rounded-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name *
          </label>
          <input
            type="text"
            name="name"
            value={newUserData.name}
            onChange={handleNewUserChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company *
          </label>
          <input
            type="text"
            name="company"
            value={newUserData.company}
            onChange={handleNewUserChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Value *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
            <input
              type="text"
              name="value"
              value={newUserData.value}
              onChange={handleNewUserChange}
              className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Date
          </label>
          <input
            type="text"
            name="date"
            value={newUserData.date}
            onChange={handleNewUserChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={newUserData.status}
            onChange={handleNewUserChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
          >
            <option value="New">New</option>
            <option value="In-progress">In-progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-pink-500 border border-transparent rounded-md text-sm text-white hover:bg-pink-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}