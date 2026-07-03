import type { SchematicNode, SchematicEdge } from "@/lib/schematic";
import { isp, routerByFloor, roomsByFloor, type FloorId } from "@/data/network";

export const floorViewBox = "0 0 900 460";

function roomNode(
  id: string,
  label: string,
  sublabel: string,
  x: number,
  href?: string,
  highlight?: boolean,
): SchematicNode {
  return {
    id,
    label,
    sublabel,
    icon: "room",
    x,
    y: 320,
    width: 210,
    height: 130,
    href,
    highlight,
  };
}

export function floorSchematic(floor: FloorId): {
  nodes: SchematicNode[];
  edges: SchematicEdge[];
} {
  const router = routerByFloor(floor);
  const rooms = roomsByFloor(floor);

  if (floor === 1) {
    const [k1, k2] = rooms;
    const nodes: SchematicNode[] = [
      {
        id: "ont",
        label: isp.provider + " ONT",
        sublabel: isp.subscription,
        icon: "ont",
        x: 140,
        y: 90,
        width: 170,
        height: 64,
      },
      {
        id: "router",
        label: router.name,
        sublabel: router.ssid,
        icon: "router",
        x: 420,
        y: 90,
        width: 180,
        height: 64,
        highlight: true,
      },
      {
        id: "panel",
        label: "Jalur Listrik Lt.1",
        sublabel: "Existing - belum per-kamar",
        icon: "panel",
        x: 700,
        y: 90,
        width: 190,
        height: 64,
      },
      roomNode(k1.id, k1.name, k1.hasAC ? "AC · 2 outlet" : "2 outlet", 240),
      roomNode(
        k2.id,
        k2.name,
        k2.lanDrop ? `${k2.outlets} outlet · LAN drop` : "2 outlet",
        560,
        k2.detailHref,
        k2.lanDrop,
      ),
      {
        id: "riser",
        label: "Backbone ke Lantai 2",
        sublabel: "LAN uplink via riser",
        icon: "riser-up",
        x: 820,
        y: 320,
        width: 150,
        height: 100,
      },
    ];

    const edges: SchematicEdge[] = [
      {
        id: "e-ont-router",
        from: "ont",
        to: "router",
        type: "lan",
        label: "WAN",
        path: "M 225 90 H 330",
        labelAt: { x: 277, y: 76 },
      },
      {
        id: "e-router-k1",
        from: "router",
        to: k1.id,
        type: "lan",
        label: "WiFi",
        path: "M 380 122 V 220 H 240 V 255",
        labelAt: { x: 250, y: 208 },
      },
      {
        id: "e-router-k2",
        from: "router",
        to: k2.id,
        type: "lan",
        label: "WiFi + LAN kabel",
        path: "M 460 122 V 220 H 560 V 255",
        labelAt: { x: 566, y: 208 },
      },
      {
        id: "e-router-riser",
        from: "router",
        to: "riser",
        type: "lan",
        label: "Uplink",
        path: "M 500 58 V 34 H 820 V 270",
        labelAt: { x: 700, y: 22 },
      },
      {
        id: "e-panel-router",
        from: "panel",
        to: "router",
        type: "power",
        label: "Power",
        path: "M 650 122 V 160 H 470 V 122",
        labelAt: { x: 580, y: 152 },
      },
      {
        id: "e-panel-k1",
        from: "panel",
        to: k1.id,
        type: "power",
        label: "Power",
        path: "M 630 122 V 400 H 240 V 385",
        labelAt: { x: 400, y: 412 },
      },
      {
        id: "e-panel-k2",
        from: "panel",
        to: k2.id,
        type: "power",
        label: "Power",
        path: "M 700 122 V 255",
        labelAt: { x: 706, y: 190 },
      },
    ];

    return { nodes, edges };
  }

  // Floor 2 (3 rooms)
  const [k1, k2, k3] = rooms;
  const nodes: SchematicNode[] = [
    {
      id: "downlink",
      label: "Dari Lantai 1",
      sublabel: "LAN uplink via riser",
      icon: "riser-down",
      x: 110,
      y: 90,
      width: 150,
      height: 64,
    },
    {
      id: "router",
      label: router.name,
      sublabel: router.ssid,
      icon: "router",
      x: 450,
      y: 90,
      width: 180,
      height: 64,
      highlight: true,
    },
    {
      id: "panel",
      label: "Jalur Listrik Lt.2",
      sublabel: "Existing - belum per-kamar",
      icon: "panel",
      x: 770,
      y: 90,
      width: 180,
      height: 64,
    },
    roomNode(k1.id, k1.name, "2 outlet", 190),
    roomNode(k2.id, k2.name, "2 outlet", 450),
    roomNode(k3.id, k3.name, "2 outlet", 710),
  ];

  const edges: SchematicEdge[] = [
    {
      id: "e-downlink-router",
      from: "downlink",
      to: "router",
      type: "lan",
      label: "Uplink",
      path: "M 185 90 H 360",
      labelAt: { x: 270, y: 76 },
    },
    {
      id: "e-router-k1",
      from: "router",
      to: k1.id,
      type: "lan",
      label: "WiFi",
      path: "M 400 122 V 220 H 190 V 255",
      labelAt: { x: 200, y: 208 },
    },
    {
      id: "e-router-k2",
      from: "router",
      to: k2.id,
      type: "lan",
      label: "WiFi",
      path: "M 450 122 V 255",
      labelAt: { x: 456, y: 190 },
    },
    {
      id: "e-router-k3",
      from: "router",
      to: k3.id,
      type: "lan",
      label: "WiFi",
      path: "M 500 122 V 220 H 710 V 255",
      labelAt: { x: 660, y: 208 },
    },
    {
      id: "e-panel-router",
      from: "panel",
      to: "router",
      type: "power",
      label: "Power",
      path: "M 720 122 V 160 H 500 V 122",
      labelAt: { x: 610, y: 152 },
    },
    {
      id: "e-panel-k1",
      from: "panel",
      to: k1.id,
      type: "power",
      label: "Power",
      path: "M 700 122 V 400 H 190 V 385",
      labelAt: { x: 400, y: 412 },
    },
    {
      id: "e-panel-k2",
      from: "panel",
      to: k2.id,
      type: "power",
      label: "Power",
      path: "M 750 122 V 420 H 450 V 385",
      labelAt: { x: 600, y: 428 },
    },
    {
      id: "e-panel-k3",
      from: "panel",
      to: k3.id,
      type: "power",
      label: "Power",
      path: "M 770 122 V 255",
      labelAt: { x: 776, y: 190 },
    },
  ];

  return { nodes, edges };
}
