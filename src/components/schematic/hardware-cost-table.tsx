import { Receipt } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";
import { hardwarePoints, hardwareGrandTotalRp, tierLabel } from "@/data/mcp-hardware";

const tierTextClass: Record<1 | 2 | 3, string> = {
  1: "text-primary",
  2: "text-secondary",
  3: "text-on-tertiary-container",
};

export function HardwareCostTable() {
  const grandTotal = hardwareGrandTotalRp();

  return (
    <Card className="p-6">
      <CardHeader>
        <Receipt size={18} className="text-primary" />
        Estimasi Biaya Hardware MCP
      </CardHeader>
      <p className="mt-3 max-w-3xl text-sm text-on-surface-variant">
        Harga satuan estimasi pasar Indonesia (lihat rentang harga lengkap di{" "}
        <code className="font-mono text-xs">planning.md</code>) — dipakai sebagai acuan anggaran,
        bukan harga final.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-outline-variant text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="w-10 py-3 pr-3">No</th>
              <th className="py-3 pr-3">Nama Hardware</th>
              <th className="py-3 pr-3">Kegunaan</th>
              <th className="py-3 pr-3">Konektivitas</th>
              <th className="py-3 pl-3 text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            {hardwarePoints.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-outline-variant/50 align-top last:border-b-0"
              >
                <td className="py-3 pr-3 font-mono text-on-surface-variant">{index + 1}</td>
                <td className="py-3 pr-3">
                  <p className="font-bold text-on-surface">{item.label}</p>
                  <p className="text-xs text-on-surface-variant">
                    {item.location} · Lt.{item.floor} ·{" "}
                    <span className={cn("font-medium", tierTextClass[item.tier])}>
                      {tierLabel[item.tier]}
                    </span>
                  </p>
                </td>
                <td className="py-3 pr-3 text-on-surface-variant">{item.purpose}</td>
                <td className="py-3 pr-3 font-mono text-xs uppercase text-on-surface-variant">
                  {item.connectivity === "wifi" ? `WiFi Lt.${item.floor}` : "LAN"}
                </td>
                <td className="py-3 pl-3 text-right font-mono font-bold text-on-surface">
                  {formatRupiah(item.priceRp)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-primary/40">
              <td colSpan={4} className="py-4 pr-3 text-right font-bold text-on-surface">
                Grand Total ({hardwarePoints.length} hardware)
              </td>
              <td className="py-4 pl-3 text-right font-mono text-lg font-bold text-primary">
                {formatRupiah(grandTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
