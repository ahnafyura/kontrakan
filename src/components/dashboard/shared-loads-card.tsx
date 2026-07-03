import { Plug } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { MockDataBadge } from "@/components/ui/mock-data-badge";
import { getSharedLoads } from "@/data/power";
import { cn } from "@/lib/cn";

export function SharedLoadsCard() {
  const loads = getSharedLoads();

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader>
          <Plug size={18} className="text-primary" />
          Beban Bersama
        </CardHeader>
        <MockDataBadge />
      </div>

      <div className="mt-6 space-y-2">
        {loads.map((load) => (
          <div
            key={load.id}
            className="flex items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container-high px-4 py-2.5 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  load.isOn ? "bg-primary-container" : "bg-outline-variant",
                )}
              />
              <span className="text-on-surface-variant">{load.label}</span>
            </div>
            <span className="font-mono font-bold text-on-surface">
              {load.isOn ? `${load.watts} W` : "Mati"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
