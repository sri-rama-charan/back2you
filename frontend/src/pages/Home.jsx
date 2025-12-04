import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportCard from '../components/ReportCard';

export default function Home(){
  const [reports, setReports] = useState([]);
  useEffect(()=> {
    axios.get(import.meta.env.VITE_API_URL + '/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Recent reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(r => <ReportCard key={r._id} r={r} />)}
      </div>
    </div>
  );
}
