"use client";

import { useState } from "react";
import { Wifi, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import { SchematicCanvas } from "./schematic-canvas";
import { CableLegend } from "./cable-legend";
import { floorSchematic, floorViewBox } from "@/data/floor-schematic";
import { routerByFloor, roomsByFloor, isp, type FloorId } from "@/data/network";

const legendItems = [
  { type: "lan" as const, label: "LAN / WiFi" },
  { type: "power" as const, label: "Jalur Listrik" },
];

export function FloorView() {
  const [floor, setFloor] = useState<FloorId>(1);
  const { nodes, edges } = floorSchematic(floor);
  const router = routerByFloor(floor);
  const rooms = roomsByFloor(floor);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-outline/30 bg-tertiary-container/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-on-tertiary-container" />
          <p className="text-sm text-on-surface-variant">
            Jalur listrik saat ini masih <span className="font-bold text-on-surface">1 meteran bersama</span>, belum
            dipisah per-kamar/MCB. Diagram di bawah menampilkan titik stop kontak yang sudah aktif per kamar, bukan
            jalur MCB terpisah.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-primary-container/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-container">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
              Schematic View
            </span>
            <span className="flex items-center gap-1 rounded-full border border-outline-variant px-3 py-1 text-xs font-mono text-on-surface-variant">
              <Wifi size={12} /> {isp.provider} · {isp.subscription}
            </span>
          </div>

          <div className="flex rounded-full border border-outline-variant bg-surface-container-high p-1">
            {[1, 2].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFloor(f as FloorId)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
                  floor === f
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                Lantai {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-surface-container-lowest p-4 sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, var(--color-primary-container, #00f0ff) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <SchematicCanvas
            viewBox={floorViewBox}
            nodes={nodes}
            edges={edges}
            className="relative h-auto w-full"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <CableLegend items={legendItems} />
          <div className="text-label-sm font-mono text-on-surface-variant">
            {router.name} · {rooms.length} kamar
          </div>
        </div>
      </div>
    </div>
  );
}
