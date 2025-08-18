import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom'; // 1. Impor useSearchParams
import { db } from '../firebaseConfig'; 
import ProductCard from '../components/ProductCard'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams(); // 2. Dapatkan parameter URL

  // Efek untuk mengambil data dari Firestore (hanya sekali)
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

  // Efek untuk memfilter produk setiap kali data atau parameter URL berubah
  useEffect(() => {
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('search');
    
    let tempProducts = [...products];

    if (category) {
      tempProducts = tempProducts.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter(p => p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(tempProducts);
  }, [products, searchParams]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Halaman Utama</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>Tidak ada produk yang cocok dengan kriteria Anda.</p>
        )}
      </div>
    </div>
  );
}