"use client";

import Link from "next/link";
import {
  Cable,
  Zap,
  Monitor,
  Laptop,
  Usb,
  HardDrive,
  Satellite,
  Router as RouterIcon,
  PanelTop,
  DoorOpen,
  ArrowUpFromLine,
  ArrowDownFromLine,
  BatteryCharging,
  PlugZap,
  Keyboard as KeyboardIcon,
  MousePointer2,
  type LucideIcon,
} from "lucide-react";
import { cableClassName, cableTextClass } from "@/lib/cable";
import type { SchematicIcon, SchematicNode, SchematicEdge } from "@/lib/schematic";

const iconRegistry: Record<SchematicIcon, LucideIcon> = {
  lan: Cable,
  power: Zap,
  monitor: Monitor,
  laptop: Laptop,
  dock: Usb,
  peripherals: HardDrive,
  ont: Satellite,
  router: RouterIcon,
  panel: PanelTop,
  room: DoorOpen,
  "riser-up": ArrowUpFromLine,
  "riser-down": ArrowDownFromLine,
  stabilizer: BatteryCharging,
  extension: PlugZap,
  keyboard: KeyboardIcon,
  mouse: MousePointer2,
};

function NodeBox({ node }: { node: SchematicNode }) {
  const Icon = iconRegistry[node.icon];
  const rectX = node.x - node.width / 2;
  const rectY = node.y - node.height / 2;

  const content = (
    <>
      <rect
        x={rectX}
        y={rectY}
        width={node.width}
        height={node.height}
        rx={14}
        className={
          node.highlight
            ? "fill-primary-container/10 stroke-primary-container"
            : "fill-surface-container-high stroke-outline-variant"
        }
        strokeWidth={node.highlight ? 2 : 1.5}
      />
      <foreignObject
        x={rectX}
        y={rectY}
        width={node.width}
        height={node.height}
        className="pointer-events-none overflow-visible"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center">
          <Icon
            size={node.height > 90 ? 26 : 18}
            className={node.highlight ? "text-primary-container" : "text-on-surface-variant"}
          />
          <p className="text-[11px] font-bold leading-tight text-on-surface sm:text-xs">
            {node.label}
          </p>
          {node.sublabel && (
            <p className="font-mono text-[9px] leading-tight text-on-surface-variant sm:text-[10px]">
              {node.sublabel}
            </p>
          )}
        </div>
      </foreignObject>
    </>
  );

  if (node.href) {
    return (
      <Link href={node.href} className="cursor-pointer">
        <g className="transition-opacity hover:opacity-80">{content}</g>
      </Link>
    );
  }

  return <g>{content}</g>;
}

function EdgeLine({ edge }: { edge: SchematicEdge }) {
  return (
    <g>
      <path d={edge.path} fill="none" stroke="var(--outline-variant)" strokeWidth={5} opacity={0.15} />
      <path
        d={edge.path}
        fill="none"
        strokeWidth={2.5}
        className={cableClassName[edge.type]}
        strokeLinecap="round"
      />
    </g>
  );
}

function EdgeLabel({ edge }: { edge: SchematicEdge }) {
  return (
    <foreignObject
      x={edge.labelAt.x - 90}
      y={edge.labelAt.y - 11}
      width={180}
      height={22}
      className="pointer-events-none overflow-visible"
    >
      <div className="flex justify-center">
        <p
          className={`truncate rounded-full bg-surface-container-lowest/90 px-2 py-0.5 text-center font-mono text-[9px] font-bold uppercase tracking-wide shadow-sm ring-1 ring-outline-variant/40 sm:text-[10px] ${cableTextClass[edge.type]}`}
        >
          {edge.label}
        </p>
      </div>
    </foreignObject>
  );
}

export function SchematicCanvas({
  viewBox,
  nodes,
  edges,
  className,
}: {
  viewBox: string;
  nodes: SchematicNode[];
  edges: SchematicEdge[];
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label="Diagram kabel">
      {edges.map((edge) => (
        <EdgeLine key={edge.id} edge={edge} />
      ))}
      {nodes.map((node) => (
        <NodeBox key={node.id} node={node} />
      ))}
      {edges.map((edge) => (
        <EdgeLabel key={`${edge.id}-label`} edge={edge} />
      ))}
    </svg>
  );
}
