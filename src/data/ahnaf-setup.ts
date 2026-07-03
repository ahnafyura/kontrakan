import type { SchematicNode, SchematicEdge } from "@/lib/schematic";
import type { CableType } from "@/lib/cable";

export type { SchematicNode, SchematicEdge };

export const schematicViewBox = "0 0 1000 580";

export const schematicNodes: SchematicNode[] = [
  {
    id: "wall-power",
    label: "Stop Kontak Dinding",
    sublabel: "AC 220V",
    icon: "power",
    x: 140,
    y: 60,
    width: 160,
    height: 56,
  },
  {
    id: "wall-lan",
    label: "LAN Wall Port",
    sublabel: "Drop dari Router Lt.1",
    icon: "lan",
    x: 860,
    y: 60,
    width: 160,
    height: 56,
  },
  {
    id: "stabilizer",
    label: "Power Stabilizer",
    sublabel: "≥500VA · ideal 1000VA",
    icon: "stabilizer",
    x: 140,
    y: 170,
    width: 180,
    height: 64,
  },
  {
    id: "laptop",
    label: "Laptop ROG",
    sublabel: "Hub utama data",
    icon: "laptop",
    x: 475,
    y: 190,
    width: 200,
    height: 110,
    highlight: true,
  },
  {
    id: "extension",
    label: "Extension Cord 6-Lubang",
    sublabel: "2500W · 5/6 slot terpakai",
    icon: "extension",
    x: 140,
    y: 300,
    width: 200,
    height: 70,
  },
  {
    id: "usbhub",
    label: "USB Hub 4-Port",
    sublabel: "Sentralisasi periferal",
    icon: "dock",
    x: 790,
    y: 300,
    width: 170,
    height: 64,
  },
  {
    id: "monitor",
    label: "Monitor 24\" FHD",
    sublabel: "HDMI 2.1",
    icon: "monitor",
    x: 475,
    y: 410,
    width: 220,
    height: 120,
  },
  {
    id: "keyboard",
    label: "Keyboard Mekanikal",
    sublabel: "USB-A",
    icon: "keyboard",
    x: 720,
    y: 430,
    width: 140,
    height: 80,
  },
  {
    id: "mouse",
    label: "Mouse",
    sublabel: "USB-A",
    icon: "mouse",
    x: 900,
    y: 430,
    width: 140,
    height: 80,
  },
];

export const schematicEdges: SchematicEdge[] = [
  {
    id: "e-power-stabilizer",
    from: "wall-power",
    to: "stabilizer",
    type: "power",
    label: "AC Schuko",
    path: "M 140 88 V 138",
    labelAt: { x: 140, y: 113 },
  },
  {
    id: "e-stabilizer-extension",
    from: "stabilizer",
    to: "extension",
    type: "power",
    label: "AC Stabil",
    path: "M 140 202 V 265",
    labelAt: { x: 140, y: 233 },
  },
  {
    id: "e-extension-laptop",
    from: "extension",
    to: "laptop",
    type: "power",
    label: "Adaptor Laptop (1/6)",
    path: "M 240 285 H 320 V 190 H 375",
    labelAt: { x: 300, y: 273 },
  },
  {
    id: "e-extension-monitor",
    from: "extension",
    to: "monitor",
    type: "power",
    label: "AC C13 (2/6)",
    path: "M 200 335 V 410 H 365",
    labelAt: { x: 240, y: 390 },
  },
  {
    id: "e-lan-laptop",
    from: "wall-lan",
    to: "laptop",
    type: "lan",
    label: "RJ45 LAN",
    path: "M 860 88 V 190 H 575",
    labelAt: { x: 780, y: 165 },
  },
  {
    id: "e-laptop-monitor",
    from: "laptop",
    to: "monitor",
    type: "usb",
    label: "HDMI 2.1",
    path: "M 475 245 V 350",
    labelAt: { x: 475, y: 298 },
  },
  {
    id: "e-laptop-usbhub",
    from: "laptop",
    to: "usbhub",
    type: "usb",
    label: "USB-C/A 3.2",
    path: "M 550 245 V 300 H 705",
    labelAt: { x: 610, y: 288 },
  },
  {
    id: "e-usbhub-keyboard",
    from: "usbhub",
    to: "keyboard",
    type: "usb",
    label: "USB-A",
    path: "M 750 332 V 360 H 720 V 390",
    labelAt: { x: 740, y: 348 },
  },
  {
    id: "e-usbhub-mouse",
    from: "usbhub",
    to: "mouse",
    type: "usb",
    label: "USB-A",
    path: "M 830 332 V 360 H 900 V 390",
    labelAt: { x: 860, y: 348 },
  },
];

export const cableLegend: { type: CableType; label: string }[] = [
  { type: "lan", label: "LAN Routing" },
  { type: "power", label: "Power Supply" },
  { type: "usb", label: "Data & Video (USB / HDMI)" },
];

