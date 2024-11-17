import React, { useState, useEffect } from 'react';
import { getCommunicationLogs, CommunicationLog } from './service/getAnalyticsData';
import { Card, CardContent, CardHeader, CardTitle} from './ui/card';
import ReactPaginate from 'react-paginate';

const CampaignHistory: React.FC = () => {
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust number of items per page

  useEffect(() => {
    const fetchCampaignHistory = async () => {
      try {
        const logs = await getCommunicationLogs();
        if (logs && Array.isArray(logs)) {
          // Remove sorting by timestamp as it's no longer required
          setCommunicationLogs(logs.reverse());
        } else {
          setCommunicationLogs([]);
        }
      } catch (error) {
        console.error('Error fetching campaign history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignHistory();
  }, []);

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(communicationLogs.length / itemsPerPage);
  const currentData = communicationLogs.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading outside the card */}
      <h5 className="text-2xl font-bold text-gray-800 mb-6">Past Campaigns</h5>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Latest campaign activities and messages</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] w-full bg-muted rounded-lg animate-pulse" />
          ) : communicationLogs && communicationLogs.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border-separate border-spacing-0 shadow-md rounded-lg">
                  <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-sm font-bold text-gray-800">Segment</th>
                      <th className="px-4 py-3 text-sm font-bold text-gray-800">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-800">{log.segmentName}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{log.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName={"flex gap-2 items-center"}
                  pageClassName={"px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"}
                  activeClassName={"bg-primary text-white"}
                  previousClassName={"px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"}
                  nextClassName={"px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">No recent activities</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignHistory;
