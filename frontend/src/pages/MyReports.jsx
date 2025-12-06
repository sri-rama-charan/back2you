import React, { useEffect, useState } from 'react';
import api from '../api';
import ReportCard from '../components/ReportCard';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReports();
  }, []);

  function fetchMyReports() {
    api.get('/api/reports/my-reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  async function handleDelete(e, id) {
    e.preventDefault(); // Stop the click from opening the Report Detail page
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await api.delete(`/api/reports/${id}`);
      // Remove the item from the UI immediately without reloading
      setReports(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Failed to delete report');
    }
  }

  if (loading) return <div className="text-center mt-10 p-4">Loading your reports...</div>;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Reports</h1>
      
      {reports.length === 0 ? (
        <div className="text-gray-600 bg-white p-6 rounded shadow text-center">
          <p className="mb-4">You haven't reported any items yet.</p>
          <a href="/create" className="text-indigo-600 font-medium hover:underline">Create your first report &rarr;</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reports.map(r => (
            <div key={r._id} className="relative group">
              {/* The Card Component */}
              <ReportCard r={r} />
              
              {/* Delete Button Overlay - Mobile Friendly Sizing */}
              <button 
                onClick={(e) => handleDelete(e, r._id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10"
                aria-label="Delete report"
              >
                {/* Trash Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              {/* Optional: Status Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold uppercase rounded shadow text-white ${r.type === 'lost' ? 'bg-red-500' : 'bg-green-500'}`}>
                {r.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}