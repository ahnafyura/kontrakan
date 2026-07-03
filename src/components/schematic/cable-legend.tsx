import { cableDotClass, type CableType } from "@/lib/cable";

export function CableLegend({
  items,
}: {
  items: { type: CableType; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {items.map((item) => (
        <div key={item.type} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${cableDotClass[item.type]}`} />
          <span className="text-label-sm font-mono text-on-surface-variant">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
