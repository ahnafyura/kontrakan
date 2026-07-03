import type { Metadata } from "next";
import { Thermometer, Gauge, Timer, AlertTriangle } from "lucide-react";
import { AhnafSchematicCard } from "@/components/rooms/ahnaf-schematic-card";
import { TelemetryPanel } from "@/components/rooms/telemetry-panel";
import { DeviceControls } from "@/components/rooms/device-controls";
import { StatTile } from "@/components/ui/stat-tile";

export const metadata: Metadata = {
  title: "Setup Ahnaf - Kontrakan Hub",
};

export default function AhnafRoomPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-label-sm font-bold uppercase tracking-widest text-primary">
          Room Details · Lantai 1
        </span>
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-xl">
          Ahnaf Setup{" "}
          <span className="text-xl font-normal text-on-surface-variant">/ Desktop Monitoring</span>
        </h1>
        <p className="mt-2 max-w-2xl text-on-surface-variant">
          Pemetaan kabel meja kerja: LAN kabel dari router Lantai 1 ke dock, lalu dock membagi ke
          monitor, laptop, dan perintilan kecil (flashdisk, mouse, keyboard).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AhnafSchematicCard />
        </div>
        <div className="space-y-6 lg:col-span-4">
          <TelemetryPanel />
          <DeviceControls />
        </div>

        <div className="grid grid-cols-2 gap-6 lg:col-span-12 md:grid-cols-4">
          <StatTile icon={Thermometer} label="Ambient" value="24.5°C" />
          <StatTile icon={Gauge} label="Bandwidth" value="940 Mbps" accent="text-primary" />
          <StatTile icon={Timer} label="Uptime" value="18h 4m" />
          <StatTile icon={AlertTriangle} label="Anomalies" value="0 Active" accent="text-secondary" />
        </div>
      </div>
    </div>
  );
}
