import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCart } from '../context/CartContext'; // Impor useCart

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Dapatkan fungsi addToCart

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

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div className="p-4">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-64 h-64 object-cover mb-4" />
      <p>{product.description}</p>
      <p className="font-bold mt-2">
        Harga: Rp{typeof product.price === 'number' ? product.price.toLocaleString('id-ID') : 'Harga tidak tersedia'}
      </p>
      <button 
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}