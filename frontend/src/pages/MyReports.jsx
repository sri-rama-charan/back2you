// frontend/src/pages/MyReports.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import ReportCard from '../components/ReportCard';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/reports/my-reports')
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Reports</h1>
      
      {reports.length === 0 ? (
        <div className="text-gray-600">You haven't reported any items yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reports.map(r => <ReportCard key={r._id} r={r} />)}
        </div>
      )}
    </div>
  );
}