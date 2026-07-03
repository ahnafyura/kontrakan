import { DoorOpen } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { MockDataBadge } from "@/components/ui/mock-data-badge";
import { rooms } from "@/data/network";
import { getRoomPower } from "@/data/power";
import { cn } from "@/lib/cn";

export function RoomPowerGrid() {
  const readings = getRoomPower();

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader>
          <DoorOpen size={18} className="text-primary" />
          Daya per Kamar
        </CardHeader>
        <MockDataBadge />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {rooms.map((room) => {
          const reading = readings.find((r) => r.roomId === room.id);
          const high = (reading?.watts ?? 0) >= 500;

          return (
            <div
              key={room.id}
              className="rounded-xl border border-outline-variant bg-surface-container-high p-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    high ? "bg-error" : "bg-primary-container",
                  )}
                />
                <span className="text-[10px] text-on-surface-variant">Lt.{room.floor}</span>
              </div>
              <p className="mt-2 truncate text-sm font-bold text-on-surface">{room.name}</p>
              <p className="font-mono text-lg font-bold text-primary">
                {reading ? `${reading.watts} W` : "—"}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
