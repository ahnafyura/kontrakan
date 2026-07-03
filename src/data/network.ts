export type FloorId = 1 | 2;

export interface Room {
  id: string;
  name: string;
  floor: FloorId;
  occupant?: string;
  hasAC: boolean;
  outlets: number;
  /** true if this room has a wired LAN drop, not just WiFi */
  lanDrop: boolean;
  detailHref?: string;
}

export interface RouterNode {
  id: string;
  name: string;
  floor: FloorId;
  model: string;
  ssid: string;
  /** id of the node this router uplinks to: the ISP ONT, or another router */
  uplink: "ont" | string;
}

export const isp = {
  provider: "MyRepublic",
  subscription: "1 langganan (shared 2 lantai)",
  ontLocation: "Ruang tamu, Lantai 1",
};

export const routers: RouterNode[] = [
  {
    id: "router-lt1",
    name: "Router Lantai 1",
    floor: 1,
    model: "AC1200 Dual-Band",
    ssid: "Kontrakan_Lt1",
    uplink: "ont",
  },
  {
    id: "router-lt2",
    name: "Router Lantai 2",
    floor: 2,
    model: "AC1200 Dual-Band",
    ssid: "Kontrakan_Lt2",
    uplink: "router-lt1",
  },
];

export const rooms: Room[] = [
  {
    id: "lt1-kamar-1",
    name: "Kamar 1",
    floor: 1,
    hasAC: true,
    outlets: 2,
    lanDrop: false,
  },
  {
    id: "lt1-kamar-ahnaf",
    name: "Kamar Ahnaf",
    floor: 1,
    occupant: "Ahnaf",
    hasAC: false,
    outlets: 3,
    lanDrop: true,
    detailHref: "/rooms/ahnaf",
  },
  {
    id: "lt2-kamar-1",
    name: "Kamar 1",
    floor: 2,
    hasAC: false,
    outlets: 2,
    lanDrop: false,
  },
  {
    id: "lt2-kamar-2",
    name: "Kamar 2",
    floor: 2,
    hasAC: false,
    outlets: 2,
    lanDrop: false,
  },
  {
    id: "lt2-kamar-3",
    name: "Kamar 3",
    floor: 2,
    hasAC: false,
    outlets: 2,
    lanDrop: false,
  },
];

export function roomsByFloor(floor: FloorId) {
  return rooms.filter((r) => r.floor === floor);
}

export function routerByFloor(floor: FloorId) {
  return routers.find((r) => r.floor === floor)!;
}