export const telemetry = [
  { id: "monitor-load", label: "Monitor Load", value: "144 Hz", detail: "Primary Display · Active" },
  { id: "laptop-power", label: "Laptop Power Draw", value: "240 W", detail: "AC Adapter via Extension · Stable" },
  { id: "peripheral-data", label: "Peripheral Data", value: "480 Mbps", detail: "USB Hub · 2 devices" },
  { id: "lan-link", label: "LAN Uplink", value: "1 Gbps", detail: "RJ45 · Full duplex" },
];

export const deviceControls = [
  { id: "desk-lights", label: "Desk Lights", icon: "lightbulb", status: "ACTIVE", active: true },
  { id: "standby", label: "Standby Mode", icon: "power", status: "OFF", active: false },
  { id: "lan-uplink", label: "LAN Uplink", icon: "router", status: "STABLE", active: true },
  { id: "eco", label: "Eco-Throttling", icon: "leaf", status: "DISABLED", active: false },
];

// --- Power budget -----------------------------------------------------

export interface PowerBudgetItem {
  id: string;
  label: string;
  watts: number;
}

export const powerBudgetItems: PowerBudgetItem[] = [
  { id: "laptop", label: "Laptop ROG", watts: 240 },
  { id: "monitor", label: "Monitor 24\"", watts: 30 },
  { id: "lampu", label: "Lampu Meja", watts: 24 },
  { id: "ipad", label: "Charger iPad", watts: 30 },
  { id: "hp", label: "Charger HP (Mi 67W)", watts: 67 },
];

export const stabilizerRecommendation = {
  minVA: 500,
  idealVA: 1000,
  efficiency: 0.8,
};

// --- Shopping checklist -------------------------------------------------

export interface ChecklistItem {
  id: string;
  label: string;
  status: "owned" | "needed";
  note?: string;
}

export const shoppingChecklist: ChecklistItem[] = [
  { id: "laptop", label: "Laptop ASUS ROG", status: "owned" },
  { id: "monitor", label: "Monitor 24\" FHD", status: "owned" },
  { id: "ext-cord", label: "Extension Cord 6-Lubang (2500W)", status: "owned" },
  { id: "keyboard", label: "Keyboard Mekanikal", status: "owned" },
  { id: "mouse", label: "Mouse", status: "owned" },
  { id: "lampu", label: "Lampu Meja LED 24W", status: "owned" },
  { id: "ipad-charger", label: "Charger iPad", status: "owned" },
  { id: "hp-charger", label: "Charger HP (Mi 67W)", status: "owned" },
  {
    id: "stabilizer",
    label: "Power Stabilizer ≥500VA (ideal 1000VA)",
    status: "needed",
    note: "Verifikasi rating existing atau upgrade — bottleneck utama",
  },
  {
    id: "usb-hub",
    label: "USB Hub 4-Port",
    status: "needed",
    note: "Sentralisasi keyboard & mouse ke 1 port laptop",
  },
  {
    id: "hdmi-cable",
    label: "Kabel HDMI 2.1 (Howell 8K)",
    status: "needed",
    note: "Refresh rate / resolusi tinggi ke monitor",
  },
];

// --- Compact desk state machine -----------------------------------------

export interface DeskTransition {
  id: string;
  from: string;
  to: string;
  via: string;
  lane: "power" | "data";
}

export const deskStateMachine: DeskTransition[] = [
  { id: "t1", from: "Stop Kontak", to: "Stabilizer", via: "AC Schuko", lane: "power" },
  { id: "t2", from: "Stabilizer", to: "Extension 6-Slot", via: "AC Schuko", lane: "power" },
  { id: "t3", from: "Extension", to: "Laptop", via: "Adaptor AC", lane: "power" },
  { id: "t4", from: "Extension", to: "Monitor", via: "AC C13", lane: "power" },
  { id: "t5", from: "Extension", to: "Lampu Meja", via: "Adaptor AC", lane: "power" },
  { id: "t6", from: "Extension", to: "Charger iPad", via: "USB-C", lane: "power" },
  { id: "t7", from: "Extension", to: "Charger HP", via: "USB-A/C", lane: "power" },
  { id: "t8", from: "LAN Wall Port", to: "Laptop", via: "RJ45", lane: "data" },
  { id: "t9", from: "Laptop", to: "Monitor", via: "HDMI 2.1", lane: "data" },
  { id: "t10", from: "Laptop", to: "USB Hub", via: "USB-C/A 3.2", lane: "data" },
  { id: "t11", from: "USB Hub", to: "Keyboard", via: "USB-A", lane: "data" },
  { id: "t12", from: "USB Hub", to: "Mouse", via: "USB-A", lane: "data" },
];
