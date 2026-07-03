import { Zap } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { MockDataBadge } from "@/components/ui/mock-data-badge";
import { getPowerSummary } from "@/data/power";
import { cn } from "@/lib/cn";

export function PowerOverviewCard() {
  const summary = getPowerSummary();
  const percent = Math.min(100, Math.round((summary.totalWatts / summary.capacityWatts) * 100));
  const isWarning = summary.totalWatts >= summary.warningWatts;

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(summary.monthlyCostRp);

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader>
          <Zap size={18} className="text-primary" />
          Beban Listrik Rumah
        </CardHeader>
        <MockDataBadge />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-end justify-between">
            <span
              className={cn(
                "font-mono text-3xl font-bold",
                isWarning ? "text-error" : "text-primary",
              )}
            >
              {summary.totalWatts} W
            </span>
            <span className="text-sm text-on-surface-variant">
              dari {summary.capacityWatts} W (2700VA)
            </span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isWarning ? "bg-error" : "bg-primary-container",
              )}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-on-surface-variant">
            Ambang peringatan {summary.warningWatts} W ·{" "}
            {isWarning ? (
              <span className="font-bold text-error">mendekati kapasitas puncak</span>
            ) : (
              "beban normal"
            )}
          </p>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface-container-high p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Estimasi Bulan Ini
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-on-surface">{summary.monthlyKwh} kWh</p>
          <p className="text-sm text-secondary">{rupiah}</p>
        </div>
      </div>
    </Card>
  );
}
