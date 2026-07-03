import { Gauge, TriangleAlert } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { powerBudgetItems, stabilizerRecommendation } from "@/data/ahnaf-setup";

export function PowerBudgetCard() {
  const totalWatts = powerBudgetItems.reduce((sum, item) => sum + item.watts, 0);
  const minWattsAtEfficiency = Math.round(
    stabilizerRecommendation.minVA * stabilizerRecommendation.efficiency,
  );

  return (
    <Card className="p-6">
      <CardHeader>
        <Gauge size={18} className="text-primary" />
        Estimasi Beban Daya
      </CardHeader>

      <div className="mt-6 space-y-2">
        {powerBudgetItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container-high px-4 py-2 text-sm"
          >
            <span className="text-on-surface-variant">{item.label}</span>
            <span className="font-mono font-bold text-on-surface">{item.watts} W</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary-container/10 px-4 py-3">
          <span className="text-sm font-bold text-on-surface">Total Beban Puncak</span>
          <span className="font-mono text-lg font-bold text-primary">{totalWatts} W</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-outline/30 bg-tertiary-container/10 p-4">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-on-tertiary-container" />
        <p className="text-sm text-on-surface-variant">
          Extension cord menciptakan <span className="font-bold text-on-surface">bottleneck tunggal</span> di
          kapasitas stabilizer. Pastikan Power Stabilizer rating minimal{" "}
          <span className="font-bold text-on-surface">{stabilizerRecommendation.minVA}VA</span> (efisiensi{" "}
          {stabilizerRecommendation.efficiency * 100}% ≈ {minWattsAtEfficiency}W), idealnya{" "}
          <span className="font-bold text-on-surface">{stabilizerRecommendation.idealVA}VA</span> untuk headroom
          saat beban puncak (rendering / gaming berat).
        </p>
      </div>
    </Card>
  );
}
