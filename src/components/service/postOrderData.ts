import axios from 'axios';

interface Order {
  orderId: string;
  orderDate: string;
  orderPrice: string;
  productName: string;
  custId: number;
}

export const storeOrderData = async (orderData: Order): Promise<string> => {
  try {
    const response = await axios.post('http://localhost:8080/store_order', {
      orderId: orderData.orderId,
      orderDate: orderData.orderDate,
      orderPrice: orderData.orderPrice,
      productName: orderData.productName,
      custId: orderData.custId,
    });

    if (response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error storing order data:", error);
    throw error;
  }
};
