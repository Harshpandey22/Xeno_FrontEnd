import axios from 'axios';

interface CommunicationLogs {
  id: number;
  segmentName: string;
  message: string;
}

export const postCustomerMessages = async (data: CommunicationLogs): Promise<string[]> => {
  try {
    const response = await axios.post('http://localhost:8080/send_personalized_message', data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error sending personalized message:", error);
    throw error;
  }
};