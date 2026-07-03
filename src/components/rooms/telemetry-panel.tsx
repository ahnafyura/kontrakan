import { Activity } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { telemetry } from "@/data/ahnaf-setup";

export function TelemetryPanel() {
  return (
    <Card className="p-6">
      <CardHeader>
        <Activity size={18} className="text-primary" />
        System Telemetry
      </CardHeader>
      <div className="mt-6 space-y-3">
        {telemetry.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-outline-variant/50 bg-surface-container-high p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-on-surface-variant">
                {item.label}
              </span>
              <span className="font-mono text-lg font-bold text-primary">{item.value}</span>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
