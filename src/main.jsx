import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext.jsx';
import './index.css'
import App from './App.jsx'

// Impor komponen halaman
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/About.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App.jsx sekarang menjadi layout
    children: [
      { index: true, element: <HomePage /> }, // Halaman utama 
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider> {/* Bungkus dengan CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)