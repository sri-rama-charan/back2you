import React from 'react';
import { Link } from 'react-router-dom';

export default function ReportCard({ r }){
  const img = r.images?.[0];
  return (
    <Link to={`/reports/${r._id}`} className="block bg-white rounded shadow hover:shadow-md overflow-hidden">
      <img 
      src={img || "https://placehold.co/400x250?text=No+image"} 
      className="w-full h-48 object-cover"
      alt={r.title || "No image"} 
    />
      <div className="p-3">
        <div className="text-sm text-gray-500">{r.type.toUpperCase()} • {r.category || '—'}</div>
        <h3 className="font-medium">{r.title}</h3>
        <p className="text-sm text-gray-600 truncate">{r.description}</p>
      </div>
    </Link>
  );
}
