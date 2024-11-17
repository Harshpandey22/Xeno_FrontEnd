import axios from 'axios';

interface Customer {
  customer_id?: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  customer_visits: number;
}

export const storeCustomerData = async (customerData: Customer): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:8080/store_customer', customerData);

    if (response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error storing customer data:", error);
    throw error;
  }
};
