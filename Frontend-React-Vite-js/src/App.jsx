import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import Login from './components/LoginPage'
import Register from './components/Register'
import FacDashboard from './components/FacDashboard'
import RequestLeave from './components/RequestLeave'
import MyLeaveRequests from './components/MyLeaveRequests'
import ApprovedLeaveRequests from './components/ApprovedLeaveRequests'

import HodDashboard from './components/HodDashboard'
import HodApprovalDashboard from './components/HodApprovalDashboard'
import HrDashboard from './components/HrDashboard'
import HrApproval from './components/HrApproval'
function App() {

  return (
    <Router>
      <Routes>
        {/* Define Routes for your components */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/facultyDashboard" element={<FacDashboard />} />
        <Route path="/request-leave" element={<RequestLeave />} />
        <Route path="/my-requests" element={<MyLeaveRequests />} />
        <Route path="/leave-history" element={<ApprovedLeaveRequests />} />
        <Route path="/hodDashboard" element={<HodDashboard />} />
        <Route path="/approve-requests-hod" element={<HodApprovalDashboard />} />
        <Route path="/hrDashboard" element={<HrDashboard />} />
        <Route path="/approve-requests-hr" element={<HrApproval />} />
      </Routes>
    </Router>
  )
}

export default App
