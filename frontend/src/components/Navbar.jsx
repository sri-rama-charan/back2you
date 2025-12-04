// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Back2You</Link>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/create" className="text-sm hover:underline">Create Report</Link>

          {!token ? (
            <>
              <Link to="/login" className="text-sm px-3 py-1 rounded bg-indigo-600 text-white">Login</Link>
              <Link to="/register" className="text-sm px-3 py-1 rounded border">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-700">Hi, {user?.name || 'User'}</div>
              <button onClick={handleLogout} className="text-sm px-3 py-1 rounded bg-gray-200">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
