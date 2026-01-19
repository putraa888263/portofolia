// ============================================
// EDIT KONFIGURASI KONTAK DI SINI
// ============================================

export const contactConfig = {
  // Gunakan Formspree untuk form handling gratis
  // 1. Daftar di https://formspree.io
  // 2. Buat form baru
  // 3. Copy endpoint ID dan paste di bawah
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Ganti dengan ID form Anda
  
  // Atau gunakan Netlify Forms (jika deploy di Netlify)
  // Set useNetlifyForms: true jika ingin menggunakan Netlify Forms
  useNetlifyForms: false,
  
  // Pesan sukses setelah form terkirim
  successMessage: "Pesan berhasil dikirim! Saya akan segera membalas.",
  
  // Pesan error jika gagal
  errorMessage: "Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.",
};

// Info kontak tambahan
export const contactInfo = {
  email: "email@anda.com",
  phone: "+62 896-5837-0077",
  whatsapp: "+6289658370077", // Tanpa + dan spasi untuk link WhatsApp
  location: "Bogor, Indonesia",
  availability: "Senin - Jumat, 06:00 - 18:00 WIB",
};
