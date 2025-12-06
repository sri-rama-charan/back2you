// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // State to toggle the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  }

  // Helper to close menu when a link is clicked (for mobile UX)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* 1. LOGO */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="flex-shrink-0 flex items-center gap-2">
              {/* Optional: Add an icon here if you have one */}
              <span className="text-xl font-bold text-indigo-600">Back2You</span>
            </Link>
          </div>

          {/* 2. DESKTOP MENU (Hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/create" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Create Report</Link>
            
            {!token ? (
              <>
                <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">Register</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/my-reports" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">My Reports</Link>
                <span className="text-gray-500 text-sm">|</span>
                <span className="text-sm text-gray-900 font-semibold">{user?.name}</span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 text-sm font-medium">Logout</button>
              </div>
            )}
          </div>

          {/* 3. MOBILE MENU BUTTON (Hamburger) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on open/closed state */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN (Conditional Rendering) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</Link>
            <Link to="/create" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Create Report</Link>
            
            {!token ? (
              <>
                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Login</Link>
                <Link to="/register" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Register</Link>
              </>
            ) : (
              <>
                <Link to="/my-reports" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">My Reports</Link>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-3 py-2 text-sm text-gray-500">Signed in as <span className="font-bold text-gray-900">{user?.name}</span></div>
                <button 
                  onClick={() => { handleLogout(); closeMenu(); }} 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}