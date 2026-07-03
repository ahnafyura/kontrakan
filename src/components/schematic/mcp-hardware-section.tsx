import {
  Server,
  Snowflake,
  Plug,
  Refrigerator,
  GlassWater,
  Droplets,
  Lightbulb,
  Radio,
  Wifi,
  Cable,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import {
  hardwarePoints,
  hardwareByFloor,
  tierLabel,
  type HardwareIcon,
  type HardwareTier,
} from "@/data/mcp-hardware";

const iconRegistry: Record<HardwareIcon, LucideIcon> = {
  ac: Snowflake,
  outlet: Plug,
  fridge: Refrigerator,
  dispenser: GlassWater,
  pump: Droplets,
  "corridor-light": Lightbulb,
  "router-plug": Radio,
  hub: Server,
};

const tierBadgeClass: Record<HardwareTier, string> = {
  1: "bg-primary-container/15 text-primary border-primary/30",
  2: "bg-secondary-container/15 text-secondary border-secondary/30",
  3: "bg-tertiary-container/20 text-on-tertiary-container border-tertiary/40",
};

function FloorHardwareGrid({ floor }: { floor: 1 | 2 }) {
  const points = hardwareByFloor(floor);

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-bold text-on-surface">
        Lantai {floor}
        <span className="text-xs font-normal text-on-surface-variant">
          {points.length} titik hardware
        </span>
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {points.map((point) => {
          const Icon = iconRegistry[point.icon];
          return (
            <div
              key={point.id}
              className="flex gap-3 rounded-xl border border-outline-variant bg-surface-container-high p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-lowest text-primary">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-on-surface">{point.label}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                      tierBadgeClass[point.tier],
                    )}
                  >
                    T{point.tier}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-on-surface-variant">{point.location}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-on-surface-variant">
                  {point.connectivity === "wifi" ? <Wifi size={11} /> : <Cable size={11} />}
                  {point.connectivity === "wifi" ? `WiFi Lt.${point.floor}` : "LAN"}
                </div>
                {point.note && (
                  <p className="mt-1 text-[11px] leading-snug text-on-surface-variant/80">
                    {point.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function McpHardwareSection() {
  const tierCounts = { 1: 0, 2: 0, 3: 0 } as Record<HardwareTier, number>;
  for (const point of hardwarePoints) tierCounts[point.tier] += 1;

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardHeader>
          <Server size={18} className="text-primary" />
          Titik Hardware MCP — Monitoring Listrik
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3] as HardwareTier[]).map((tier) => (
            <span
              key={tier}
              className={cn(
                "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide",
                tierBadgeClass[tier],
              )}
            >
              {tierLabel[tier]} ({tierCounts[tier]})
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-on-surface-variant">
        Setiap titik di bawah wajib ada supaya MCP bisa membaca arus listrik per stop kontak,
        di dalam maupun di luar kamar, di kedua lantai — {hardwarePoints.length} titik total
        (lihat detail belanja di <code className="font-mono text-xs">planning.md</code>).
      </p>

      <div className="mt-6 space-y-8">
        <FloorHardwareGrid floor={1} />
        <FloorHardwareGrid floor={2} />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-outline/30 bg-tertiary-container/10 p-4">
        <Cable size={18} className="mt-0.5 shrink-0 text-on-tertiary-container" />
        <p className="text-sm text-on-surface-variant">
          <span className="font-bold text-on-surface">Konektivitas:</span> semua smart plug/relay
          melapor lewat WiFi ke router lantainya masing-masing (Router Lt.1 atau Lt.2, lihat
          skema di atas) — pastikan sinyal menjangkau tiap titik sebelum pasang. Home Assistant
          Hub tersambung <span className="font-bold text-on-surface">kabel LAN langsung</span> ke
          Router Lt.1, bukan WiFi, supaya koneksi ke semua smart plug tetap stabil 24/7.
        </p>
      </div>
    </Card>
  );
}
