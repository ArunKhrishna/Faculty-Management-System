import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Check, X, Clock } from 'lucide-react';

const HrApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token",token);
      const response = await fetch('http://localhost:8080/leave-requests/fetch-requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch leave requests');
      }
      
      const data = await response.json();
      // Filter pending requests (not approved by HOD)
      const pendingRequests = data.filter(request => !request.hrApproved);
      setRequests(pendingRequests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApprove = async (leaveRequestId) => {
    try {
      setApprovalStatus(prev => ({ ...prev, [leaveRequestId]: 'loading' }));
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/leave-requests/hr/${leaveRequestId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to approve request');
      }

      setApprovalStatus(prev => ({ ...prev, [leaveRequestId]: 'success' }));
      
      // Remove the approved request from the list after a short delay
      setTimeout(() => {
        setRequests(prev => prev.filter(req => req.id !== leaveRequestId));
        setApprovalStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[leaveRequestId];
          return newStatus;
        });
      }, 1500);

    } catch (err) {
      setApprovalStatus(prev => ({ ...prev, [leaveRequestId]: 'error' }));
      // Clear error status after 3 seconds
      setTimeout(() => {
        setApprovalStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[leaveRequestId];
          return newStatus;
        });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-red-200">
          <div className="p-6">
            <div className="text-red-600">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Pending Leave Approvals</h2>
            <p className="mt-1 text-gray-500">Review and manage leave requests</p>
          </div>
          <div className="p-12 flex flex-col items-center justify-center">
            <Check className="h-16 w-16 text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-500 text-center max-w-sm">
              There are no pending leave requests that require your approval at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">HR - Pending Leave Approvals</h2>
          <p className="mt-1 text-gray-500">Review and manage leave requests</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.faculty.username}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.leaveType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.leaveReason}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {formatDate(request.startDate)} - {formatDate(request.endDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {approvalStatus[request.id] === 'loading' ? (
                        <div className="flex items-center justify-center">
                          <Clock className="h-5 w-5 text-blue-500 animate-spin" />
                        </div>
                      ) : approvalStatus[request.id] === 'success' ? (
                        <div className="flex items-center text-green-500">
                          <Check className="h-5 w-5" />
                          <span className="ml-2">Approved</span>
                        </div>
                      ) : approvalStatus[request.id] === 'error' ? (
                        <div className="flex items-center text-red-500">
                          <X className="h-5 w-5" />
                          <span className="ml-2">Failed</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Approve Request
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrApproval;