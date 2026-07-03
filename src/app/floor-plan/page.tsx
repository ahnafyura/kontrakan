import type { Metadata } from "next";
import { FloorView } from "@/components/schematic/floor-view";
import { McpHardwareSection } from "@/components/schematic/mcp-hardware-section";
import { HardwareCostTable } from "@/components/schematic/hardware-cost-table";

export const metadata: Metadata = {
  title: "Denah & Jaringan - Kontrakan Hub",
};

export default function FloorPlanPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-label-sm font-bold uppercase tracking-widest text-primary">
          Network Topology
        </span>
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-xl">
          Denah &amp; Pemetaan Jaringan
        </h1>
        <p className="mt-2 max-w-2xl text-on-surface-variant">
          Lantai 1 (2 kamar) dan Lantai 2 (3 kamar), 1 langganan MyRepublic dengan 2 router terpisah
          per lantai yang tersambung lewat backbone LAN.
        </p>
      </div>

      <FloorView />

      <div className="mt-6">
        <McpHardwareSection />
      </div>

      <div className="mt-6">
        <HardwareCostTable />
      </div>
    </div>
  );
}
