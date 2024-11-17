import axios from 'axios';

interface Customer {
  customerId: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  customer_visits: number;
}

export const updateCustomerData = async (id: number, customerData: Customer): Promise<string> => {
  try {
    const response = await axios.put(`http://localhost:8080/put_customer_data/${id}`, {
      customerId: customerData.customerId,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email_id: customerData.email_id,
      phone_number: customerData.phone_number,
      customer_visits: customerData.customer_visits,
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error updating customer data:", error);
    throw error;
  }
};
