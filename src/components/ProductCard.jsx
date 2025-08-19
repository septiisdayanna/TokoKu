import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 

export default function ProductCard({ id, name, price, imageUrl, category, stock }) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Anda harus login untuk menambahkan item ke keranjang.');
      navigate('/login'); // Arahkan ke halaman login
      return;
    }
    const productToAdd = { id, name, price, imageUrl, category, stock };
    addToCart(productToAdd);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 hover:shadow-2xl border border-gray-200">
      {/* Kontainer Gambar */}
      <div className="overflow-hidden relative">
        <Link to={`/products/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
          />
        </Link>
      </div>

      {/* Kontainer Konten */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Kategori */}
        <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">{category || 'Uncategorized'}</p>
        
        {/* Nama Produk */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          <Link to={`/products/${id}`} className="hover:text-blue-700 transition-colors">
            {name}
          </Link>
        </h3>

        {/* Harga dan Stok */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-gray-800">
              Rp{typeof price === 'number' ? price.toLocaleString('id-ID') : 'N/A'}
            </p>
            <p className={`text-xs font-bold px-2.5 py-1 rounded-full ${stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {stock > 0 ? `Stok: ${stock}` : 'Habis'}
            </p>
          </div>

          {/* Tombol Aksi */}
          <button
            onClick={handleAddToCart}
            disabled={!stock || stock === 0}
            className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}