import React from 'react';
import { Calendar, Clock, CheckCircle, Users, BookOpen, BarChart } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FacultyLeave</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => window.location.href = '/login'} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
              </button>
              <button onClick={() => window.location.href = '/register'} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Streamline Faculty Leave</span>
              <span className="block text-blue-600">Management System</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Efficiently manage faculty leave requests, track approvals, and maintain records with our comprehensive digital solution.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features for Modern Institutions
            </h2>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <Calendar className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Leave Calendar</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Interactive calendar view for managing and tracking leave requests with intuitive scheduling tools.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <Clock className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Real-time Processing</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Instant notifications and quick approval workflows for efficient leave management.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <CheckCircle className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Automated Approvals</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Streamlined approval process with customizable workflows and policy enforcement.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <Users className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Multi-role Support</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Comprehensive role management for faculty, HODs, and administrators.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <BarChart className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Analytics Dashboard</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Detailed insights and reports on leave patterns and department coverage.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <BookOpen className="h-12 w-12 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Policy Management</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Flexible leave policy configuration and automatic balance calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your leave management?
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              Join to our system.
            </p>
            <div className="mt-8">
              <button className="px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;