"use client";

import { Network, Maximize2 } from "lucide-react";
import { SchematicCanvas } from "@/components/schematic/schematic-canvas";
import { CableLegend } from "@/components/schematic/cable-legend";
import { schematicNodes, schematicEdges, schematicViewBox, cableLegend } from "@/data/ahnaf-setup";

export function AhnafSchematicCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container">
      <div className="flex items-center justify-between gap-4 border-b border-outline-variant p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Network size={20} className="text-primary" />
          <h3 className="font-bold">Skema Kabel Meja Ahnaf</h3>
        </div>
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-on-primary">
          LIVE
        </span>
      </div>

      <div className="relative bg-surface-container-lowest p-4 sm:p-8">
        <SchematicCanvas
          viewBox={schematicViewBox}
          nodes={schematicNodes}
          edges={schematicEdges}
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-outline-variant p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <CableLegend items={cableLegend} />
        <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
          <Maximize2 size={16} />
          Lihat penuh
        </button>
      </div>
    </div>
  );
}
