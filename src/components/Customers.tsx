import React, { useState } from 'react';
import { Button } from './ui/button';
import { Modal, ModalContent, ModalHeader, ModalFooter } from './ui/modal';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: ['Order 1', 'Order 2'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: ['Order 3', 'Order 4'] },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState('all');
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });

  // Handlers
  const handleViewOrders = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      setCustomers([...customers, { id: Date.now(), ...newCustomer, orders: [] }]);
      setNewCustomer({ name: '', email: '' });
      setIsAdding(false);
    }
  };

  // Filter logic
  const filteredCustomers = customers.filter((customer) => {
    if (filters === 'email') {
      return customer.email.includes('@example.com'); // Example: filter by email domain
    } else if (filters === 'orders') {
      return customer.orders.length > 0; // Example: filter by customers with orders
    }
    return true; // Show all customers
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <div className="flex gap-4">
          {/* Filter Section */}
          <Select onValueChange={setFilters}>
            <SelectTrigger className="w-40">Filter by</SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAdding(true)}>Add New Customer</Button>
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
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleViewOrders(customer)}
                >
                  View Orders
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => alert(`Edit ${customer.name}`)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Orders Modal */}
      {showModal && selectedCustomer && (
        <Modal>
          <ModalContent>
            <ModalHeader>{selectedCustomer.name}'s Orders</ModalHeader>
            <ul>
              {selectedCustomer.orders.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>
            <ModalFooter>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Add New Customer Modal */}
      {isAdding && (
        <Modal>
          <ModalContent>
            <ModalHeader>Add New Customer</ModalHeader>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
            <ModalFooter>
              <Button onClick={handleAddCustomer}>Add</Button>
              <Button onClick={() => setIsAdding(false)} className="ml-2">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Customers;
