import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const RequestLeave = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    leaveReason: '',
    startDate: '',
    endDate: ''
  });

  const leaveTypes = [
    'Sick Leave',
    'Casual Leave',
    'Vacation Leave',
    'Personal Leave'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const getFacultyIdFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return null;
      }
      const decoded = jwtDecode(token); // Instead of jwt_decode(token)
      return decoded.id; // Assuming the token contains the faculty ID in the 'id' field
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Basic validation
    if (!formData.leaveReason.trim()) {
      setError('Please provide a reason for your leave');
      setLoading(false);
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setError('Please select both start and end dates');
      setLoading(false);
      return;
    }

    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();

    if (start < today) {
      setError('Start date cannot be in the past');
      setLoading(false);
      return;
    }

    if (end < start) {
      setError('End date must be after start date');
      setLoading(false);
      return;
    }

    const facultyId = getFacultyIdFromToken();
    if (!facultyId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/leave-requests/faculty/${facultyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          leaveType: 'Sick Leave',
          leaveReason: '',
          startDate: '',
          endDate: ''
        });
        setTimeout(() => navigate('/my-requests'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit leave request');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 rounded-lg p-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Request Leave</h2>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              Leave request submitted successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="leaveReason" className="block text-sm font-medium text-gray-700">
                Reason for Leave
              </label>
              <textarea
                id="leaveReason"
                name="leaveReason"
                rows="4"
                value={formData.leaveReason}
                onChange={handleChange}
                placeholder="Please provide details about your leave request"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;