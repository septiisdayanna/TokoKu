import React from 'react';
import { Link } from 'react-router-dom';

// Terima props secara individual: id, name, price, imageUrl
export default function ProductCard({ id, name, price, imageUrl }) {
  // Hapus baris destructuring yang salah
  // const { id, name, price, imageUrl } = product;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-56 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{name}</h3>
        {/* Tambahkan pengecekan untuk memastikan price adalah angka */}
        <p className="text-gray-800 font-bold">Rp{typeof price === 'number' ? price.toLocaleString('id-ID') : 'N/A'}</p>
        <Link to={`/products/${id}`} className="text-blue-500 hover:underline mt-2 block">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}