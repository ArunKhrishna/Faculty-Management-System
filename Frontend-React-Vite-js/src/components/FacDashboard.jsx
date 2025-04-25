import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveStatistics from './LeaveStatistics';
const FacDashboard = () => {
  const [username] = useState(() => localStorage.getItem('username') || 'Faculty Member');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const navigateToFeature = (path) => {
    navigate(path);
  };

  const cards = [
    {
      title: 'Request Leave',
      description: 'Submit a new leave request for approval',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      path: '/request-leave'
    },
    {
      title: 'View My Requests',
      description: 'Check the status of your pending requests',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      path: '/my-requests'
    },
    {
      title: 'View History',
      description: 'Access your complete leave history',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      path: '/leave-history'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">Welcome, {username}</h2>
                <p className="text-sm text-gray-500">Faculty Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigateToFeature(card.path)}
              className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    {card.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        {/* <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-500">Available Leave Days</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <p className="text-sm text-gray-500">Approved This Month</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div> */}
        <LeaveStatistics/>
      </main>
    </div>
  );
};

export default FacDashboard;