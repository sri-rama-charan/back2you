// pages/Login.jsx
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          className="w-full p-2 border rounded" placeholder="Email" />
        <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          className="w-full p-2 border rounded" placeholder="Password" />
        <button disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
