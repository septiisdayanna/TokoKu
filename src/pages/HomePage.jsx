import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import ProductCard from '../components/ProductCard'; 
// Hapus import Link jika tidak digunakan langsung di sini
// import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1>Halaman Utama</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

