// ============================================
// EDIT SKILL JARINGAN MIKROTIK ANDA DI SINI
// Level: 0-100 (persentase kemahiran)
// ============================================

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "routing" | "firewall" | "wireless" | "vpn" | "monitoring" | "other";
  description?: string;
}

export const skillsData: Skill[] = [
  // ROUTING & SWITCHING
  {
    name: "Static & Dynamic Routing",
    level: 95,
    category: "routing",
    description: "OSPF, BGP, RIP, Static Routes"
  },
  {
    name: "VLAN & Bridge",
    level: 90,
    category: "routing",
    description: "VLAN Tagging, Bridge Configuration"
  },
  {
    name: "Load Balancing",
    level: 85,
    category: "routing",
    description: "PCC, ECMP, Failover"
  },
  
  // FIREWALL & SECURITY
  {
    name: "Firewall Filter",
    level: 92,
    category: "firewall",
    description: "Chain Input, Forward, Output"
  },
  {
    name: "NAT & Mangle",
    level: 88,
    category: "firewall",
    description: "Masquerade, Port Forwarding, QoS"
  },
  {
    name: "Address List & Layer7",
    level: 80,
    category: "firewall",
    description: "Content Filtering, Access Control"
  },
  
  // WIRELESS
  {
    name: "Wireless AP & Station",
    level: 85,
    category: "wireless",
    description: "CAPsMAN, WDS, Mesh"
  },
  {
    name: "Hotspot Management",
    level: 90,
    category: "wireless",
    description: "User Manager, Voucher System"
  },
  
  // VPN
  {
    name: "PPTP & L2TP",
    level: 88,
    category: "vpn",
    description: "Site-to-Site, Remote Access"
  },
  {
    name: "IPSec & WireGuard",
    level: 75,
    category: "vpn",
    description: "Secure Tunnel Configuration"
  },
  
  // MONITORING
  {
    name: "The Dude & Netwatch",
    level: 82,
    category: "monitoring",
    description: "Network Monitoring & Alert"
  },
  {
    name: "Graphing & Logging",
    level: 78,
    category: "monitoring",
    description: "Traffic Analysis, Syslog"
  },
];

export const skillCategories = {
  routing: { label: "Routing & Switching", icon: "🔀" },
  firewall: { label: "Firewall & Security", icon: "🛡️" },
  wireless: { label: "Wireless", icon: "📡" },
  vpn: { label: "VPN", icon: "🔐" },
  monitoring: { label: "Monitoring", icon: "📊" },
  other: { label: "Lainnya", icon: "⚙️" },
};
