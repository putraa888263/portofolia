// ============================================
// EDIT DAFTAR VIDEO PORTFOLIO ANDA DI SINI
// ============================================

export interface Video {
  id: string;
  title: string;
  description: string;
  // Untuk YouTube: gunakan ID video (contoh: "dQw4w9WgXcQ")
  // Untuk Vimeo: gunakan ID video (contoh: "123456789")
  videoId: string;
  platform: "youtube" | "vimeo";
  thumbnail?: string; // Opsional, akan auto-generate dari platform
  tags: string[];
  featured?: boolean;
}

export const videosData: Video[] = [
  {
    id: "1",
    title: "Tutorial Load Balancing Mikrotik",
    description: "Cara setting load balancing PCC dengan 2 ISP untuk optimasi bandwidth.",
    videoId: "dQw4w9WgXcQ", // Ganti dengan ID video YouTube Anda
    platform: "youtube",
    tags: ["Mikrotik", "Load Balancing", "Tutorial"],
    featured: true,
  },
  {
    id: "2",
    title: "Konfigurasi Hotspot Mikrotik",
    description: "Setup hotspot lengkap dengan voucher system dan user manager.",
    videoId: "dQw4w9WgXcQ", // Ganti dengan ID video YouTube Anda
    platform: "youtube",
    tags: ["Mikrotik", "Hotspot", "Voucher"],
    featured: true,
  },
  {
    id: "3",
    title: "VPN Site-to-Site dengan IPSec",
    description: "Menghubungkan 2 kantor dengan VPN IPSec Mikrotik secara aman.",
    videoId: "dQw4w9WgXcQ", // Ganti dengan ID video YouTube Anda
    platform: "youtube",
    tags: ["Mikrotik", "VPN", "IPSec"],
    featured: false,
  },
  {
    id: "4",
    title: "Firewall Filter Best Practices",
    description: "Tips dan trik konfigurasi firewall Mikrotik untuk keamanan maksimal.",
    videoId: "dQw4w9WgXcQ", // Ganti dengan ID video YouTube Anda
    platform: "youtube",
    tags: ["Mikrotik", "Firewall", "Security"],
    featured: false,
  },
];

// Helper untuk generate thumbnail URL
export const getThumbnailUrl = (video: Video): string => {
  if (video.thumbnail) return video.thumbnail;
  
  if (video.platform === "youtube") {
    return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
  }
  
  // Untuk Vimeo, perlu API call terpisah, gunakan placeholder
  return "/images/video-placeholder.jpg";
};

// Helper untuk generate embed URL
export const getEmbedUrl = (video: Video): string => {
  if (video.platform === "youtube") {
    return `https://www.youtube.com/embed/${video.videoId}`;
  }
  return `https://player.vimeo.com/video/${video.videoId}`;
};
