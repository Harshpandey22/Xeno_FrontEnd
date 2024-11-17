import axios from 'axios';

interface CustomerSegmentParams {
  totalSpent?: number;
  numVisits?: number;
  lastVisited?: number;
  productName?: string;
  totalSpentLogic?: string;
  numVisitsLogic?: string;
  lastVisitedLogic?: string;
  productNameLogic?: string;
  segmentName?: string;
}

export const getCustomerSegment = async (params: CustomerSegmentParams) => {
  try {
    const response = await axios.get('http://localhost:8080/customer_segment', {
      params: {
        totalSpent: params.totalSpent,
        numVisits: params.numVisits,
        lastVisited: params.lastVisited,
        productName: params.productName,
        totalSpentLogic: params.totalSpentLogic || 'AND',
        numVisitsLogic: params.numVisitsLogic || 'AND',
        lastVisitedLogic: params.lastVisitedLogic || 'AND',
        productNameLogic: params.productNameLogic || 'AND',
        segmentName: params.segmentName || 'Segment1',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error("Error fetching customer segment data:", error);
    throw error;
  }
};
