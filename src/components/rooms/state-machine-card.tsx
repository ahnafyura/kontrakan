import { Workflow, ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { deskStateMachine, type DeskTransition } from "@/data/ahnaf-setup";
import { cableDotClass, cableTextClass } from "@/lib/cable";

function TransitionRow({ transition }: { transition: DeskTransition }) {
  const dotClass = transition.lane === "power" ? cableDotClass.power : cableDotClass.lan;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-outline-variant/50 bg-surface-container-high px-3 py-2 text-xs">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      <span className="rounded-full bg-surface-container-lowest px-2 py-0.5 font-bold text-on-surface">
        {transition.from}
      </span>
      <ArrowRight size={12} className="shrink-0 text-on-surface-variant" />
      <span className="rounded-full bg-surface-container-lowest px-2 py-0.5 font-bold text-on-surface">
        {transition.to}
      </span>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-on-surface-variant">
        {transition.via}
      </span>
    </div>
  );
}

export function StateMachineCard() {
  const powerLane = deskStateMachine.filter((t) => t.lane === "power");
  const dataLane = deskStateMachine.filter((t) => t.lane === "data");

  return (
    <Card className="p-6">
      <CardHeader>
        <Workflow size={18} className="text-primary" />
        Koneksi Desk — State Machine
      </CardHeader>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <p className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${cableTextClass.power}`}>
            <span className={`h-2 w-2 rounded-full ${cableDotClass.power}`} />
            Power Lane
          </p>
          <div className="space-y-1.5">
            {powerLane.map((t) => (
              <TransitionRow key={t.id} transition={t} />
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${cableTextClass.lan}`}>
            <span className={`h-2 w-2 rounded-full ${cableDotClass.lan}`} />
            Data Lane
          </p>
          <div className="space-y-1.5">
            {dataLane.map((t) => (
              <TransitionRow key={t.id} transition={t} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
