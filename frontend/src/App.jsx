import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateReport from './pages/CreateReport';
import ReportDetail from './pages/ReportDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyReports from './pages/MyReports'; 

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
