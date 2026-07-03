import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { shoppingChecklist } from "@/data/ahnaf-setup";

export function ShoppingChecklistCard() {
  const owned = shoppingChecklist.filter((item) => item.status === "owned");
  const needed = shoppingChecklist.filter((item) => item.status === "needed");

  return (
    <Card className="p-6">
      <CardHeader>
        <ShoppingCart size={18} className="text-primary" />
        Checklist Belanja
      </CardHeader>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            <CheckCircle2 size={14} className="text-primary" />
            Sudah Dibeli ({owned.length})
          </p>
          <ul className="space-y-1.5">
            {owned.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-outline-variant/50 bg-surface-container-high px-3 py-2 text-sm text-on-surface"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
            <ShoppingCart size={14} />
            Belum Dibeli ({needed.length})
          </p>
          <ul className="space-y-1.5">
            {needed.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-secondary/30 bg-secondary-container/10 px-3 py-2"
              >
                <p className="text-sm font-bold text-on-surface">{item.label}</p>
                {item.note && (
                  <p className="mt-0.5 text-xs text-on-surface-variant">{item.note}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
