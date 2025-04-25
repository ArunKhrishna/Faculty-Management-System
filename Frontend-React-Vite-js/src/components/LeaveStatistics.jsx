import React, { useEffect, useState } from 'react';
import { Calendar, Clock, BarChart2, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LeaveStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCalculateStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/leave-requests/my-requests', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
        }
        
        const data = await response.json();
        calculateStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCalculateStats();
  }, []);

  const calculateStats = (requests) => {
    // Initialize statistics object
    const statistics = {
      totalRequests: requests.length,
      totalDaysTaken: 0,
      approvedLeaves: 0,
      pendingLeaves: 0,
      leaveTypeBreakdown: {},
      monthlyBreakdown: {},
      approvalRate: 0,
      averageLeaveDuration: 0,
    };

    requests.forEach(request => {
      // Calculate days between start and end dates
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      // Update total days
      statistics.totalDaysTaken += daysDifference;

      // Count by leave type
      if (!statistics.leaveTypeBreakdown[request.leaveType]) {
        statistics.leaveTypeBreakdown[request.leaveType] = {
          count: 0,
          days: 0
        };
      }
      statistics.leaveTypeBreakdown[request.leaveType].count += 1;
      statistics.leaveTypeBreakdown[request.leaveType].days += daysDifference;

      // Count by approval status
      if (request.leaveApproved) {
        statistics.approvedLeaves += 1;
      } else if (!request.hodApproved && !request.hrApproved) {
        statistics.pendingLeaves += 1;
      }

      // Monthly breakdown
      const monthYear = startDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!statistics.monthlyBreakdown[monthYear]) {
        statistics.monthlyBreakdown[monthYear] = 0;
      }
      statistics.monthlyBreakdown[monthYear] += daysDifference;
    });

    // Calculate approval rate
    statistics.approvalRate = (statistics.approvedLeaves / statistics.totalRequests * 100).toFixed(1);

    // Calculate average leave duration
    statistics.averageLeaveDuration = (statistics.totalDaysTaken / statistics.totalRequests).toFixed(1);

    // Prepare chart data
    statistics.monthlyChartData = Object.entries(statistics.monthlyBreakdown).map(([month, days]) => ({
      month,
      days
    }));

    statistics.typeChartData = Object.entries(statistics.leaveTypeBreakdown).map(([type, data]) => ({
      type,
      days: data.days
    }));

    setStats(statistics);
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
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-red-200">
          <div className="p-6">
            <div className="text-red-600">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Leave Statistics Overview</h2>
            <p className="mt-1 text-gray-500">Comprehensive analysis of your leave requests</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-500" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">Total Days Taken</h3>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalDaysTaken}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BarChart2 className="h-6 w-6 text-green-500" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">Approval Rate</h3>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.approvalRate}%</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-500" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">Avg. Duration</h3>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.averageLeaveDuration} days</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-purple-500" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">Pending Requests</h3>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.pendingLeaves}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Leave Type Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.typeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Leave Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="days" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Requests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Days
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(stats.leaveTypeBreakdown).map(([type, data]) => (
                    <tr key={type}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.days}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatistics;