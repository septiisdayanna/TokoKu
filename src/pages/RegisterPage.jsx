import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State untuk pesan error
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Bersihkan error sebelumnya
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      // Terjemahkan kode error Firebase ke pesan yang mudah dimengerti
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email ini sudah terdaftar.');
          break;
        case 'auth/weak-password':
          setError('Password terlalu lemah. Gunakan minimal 6 karakter.');
          break;
        case 'auth/invalid-email':
          setError('Format email tidak valid.');
          break;
        default:
          setError('Gagal untuk mendaftar. Silakan coba lagi.');
          break;
      }
      console.error("Gagal mendaftar:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min. 6 karakter)" required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700">Register</button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Login di sini</Link>
        </p>
      </form>
    </div>
  );
}