import axios from 'axios';

export const getSegments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/get_segments');
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 204) {
      return [];
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching segments data:", error);
    throw error;
  }
};


