import type { SchematicNode, SchematicEdge } from "@/lib/schematic";
import type { CableType } from "@/lib/cable";

export type { SchematicNode, SchematicEdge };

export const schematicViewBox = "0 0 800 500";

export const schematicNodes: SchematicNode[] = [
  {
    id: "wall-lan",
    label: "LAN Wall Port",
    sublabel: "Drop dari Router Lt.1",
    icon: "lan",
    x: 140,
    y: 80,
    width: 160,
    height: 60,
  },
  {
    id: "wall-power",
    label: "Stop Kontak Meja",
    sublabel: "Jalur listrik kamar",
    icon: "power",
    x: 660,
    y: 80,
    width: 160,
    height: 60,
  },
  {
    id: "monitor",
    label: "Monitor Eksternal",
    sublabel: "144Hz",
    icon: "monitor",
    x: 400,
    y: 190,
    width: 240,
    height: 130,
  },
  {
    id: "dock",
    label: "USB-C Dock / Hub",
    sublabel: "RJ45 + HDMI + PD + USB-A",
    icon: "dock",
    x: 400,
    y: 320,
    width: 200,
    height: 70,
  },
  {
    id: "laptop",
    label: "Laptop Ahnaf",
    sublabel: "1 kabel USB-C ke dock",
    icon: "laptop",
    x: 190,
    y: 440,
    width: 190,
    height: 110,
  },
  {
    id: "peripherals",
    label: "Flashdisk / Mouse / Keyboard",
    sublabel: "USB-A via dock",
    icon: "peripherals",
    x: 610,
    y: 440,
    width: 190,
    height: 110,
  },
];

export const schematicEdges: SchematicEdge[] = [
  {
    id: "e-lan",
    from: "wall-lan",
    to: "dock",
    type: "lan",
    label: "RJ45 LAN",
    path: "M 140 110 V 320 H 300",
    labelAt: { x: 150, y: 218 },
  },
  {
    id: "e-power-dock",
    from: "wall-power",
    to: "dock",
    type: "power",
    label: "Adaptor PD (Dock)",
    path: "M 660 110 V 320 H 500",
    labelAt: { x: 560, y: 218 },
  },
  {
    id: "e-power-monitor",
    from: "wall-power",
    to: "monitor",
    type: "power",
    label: "Power Monitor",
    path: "M 580 80 H 550 V 190 H 520",
    labelAt: { x: 524, y: 108 },
  },
  {
    id: "e-dock-monitor",
    from: "dock",
    to: "monitor",
    type: "usb",
    label: "HDMI / DisplayPort",
    path: "M 400 285 V 255",
    labelAt: { x: 408, y: 273 },
  },
  {
    id: "e-dock-laptop",
    from: "dock",
    to: "laptop",
    type: "usb",
    label: "USB-C (All-in-One)",
    path: "M 350 355 V 370 H 190 V 385",
    labelAt: { x: 195, y: 362 },
  },
  {
    id: "e-dock-peripherals",
    from: "dock",
    to: "peripherals",
    type: "usb",
    label: "USB-A Hub",
    path: "M 450 355 V 370 H 610 V 385",
    labelAt: { x: 455, y: 362 },
  },
];

export const cableLegend: { type: CableType; label: string }[] = [
  { type: "lan", label: "LAN Routing" },
  { type: "power", label: "Power Supply" },
  { type: "usb", label: "Data & Video (USB-C / HDMI)" },
];

export const telemetry = [
  { id: "monitor-load", label: "Monitor Load", value: "144 Hz", detail: "Primary Display · Active" },
  { id: "laptop-power", label: "Laptop Power Draw", value: "65 W", detail: "PD 3.0 via dock · Stable" },
  { id: "peripheral-data", label: "Peripheral Data", value: "480 Mbps", detail: "USB-A bus · 3 devices" },
  { id: "lan-link", label: "LAN Uplink", value: "1 Gbps", detail: "RJ45 · Full duplex" },
];

export const deviceControls = [
  { id: "desk-lights", label: "Desk Lights", icon: "lightbulb", status: "ACTIVE", active: true },
  { id: "standby", label: "Standby Mode", icon: "power", status: "OFF", active: false },
  { id: "lan-uplink", label: "LAN Uplink", icon: "router", status: "STABLE", active: true },
  { id: "eco", label: "Eco-Throttling", icon: "leaf", status: "DISABLED", active: false },
];
