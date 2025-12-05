// pages/CreateReport.jsx
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateReport(){
  const [form, setForm] = useState({
    type: 'lost',
    title: '',
    description: '',
    category: '',
    location: '',
    images: [] // array of URLs
  });
  const [imgInput, setImgInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setError('');
    // basic validation
    if (!form.title.trim()) return setError('Please enter a title');
    setLoading(true);
    try {
      const res = await api.post('/api/reports', form);
      nav(`/reports/${res.data._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not create report');
    } finally {
      setLoading(false);
    }
  }

  function addImageUrl(){
    if (!imgInput) return;
    setForm(prev => ({ ...prev, images: [...prev.images, imgInput] }));
    setImgInput('');
  }

  function removeImage(idx){
    setForm(prev => ({ ...prev, images: prev.images.filter((_,i)=>i!==idx) }));
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create a report</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <label className={`px-3 py-1 rounded cursor-pointer ${form.type==='lost' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            <input type="radio" name="type" checked={form.type==='lost'} onChange={()=>setForm({...form, type:'lost'})} className="hidden" /> Lost
          </label>
          <label className={`px-3 py-1 rounded cursor-pointer ${form.type==='found' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
            <input type="radio" name="type" checked={form.type==='found'} onChange={()=>setForm({...form, type:'found'})} className="hidden" /> Found
          </label>
        </div>

        <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Title (e.g., Black iPhone X with sticker)" />

        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Description (add unique details)"></textarea>

        <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Category (e.g., electronics, wallet)" />

        <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})}
          className="w-full p-2 border rounded" placeholder="Location (building / area)" />

        <div>
          <label className="block text-sm font-medium mb-1">Images (paste image URLs)</label>
          <div className="flex gap-2">
            <input value={imgInput} onChange={e=>setImgInput(e.target.value)} placeholder="https://..." className="flex-1 p-2 border rounded" />
            <button type="button" onClick={addImageUrl} className="px-3 py-2 bg-gray-200 rounded">Add</button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {form.images.map((u, idx) => (
              <div key={idx} className="relative">
                <img src={u} alt={`img-${idx}`} className="w-28 h-20 object-cover rounded border" />
                <button type="button" onClick={()=>removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs">×</button>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">Tip: use Cloudinary or Imgur to upload and paste URL here. We'll add direct upload later.</div>
        </div>

        <button disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">
          {loading ? 'Creating...' : 'Create report'}
        </button>
      </form>
    </div>
  );
}