import React, { useState } from 'react';
import { storeOrderData } from './service/postOrderData';

interface AddOrderModalProps {
  customerId: number;
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({
  customerId,
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    orderDate: '',
    orderPrice: '',
    productName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await storeOrderData({
        orderId: Date.now().toString(), // Generate unique ID
        orderDate: formData.orderDate,
        orderPrice: formData.orderPrice,
        productName: formData.productName,
        custId: customerId
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Failed to add order");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Order</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Date</label>
            <input
              type="date"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              value={formData.orderDate}
              onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Price</label>
            <input
              type="number"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              value={formData.orderPrice}
              onChange={(e) => setFormData({ ...formData, orderPrice: e.target.value })}
              required
            />
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};