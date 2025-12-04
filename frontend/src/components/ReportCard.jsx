import React from 'react';
import { Link } from 'react-router-dom';

export default function ReportCard({ r }){
  const img = r.images?.[0] || 'https://via.placeholder.com/400x250?text=No+image';
  return (
    <Link to={`/reports/${r._id}`} className="block bg-white rounded shadow hover:shadow-md overflow-hidden">
      <img src={img} alt={r.title} className="w-full h-48 object-cover" />
      <div className="p-3">
        <div className="text-sm text-gray-500">{r.type.toUpperCase()} • {r.category || '—'}</div>
        <h3 className="font-medium">{r.title}</h3>
        <p className="text-sm text-gray-600 truncate">{r.description}</p>
      </div>
    </Link>
  );
}
