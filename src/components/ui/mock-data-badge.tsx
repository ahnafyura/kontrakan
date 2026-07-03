import { PlugZap } from "lucide-react";

export function MockDataBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-high px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
      <PlugZap size={11} />
      Data simulasi · Belum tersambung MCP
    </span>
  );
}
