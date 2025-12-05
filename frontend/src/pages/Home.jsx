import React, { useEffect, useState } from 'react';
import api from '../api'; // Use 'api' instead of 'axios' to get the correct BaseURL
import ReportCard from '../components/ReportCard';

export default function Home(){
  const [reports, setReports] = useState([]);
  
  // Fixed typo: pfTyp -> setFilterType
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Using 'api' ensures the request goes to http://localhost:5000/api/reports...
    api.get(`/api/reports?q=${search}&type=${filterType}`)
      .then(res => {
        // Safety check: ensure response is actually an array before setting state
        if (Array.isArray(res.data)) {
          setReports(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setReports([]);
        }
      })
      .catch(err => console.error("Failed to fetch reports:", err));
  }, [search, filterType]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Recent reports</h1>
        
        {/* ADDED: Search and Filter Inputs */}
        <div className="flex gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search items..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-64"
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.map(r => <ReportCard key={r._id} r={r} />)}
      </div>
    </div>
  );
}