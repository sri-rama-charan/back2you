// pages/ReportDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function ReportDetail(){
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=> {
    setLoading(true);
    api.get(`/api/reports/${id}`)
      .then(res => setReport(res.data))
      .catch(err => setError('Could not load report'))
      .finally(()=> setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!report) return <div>Not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {report.images && report.images.length ? (
            <img src={report.images[0]} alt={report.title} className="w-full h-80 object-cover rounded" />
          ) : (
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded">No image</div>
          )}
          <div className="mt-3 flex gap-2">
            {report.images?.slice(1).map((u,i)=>
              <img key={i} src={u} alt={`thumb-${i}`} className="w-20 h-20 object-cover rounded border" />
            )}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">{report.type.toUpperCase()} • {report.category || '—'}</div>
          <h1 className="text-2xl font-semibold my-2">{report.title}</h1>
          <p className="text-gray-700 mb-3">{report.description}</p>

          <div className="text-sm text-gray-600 mb-2">
            <div><strong>Location:</strong> {report.location || '—'}</div>
            <div><strong>Reported by:</strong> {report.reportedBy?.name || 'Anonymous'}</div>
            <div><strong>Status:</strong> {report.status}</div>
          </div>

          <div className="mt-4 space-y-2">
            <button onClick={()=>alert('Contact feature coming: will open chat / proxy email.')}
              className="px-4 py-2 bg-indigo-600 text-white rounded">Contact owner</button>

            <button onClick={()=>alert('Claim / Found flow coming in Phase 2')}
              className="px-4 py-2 border rounded">This is mine / I found this</button>
          </div>
        </div>
      </div>
    </div>
  );
}
