import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDetails: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    segmentName: '',
    totalOrderPrice: '',
    totalOrderPriceRequired: 'mandatory',
    noOfVisits: '',
    noOfVisitsRequired: 'mandatory',
    lastVisited: '',
    lastVisitedRequired: 'mandatory',
    productName: '',
    productNameRequired: 'mandatory',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Form submitted successfully');
    // Process the formData as needed
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Customer Details</h1>
      <div className="space-y-4">
        {/* Segment Name */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            name="segmentName"
            placeholder="Segment Name"
            value={formData.segmentName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="totalOrderPrice"
            placeholder="Total Order Price"
            value={formData.totalOrderPrice}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="totalOrderPriceRequired"
            value={formData.totalOrderPriceRequired}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="mandatory">Mandatory</option>
            <option value="non-mandatory">Non-Mandatory</option>
          </select>
        </div>

        {/* Number of Visits */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            name="noOfVisits"
            placeholder="No of Visits"
            value={formData.noOfVisits}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="noOfVisitsRequired"
            value={formData.noOfVisitsRequired}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="mandatory">Mandatory</option>
            <option value="non-mandatory">Non-Mandatory</option>
          </select>
        </div>

        {/* Last Visited */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            name="lastVisited"
            placeholder="last Visited "
            value={formData.lastVisited}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="lastVisitedRequired"
            value={formData.lastVisitedRequired}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="mandatory">Mandatory</option>
            <option value="non-mandatory">Non-Mandatory</option>
          </select>
        </div>

        {/* Product Name */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="productNameRequired"
            value={formData.productNameRequired}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="mandatory">Mandatory</option>
            <option value="non-mandatory">Non-Mandatory</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
