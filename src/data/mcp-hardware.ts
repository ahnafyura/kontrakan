import type { FloorId } from "@/data/network";

export type HardwareIcon =
  | "ac"
  | "outlet"
  | "fridge"
  | "dispenser"
  | "pump"
  | "corridor-light"
  | "router-plug"
  | "hub";

export type HardwareTier = 1 | 2 | 3;

export interface HardwarePoint {
  id: string;
  label: string;
  icon: HardwareIcon;
  floor: FloorId;
  location: string;
  roomId?: string;
  connectivity: "wifi" | "lan";
  tier: HardwareTier;
  note?: string;
  /** apa fungsinya di sistem MCP */
  purpose: string;
  /** estimasi harga satuan (Rp), harga pasar Indonesia — lihat planning.md */
  priceRp: number;
}

// Every physical point needed for the arus-listrik-per-stop-kontak MCP source to work end to
// end, matching the shopping list in planning.md mapped onto the actual room layout in
// src/data/network.ts. Nothing here is optional to the *visualization* even if the hardware
// itself (tier 2/3) is optional to buy — the point is completeness, not purchase priority.
export const hardwarePoints: HardwarePoint[] = [
  // --- Lantai 1 ---
  {
    id: "plug-ac-lt1-kamar1",
    label: "Smart Plug AC (≥16A)",
    icon: "ac",
    floor: 1,
    location: "Kamar 1",
    roomId: "lt1-kamar-1",
    connectivity: "wifi",
    tier: 1,
    note: "Sonoff S60 atau setara, rating tinggi untuk beban AC",
    purpose: "Monitor & kontrol daya AC — beban terbesar & termahal",
    priceRp: 300000,
  },
  {
    id: "plug-outlet-lt1-kamar1",
    label: "Smart Plug Outlet Umum",
    icon: "outlet",
    floor: 1,
    location: "Kamar 1",
    roomId: "lt1-kamar-1",
    connectivity: "wifi",
    tier: 1,
    note: "Outlet non-AC di kamar yang sama",
    purpose: "Monitor daya outlet non-AC di kamar",
    priceRp: 180000,
  },
  {
    id: "plug-outlet-lt1-ahnaf",
    label: "Smart Plug Outlet Umum",
    icon: "outlet",
    floor: 1,
    location: "Kamar Ahnaf",
    roomId: "lt1-kamar-ahnaf",
    connectivity: "wifi",
    tier: 1,
    note: "Pasang di extension cord meja (lihat Setup Ahnaf)",
    purpose: "Monitor total daya meja kerja (laptop, monitor, dll)",
    priceRp: 180000,
  },
  {
    id: "plug-fridge",
    label: "Smart Plug Kulkas",
    icon: "fridge",
    floor: 1,
    location: "Dapur / Area Bersama",
    connectivity: "wifi",
    tier: 1,
    purpose: "Monitor daya kulkas bersama",
    priceRp: 180000,
  },
  {
    id: "plug-dispenser",
    label: "Smart Plug Dispenser",
    icon: "dispenser",
    floor: 1,
    location: "Dapur / Area Bersama",
    connectivity: "wifi",
    tier: 1,
    purpose: "Monitor daya dispenser",
    priceRp: 180000,
  },
  {
    id: "relay-pump",
    label: "Smart Relay Pompa Air",
    icon: "pump",
    floor: 1,
    location: "Area Utilitas / Luar",
    connectivity: "wifi",
    tier: 2,
    note: "Sonoff POW R3 inline — cek dulu hardwired atau tidak saat survei",
    purpose: "Monitor & kontrol pompa air (jika hardwired ke saklar)",
    priceRp: 394000,
  },
  {
    id: "relay-corridor-light",
    label: "Smart Relay Lampu Koridor",
    icon: "corridor-light",
    floor: 1,
    location: "Koridor",
    connectivity: "wifi",
    tier: 2,
    note: "Inline ke saklar dinding — cek dulu hardwired atau tidak",
    purpose: "Monitor & kontrol lampu koridor (jika hardwired ke saklar)",
    priceRp: 394000,
  },
  {
    id: "plug-router-lt1",
    label: "Smart Plug Router (opsional)",
    icon: "router-plug",
    floor: 1,
    location: "Ruang Tamu, dekat Router Lt.1",
    connectivity: "wifi",
    tier: 2,
    note: "Opsional — cukup on/off, tak perlu monitoring detail",
    purpose: "On/off jarak jauh Router Lt.1 saat perlu restart",
    priceRp: 100000,
  },
  {
    id: "hub",
    label: "Home Assistant Hub",
    icon: "hub",
    floor: 1,
    location: "Ruang Tamu, dekat Router Lt.1",
    connectivity: "lan",
    tier: 3,
    note: "Raspberry Pi 4 atau PC bekas — kabel LAN langsung ke Router Lt.1, bukan WiFi",
    purpose: "Pusat pengumpul & agregasi data semua smart plug/relay",
    priceRp: 1500000,
  },

  // --- Lantai 2 ---
  {
    id: "plug-outlet-lt2-kamar1",
    label: "Smart Plug Outlet Umum",
    icon: "outlet",
    floor: 2,
    location: "Kamar 1",
    roomId: "lt2-kamar-1",
    connectivity: "wifi",
    tier: 1,
    purpose: "Monitor daya outlet kamar",
    priceRp: 180000,
  },
  {
    id: "plug-outlet-lt2-kamar2",
    label: "Smart Plug Outlet Umum",
    icon: "outlet",
    floor: 2,
    location: "Kamar 2",
    roomId: "lt2-kamar-2",
    connectivity: "wifi",
    tier: 1,
    purpose: "Monitor daya outlet kamar",
    priceRp: 180000,
  },
  {
    id: "plug-outlet-lt2-kamar3",
    label: "Smart Plug Outlet Umum",
    icon: "outlet",
    floor: 2,
    location: "Kamar 3",
    roomId: "lt2-kamar-3",
    connectivity: "wifi",
    tier: 1,
    purpose: "Monitor daya outlet kamar",
    priceRp: 180000,
  },
  {
    id: "plug-router-lt2",
    label: "Smart Plug Router (opsional)",
    icon: "router-plug",
    floor: 2,
    location: "Dekat Router Lt.2",
    connectivity: "wifi",
    tier: 2,
    note: "Opsional — cukup on/off, tak perlu monitoring detail",
    purpose: "On/off jarak jauh Router Lt.2 saat perlu restart",
    priceRp: 100000,
  },
];

export function hardwareByFloor(floor: FloorId) {
  return hardwarePoints.filter((p) => p.floor === floor);
}

export function hardwareGrandTotalRp() {
  return hardwarePoints.reduce((sum, p) => sum + p.priceRp, 0);
}

export const tierLabel: Record<HardwareTier, string> = {
  1: "Tier 1 · Beli sekarang",
  2: "Tier 2 · Setelah survei fisik",
  3: "Tier 3 · Hub",
};
