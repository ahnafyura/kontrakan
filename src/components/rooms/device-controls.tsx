"use client";

import { useState } from "react";
import { SlidersHorizontal, Lightbulb, Power, Router, Leaf, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { deviceControls } from "@/data/ahnaf-setup";
import { Card, CardHeader } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  power: Power,
  router: Router,
  leaf: Leaf,
};

export function DeviceControls() {
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(deviceControls.map((d) => [d.id, d.active])),
  );

  return (
    <Card className="p-6">
      <CardHeader>
        <SlidersHorizontal size={18} className="text-primary" />
        Device Controls
      </CardHeader>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {deviceControls.map((device) => {
          const Icon = iconMap[device.icon];
          const isActive = active[device.id];
          return (
            <button
              key={device.id}
              type="button"
              onClick={() => setActive((prev) => ({ ...prev, [device.id]: !prev[device.id] }))}
              className={cn(
                "flex flex-col items-start gap-3 rounded-xl border p-4 text-left font-bold transition-transform active:scale-95",
                isActive
                  ? "border-transparent bg-primary-container text-on-primary-container"
                  : "border-outline-variant bg-surface-container-high text-on-surface-variant hover:border-primary",
              )}
            >
              <Icon size={22} />
              <div>
                <p className="text-[10px] opacity-80">{device.label.toUpperCase()}</p>
                <p className="text-sm">{device.status}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
