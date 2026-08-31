import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Pesanan berhasil dibuat!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl mb-4">Keranjang Anda Kosong</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Kembali ke Halaman Utama
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Keranjang Belanja</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>Kuantitas: {item.quantity}</p>
              <p>Harga: Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: Rp{totalPrice.toLocaleString('id-ID')}</h2>
        <button 
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}