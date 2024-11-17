import axios from 'axios';

// API to Get Customer Count
export const getCustomerCount = async (): Promise<number> => {
  try {
    const response = await axios.get('http://localhost:8080/get_customer_count');
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching customer count:", error);
    throw error;
  }
};

// API to Get Order Count
export const getOrderCount = async (): Promise<number> => {
  try {
    const response = await axios.get('http://localhost:8080/get_order_count');
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching order count:", error);
    throw error;
  }
};

// API to Get Total Revenue
export const getTotalRevenue = async (): Promise<number> => {
  try {
    const response = await axios.get('http://localhost:8080/get_total_revenue');
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    throw error;
  }
};

export const getCommunicationLogs = async (): Promise<CommunicationLog[]> => {
    try {
      const response = await axios.get('http://localhost:8080/get_communication_logs');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      console.error("Error fetching communication logs:", error);
      throw error;
    }
  };
  
  // Define the structure of the CommunicationLog data as per your backend
  export interface CommunicationLog {
    id: number;
    segmentName: string;
    message: string;
  }

  export const getCustomerOrderRel = async (): Promise<Record<string, number>> => {
    try {
      const response = await axios.get('http://localhost:8080/get_customer_order_rel');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      console.error("Error fetching customer-order relationship data:", error);
      throw error;
    }
  };

  export const getOrderProductRel = async (): Promise<Record<string, number>> => {
    try {
      const response = await axios.get('http://localhost:8080/get_orders_product_rel');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Unexpected response status: ${response.status}`);
    } catch (error) {
      console.error("Error fetching order-product relationship data:", error);
      throw error;
    }
  };