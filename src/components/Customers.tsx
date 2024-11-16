import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: ['Order 1', 'Order 2'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: ['Order 3', 'Order 4'] },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState('all');
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });

  const navigate = useNavigate();

  // Handle view orders
  const handleViewOrders = (customer: any) => {
    setSelectedCustomer(customer);
    setShowOrdersModal(true);
  };

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (newCustomer.name.trim() && newCustomer.email.trim()) {
      const newId = Date.now(); // Unique ID
      const updatedCustomers = [
        ...customers,
        { id: newId, name: newCustomer.name, email: newCustomer.email, orders: [] },
      ];
      setCustomers(updatedCustomers);
      setNewCustomer({ name: '', email: '' });
      setShowAddModal(false);
    } else {
      alert('Please provide valid customer details.');
    }
  };

  // Handle customer filters
  const filteredCustomers = customers.filter((customer) => {
    if (filters === 'email') {
      return customer.email.includes('@example.com'); // Example: Filter by email domain
    } else if (filters === 'orders') {
      return customer.orders.length > 0; // Example: Filter customers with orders
    }
    return true; // Default: Show all customers
  });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <div className="flex gap-4">
          {/* New Button that appears based on filter selection */}
          {filters !== 'all' && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => alert('Button Clicked!')}
            >
              Custom Action for {filters}
            </button>
          )}
          {/* Filter Dropdown */}
          <select
            className="border border-gray-300 rounded p-2"
            value={filters}
            onChange={(e) => setFilters(e.target.value)}
          >
            <option value="all">All</option>
            <option value="email">Email</option>
            <option value="orders">Orders</option>
          </select>

         

          {/* Add New Customer */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowAddModal(true)}
          >
            Add New Customer
          </button>

          {/* Navigate to Customer Details */}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => navigate('/customer-details')}
          >
            Add New Segment
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="border border-gray-200 p-2">{customer.name}</td>
              <td className="border border-gray-200 p-2">{customer.email}</td>
              <td className="border border-gray-200 p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleViewOrders(customer)}
                >
                  View Orders
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => alert(`Edit ${customer.name}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Orders Modal */}
      {showOrdersModal && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">{selectedCustomer.name}'s Orders</h2>
            <ul>
              {selectedCustomer.orders.length > 0 ? (
                selectedCustomer.orders.map((order: string, index: number) => (
                  <li key={index}>{order}</li>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowOrdersModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Add New Customer</h2>
            <div className="flex gap-6">
              {/* Left Section - Customer Details */}
              <div className="w-1/2 space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Customer ID"
                  value={newCustomer.id}
                  onChange={(e) => setNewCustomer({ ...newCustomer, id: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="First Name"
                  value={newCustomer.firstName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Last Name"
                  value={newCustomer.lastName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Phone Number"
                  value={newCustomer.phoneNumber}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Visits"
                  value={newCustomer.visits}
                  onChange={(e) => setNewCustomer({ ...newCustomer, visits: parseInt(e.target.value) })}
                />
              </div>

              {/* Right Section - Order Details */}
              <div className="w-1/2 space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Order ID"
                  value={newCustomer.orderId}
                  onChange={(e) => setNewCustomer({ ...newCustomer, orderId: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Order Date"
                  value={newCustomer.orderDate}
                  onChange={(e) => setNewCustomer({ ...newCustomer, orderDate: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Order Price"
                  value={newCustomer.orderPrice}
                  onChange={(e) => setNewCustomer({ ...newCustomer, orderPrice: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddCustomer}
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
