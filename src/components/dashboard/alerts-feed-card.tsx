import { AlertTriangle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { MockDataBadge } from "@/components/ui/mock-data-badge";
import { getRecentAlerts } from "@/data/power";
import { cn } from "@/lib/cn";

export function AlertsFeedCard() {
  const alerts = getRecentAlerts();

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader>
          <AlertTriangle size={18} className="text-primary" />
          Alert Terbaru
        </CardHeader>
        <MockDataBadge />
      </div>

      <div className="mt-6 space-y-2">
        {alerts.length === 0 && (
          <p className="text-sm text-on-surface-variant">Tidak ada alert.</p>
        )}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "rounded-lg border px-4 py-2.5 text-sm",
              alert.severity === "critical"
                ? "border-error/30 bg-error-container/10"
                : "border-outline-variant/50 bg-surface-container-high",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-on-surface">{alert.message}</p>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  alert.severity === "critical"
                    ? "bg-error text-on-error"
                    : "bg-tertiary-container/30 text-on-tertiary-container",
                )}
              >
                {alert.severity}
              </span>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">{alert.timestamp}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
