import axios from 'axios';

// API to delete orders by customer ID
export const deleteOrdersByCustId = async (custId: number): Promise<string> => {
  try {
    const response = await axios.delete(`http://localhost:8080/delete_order_custId?custId=${custId}`);
    if (response.status === 200) {
      return response.data; // Return success message
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error deleting orders by customer ID:", error);
    throw error;
  }
};

export const deleteCustomerById = async (id: number): Promise<string> => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete_single_customer/${id}`);
      if (response.status === 200) {
        return response.data; // Return success message
      }
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      console.error("Error deleting customer by ID:", error);
      throw error;
    }
  };