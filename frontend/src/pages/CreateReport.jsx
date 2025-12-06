// pages/CreateReport.jsx
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateReport() {
  const [form, setForm] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: '',
    location: '',
  });
  // New state to hold the selected file
  const [imageFile, setImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (!form.title.trim()) return setError('Please enter a title');
    
    setLoading(true);

    try {
      // 1. Create FormData object to send text + file
      const data = new FormData();
      data.append('type', form.type);
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('category', form.category);
      data.append('location', form.location);
      
      // 2. Append the file if user selected one
      // The name 'image' must match upload.single('image') in backend
      if (imageFile) {
        data.append('image', imageFile);
      }

      // 3. Send to backend (Axios automatically handles Content-Type)
      const res = await api.post('/api/reports', data);
      
      nav(`/reports/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Could not create report');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create a report</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Type Selection */}
        <div className="flex gap-2">
          <label className={`px-3 py-1 rounded cursor-pointer ${form.type==='lost' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            <input type="radio" name="type" checked={form.type==='lost'} onChange={()=>setForm({...form, type:'lost'})} className="hidden" /> Lost
          </label>
          <label className={`px-3 py-1 rounded cursor-pointer ${form.type==='found' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            <input type="radio" name="type" checked={form.type==='found'} onChange={()=>setForm({...form, type:'found'})} className="hidden" /> Found
          </label>
        </div>

        <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Title (e.g., Black iPhone X)" />

        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Description details..."></textarea>

        <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Category (e.g., Electronics)" />

        <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Location" />

        {/* IMAGE UPLOAD FIELD */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Upload Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="w-full p-2 border rounded bg-gray-50 text-gray-700"
          />
        </div>

        <button disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
          {loading ? 'Creating...' : 'Create report'}
        </button>
      </form>
    </div>
  );
}