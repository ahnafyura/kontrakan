import type { CableType } from "@/lib/cable";

export type SchematicIcon =
  | "lan"
  | "power"
  | "monitor"
  | "laptop"
  | "dock"
  | "peripherals"
  | "ont"
  | "router"
  | "panel"
  | "room"
  | "riser-up"
  | "riser-down"
  | "stabilizer"
  | "extension"
  | "keyboard"
  | "mouse";

export interface SchematicNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: SchematicIcon;
  /** center x/y in the SVG viewBox */
  x: number;
  y: number;
  width: number;
  height: number;
  href?: string;
  highlight?: boolean;
}

export interface SchematicEdge {
  id: string;
  from: string;
  to: string;
  type: CableType;
  label: string;
  /** SVG path `d`, drawn manually for clean orthogonal routing */
  path: string;
  labelAt: { x: number; y: number };
}
