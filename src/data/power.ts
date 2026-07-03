// TODO(mcp): swap the mock constants below for a live fetch once the MCP power-monitoring
// source (Home Assistant, tracking arus listrik per stop kontak per kamar + beban bersama) is
// connected. Keep the function signatures (getPowerSummary, getRoomPower, getSharedLoads,
// getRecentAlerts) stable — they may become async, but callers only need to add `await`.

export interface RoomPowerReading {
  roomId: string;
  watts: number;
  updatedAt: string;
}

export interface SharedLoadReading {
  id: string;
  label: string;
  watts: number;
  isOn: boolean;
}

export interface PowerAlert {
  id: string;
  message: string;
  severity: "warning" | "critical";
  timestamp: string;
}

export interface PowerSummary {
  totalWatts: number;
  capacityWatts: number;
  warningWatts: number;
  monthlyKwh: number;
  monthlyCostRp: number;
}

const roomPower: RoomPowerReading[] = [
  { roomId: "lt1-kamar-1", watts: 850, updatedAt: "2 menit lalu" },
  { roomId: "lt1-kamar-ahnaf", watts: 320, updatedAt: "2 menit lalu" },
  { roomId: "lt2-kamar-1", watts: 120, updatedAt: "2 menit lalu" },
  { roomId: "lt2-kamar-2", watts: 95, updatedAt: "2 menit lalu" },
  { roomId: "lt2-kamar-3", watts: 140, updatedAt: "2 menit lalu" },
];

const sharedLoads: SharedLoadReading[] = [
  { id: "pompa-air", label: "Pompa Air", watts: 0, isOn: false },
  { id: "kulkas", label: "Kulkas Bersama", watts: 150, isOn: true },
  { id: "lampu-koridor", label: "Lampu Koridor", watts: 40, isOn: true },
  { id: "dispenser", label: "Dispenser", watts: 350, isOn: true },
  { id: "wifi", label: "WiFi (2 Router)", watts: 24, isOn: true },
];

const recentAlerts: PowerAlert[] = [
  {
    id: "a1",
    message: "Beban puncak 2480W terdeteksi pukul 19:42 (AC + charger bersamaan)",
    severity: "warning",
    timestamp: "Kemarin, 19:42",
  },
  {
    id: "a2",
    message: "Dispenser menyala terus-menerus >6 jam",
    severity: "warning",
    timestamp: "Kemarin, 14:10",
  },
  {
    id: "a3",
    message: "Total beban melebihi 2600W selama 5 menit",
    severity: "critical",
    timestamp: "3 hari lalu, 20:15",
  },
];

export function getPowerSummary(): PowerSummary {
  const totalWatts =
    roomPower.reduce((sum, r) => sum + r.watts, 0) +
    sharedLoads.reduce((sum, l) => sum + l.watts, 0);

  return {
    totalWatts,
    capacityWatts: 2700,
    warningWatts: 2400,
    monthlyKwh: 452,
    monthlyCostRp: 745000,
  };
}

export function getRoomPower(): RoomPowerReading[] {
  return roomPower;
}

export function getSharedLoads(): SharedLoadReading[] {
  return sharedLoads;
}

export function getRecentAlerts(): PowerAlert[] {
  return recentAlerts;
}
