import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerData } from './service/getCustomerData';
import { getOrderData } from './service/getOrdersData';
import { getSegments } from './service/getSegments';
import { getSegmentCustomers } from './service/getSegmentCustomers';
import { postCustomerMessages } from './service/postCustomerMessage';

interface Customer {
  customerId: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  customer_visits: number;
  delivery_receipt: string | null;
}

interface Order {
  orderId: string;
  orderDate: string;
  orderPrice: number;
  productName: string;
  custId: number;
}

interface Segment {
  id: number;
  segmentName: string;
  totalSpent: number;
  numVisits: number;
  lastVisited: number;
  productName: string;
  totalSpentLogic: string;
  numVisitsLogic: string;
  lastVisitedLogic: string;
  productNameLogic: string;
  customerIds: string;
  createdAt: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageResponses, setMessageResponses] = useState<string[]>([]);
  const [filters, setFilters] = useState('all');
  const [segments, setSegments] = useState<Segment[]>([]);
  const [displayCustomers, setDisplayCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    first_name: '',
    last_name: '',
    email_id: '',
    phone_number: '',
    customer_visits: 0,
    delivery_receipt: null
  });

  const navigate = useNavigate();

  const fetchCustomerData = async () => {
    try {
      const customerData = await getCustomerData();
      setCustomers(customerData);
      setDisplayCustomers(customerData);
    } catch (error) {
      console.error("Error loading customer data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCustomerData();
        const segmentData = await getSegments();
        setSegments(segmentData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = async (value: string) => {
    setFilters(value);
    
    if (value === 'all') {
      setDisplayCustomers(customers);
    } else if (value === 'email') {
      const filtered = customers.filter(customer => customer.email_id.includes('@gmail.com'));
      setDisplayCustomers(filtered);
    } else if (value === 'orders') {
      const filtered = customers.filter(customer => customer.delivery_receipt !== null);
      setDisplayCustomers(filtered);
    } else {
      try {
        const segmentCustomers = await getSegmentCustomers(value);
        setDisplayCustomers(segmentCustomers);
      } catch (error) {
        console.error("Error loading segment customers:", error);
        alert("Failed to load segment customers");
      }
    }
  };

  const handleViewOrders = async (customer: Customer) => {
    try {
      const orders = await getOrderData(customer.customerId);
      setCustomerOrders(orders);
      setSelectedCustomer(customer);
      setShowOrdersModal(true);
    } catch (error) {
      console.error("Error loading order data:", error);
      alert("Failed to load order data");
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.first_name?.trim() && newCustomer.email_id?.trim()) {
      const newId = customers.length > 0 ? Math.max(...customers.map(c => c.customerId)) + 1 : 1;
      const customerToAdd: Customer = {
        customerId: newId,
        first_name: newCustomer.first_name || '',
        last_name: newCustomer.last_name || '',
        email_id: newCustomer.email_id || '',
        phone_number: newCustomer.phone_number || '',
        customer_visits: newCustomer.customer_visits || 0,
        delivery_receipt: newCustomer.delivery_receipt
      };
      
      const updatedCustomers = [...customers, customerToAdd];
      setCustomers(updatedCustomers);
      setDisplayCustomers(updatedCustomers);
      setNewCustomer({
        first_name: '',
        last_name: '',
        email_id: '',
        phone_number: '',
        customer_visits: 0,
        delivery_receipt: null
      });
      setShowAddModal(false);
    } else {
      alert('Please provide valid customer details.');
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      const response = await postCustomerMessages({
        id: segments.find(s => s.segmentName === filters)?.id || 0,
        segmentName: filters,
        message: messageText
      });

      setMessageResponses(response);
      setShowMessageModal(false);
      setMessageText('');
      
      // Refresh customer data to update delivery receipts
      await fetchCustomerData();
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages");
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <div className="flex gap-4">
          {filters !== 'all' && (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => setShowMessageModal(true)}
            >
              Send Message
            </button>
          )}
          <select
            className="border border-gray-300 rounded p-2"
            value={filters}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            {segments.map((segment) => (
              <option key={segment.id} value={segment.segmentName}>
                {segment.segmentName}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowAddModal(true)}
          >
            Add New Customer
          </button>
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
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">First Name</th>
            <th className="border border-gray-200 p-2">Last Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Phone</th>
            <th className="border border-gray-200 p-2">Visits</th>
            <th className="border border-gray-200 p-2">Delivery Receipt</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayCustomers.map((customer) => (
            <tr key={customer.customerId}>
              <td className="border border-gray-200 p-2">{customer.customerId}</td>
              <td className="border border-gray-200 p-2">{customer.first_name}</td>
              <td className="border border-gray-200 p-2">{customer.last_name}</td>
              <td className="border border-gray-200 p-2">{customer.email_id}</td>
              <td className="border border-gray-200 p-2">{customer.phone_number}</td>
              <td className="border border-gray-200 p-2">{customer.customer_visits}</td>
              <td className="border border-gray-200 p-2">{customer.delivery_receipt===null?'No message sent':customer.delivery_receipt}</td>
              <td className="border border-gray-200 p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleViewOrders(customer)}
                >
                  View Orders
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => alert(`Edit ${customer.first_name}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Message Responses Section */}
      {messageResponses.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Message Delivery Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messageResponses.map((response, index) => (
              <div key={index} className="p-4 bg-white rounded shadow-sm border border-gray-200">
                <p className="text-gray-800">{response}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrdersModal && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {selectedCustomer.first_name}'s Orders
              </h2>
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setShowOrdersModal(false);
                  setCustomerOrders([]);
                }}
              >
                ✕
              </button>
            </div>
            
            {customerOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-2">Order ID</th>
                      <th className="border border-gray-200 p-2">Date</th>
                      <th className="border border-gray-200 p-2">Product</th>
                      <th className="border border-gray-200 p-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td className="border border-gray-200 p-2">{order.orderId}</td>
                        <td className="border border-gray-200 p-2">{order.orderDate}</td>
                        <td className="border border-gray-200 p-2">{order.productName}</td>
                        <td className="border border-gray-200 p-2">₹{order.orderPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="border border-gray-200 p-2 font-bold text-right">
                        Total
                      </td>
                      <td className="border border-gray-200 p-2 font-bold">
                        ₹{customerOrders.reduce((sum, order) => sum + order.orderPrice, 0).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-center py-4">No orders found for this customer.</p>
            )}
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

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Send Message to {filters} Segment</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
              >
                ✕
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded resize-none h-32"
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={handleSendMessage}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;