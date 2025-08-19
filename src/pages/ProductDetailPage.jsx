import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const { addToCart } = useCart();
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        setProduct(null);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Anda harus login untuk menambahkan item ke keranjang.');
      navigate('/login'); // Arahkan ke halaman login
      return;
    }
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  if (!product) {
    return <div className="text-center p-10">Memuat produk...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kolom Gambar */}
          <div className="flex justify-center items-center">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full max-w-md h-auto object-cover rounded-lg" 
            />
          </div>

          {/* Kolom Informasi Produk */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">{product.category || 'Uncategorized'}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 my-2">{product.name}</h1>
            
            <p className="text-gray-600 mt-4 mb-6">{product.description || 'Tidak ada deskripsi untuk produk ini.'}</p>

            <div className="flex items-center justify-between mb-6">
              <p className="text-3xl font-extrabold text-gray-900">
                Rp{typeof product.price === 'number' ? product.price.toLocaleString('id-ID') : 'N/A'}
              </p>
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
              </span>
            </div>

            {/* Aksi Pengguna */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Pemilih Kuantitas */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold">-</button>
                <span className="px-4 py-2 border-l border-r">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-2 text-lg font-bold">+</button>
              </div>

              {/* Tombol Tambah ke Keranjang */}
              <button 
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}