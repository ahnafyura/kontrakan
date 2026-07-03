import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function StatTile({
  icon: Icon,
  label,
  value,
  accent = "text-on-surface",
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-outline-variant bg-surface-container p-6 text-center",
        className,
      )}
    >
      <Icon size={20} className="text-secondary" />
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>
      <span className={cn("text-2xl font-bold", accent)}>{value}</span>
    </div>
  );
}
