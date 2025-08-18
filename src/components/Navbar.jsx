import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 1. Impor useCart

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart(); // 2. Dapatkan item keranjang
  const navigate = useNavigate();

  // State lokal untuk input pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Hitung total item unik di keranjang untuk badge
  const totalCartItems = cartItems.length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Gagal logout', error);
    }
  };

  // Fungsi untuk menangani submit pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate('/');
    }
  };

  // Fungsi untuk menangani perubahan filter kategori
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category) {
      navigate(`/?category=${category}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-8 w-full sm:w-auto">
        <Link to="/" className="text-xl font-bold">TokoKu</Link>
        
        {/* Filter Kategori */}
        <select 
          onChange={handleCategoryChange} 
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
        >
          <option value="">Semua Kategori</option>
          <option value="buah">Buah</option>
          <option value="elektronik">Elektronik</option>
          <option value="pakaian">Pakaian</option>
          {/* Kategori ini sebaiknya diambil dinamis dari database di aplikasi nyata */}
        </select>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="flex-grow sm:flex-grow-0">
          <input 
            type="search"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-l px-2 py-1 text-sm w-full"
          />
        </form>

        {/* Ikon Keranjang */}
        <Link to="/cart" className="relative">
          {/* SVG Icon untuk keranjang */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Link>

        {/* Status Login */}
        {currentUser ? (
          <>
            <span className="text-sm hidden md:block">Halo, {currentUser.email}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-sm">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-sm">Login</Link>
        )}
      </div> 
    </nav>   
  );
}