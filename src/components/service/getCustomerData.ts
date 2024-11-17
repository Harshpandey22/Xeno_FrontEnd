import axios from 'axios';

export const getCustomerData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/get_customer');
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 204) {
      return [];
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};


