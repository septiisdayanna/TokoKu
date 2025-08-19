# TokoKu: Prototipe Aplikasi E-Commerce

## Deskripsi Proyek

**TokoKu** adalah sebuah prototipe aplikasi web e-commerce yang dibangun untuk mendemonstrasikan implementasi fitur-fitur inti pada sebuah toko online modern. Proyek ini mengintegrasikan teknologi front-end modern (React) dengan layanan backend yang andal (Firebase) untuk menciptakan pengalaman pengguna yang fungsional, mulai dari melihat produk hingga proses checkout sederhana.

## Teknologi yang Digunakan

-   **Front-End:**
    -   [React.js](https://reactjs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [React Router](https://reactrouter.com/)
    -   [Tailwind CSS](https://tailwindcss.com/)
-   **Back-End (BaaS):**
    -   [Firebase](https://firebase.google.com/) (Firestore Database & Authentication)
-   **State Management:**
    -   React Context API

## Fitur-Fitur Utama

-   **Autentikasi Pengguna:** Registrasi, Login, dan Logout dengan validasi dan notifikasi error.
-   **Katalog Produk:** Menampilkan semua produk secara dinamis dari database Firestore.
-   **Pencarian & Filter:** Mencari produk berdasarkan nama dan memfilter berdasarkan kategori.
-   **Halaman Detail Produk:** Halaman khusus untuk setiap produk dengan deskripsi lengkap.
-   **Keranjang Belanja:** Fungsionalitas untuk menambah, melihat, dan menghapus item dari keranjang.
-   **Validasi Login:** Pengguna diwajibkan login sebelum dapat menambahkan item ke keranjang.

## Petunjuk Instalasi & Setup

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/username/repository-name.git
    cd repository-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Firebase Environment Variables:**
    -   Buat file `.env` di direktori root proyek.
    -   Salin konfigurasi Firebase Anda ke dalam file `.env` seperti contoh di bawah ini. Anda bisa mendapatkan kredensial ini dari Firebase Console proyek Anda.

    ```env
    VITE_FIREBASE_API_KEY="AIzaSy..."
    VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
    VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"
    ```

4.  **Jalankan development server:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.

## Penjelasan Dukungan AI

Proyek ini dikembangkan dengan bantuan intensif dari **GitHub Copilot (berbasis model Gemini)** sebagai AI programming assistant. AI berperan sebagai partner pemrograman yang membantu dalam berbagai aspek pengembangan:

-   **Pembuatan Kode (Scaffolding):** Membuat struktur awal untuk komponen React, context, dan halaman dengan cepat.
-   **Implementasi Logika:** Memberikan contoh implementasi untuk menghubungkan aplikasi dengan Firebase, seperti mengambil data dari Firestore dan fungsi autentikasi.
-   **Debugging & Perbaikan Error:** Menganalisis pesan error dan memberikan penjelasan serta solusi yang tepat, yang secara signifikan mengurangi waktu debugging.
-   **Refactoring & Peningkatan Kualitas:** Memberikan saran perbaikan kode, seperti memperbaiki struktur JSX dan meningkatkan UI/UX pada komponen `ProductCard` dan halaman detail produk.

Penggunaan AI secara nyata telah mempercepat proses development dan meningkatkan kualitas akhir dari