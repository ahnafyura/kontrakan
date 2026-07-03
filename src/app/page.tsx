import Link from "next/link";
import { ArrowRight, Layers, Cpu, Router, Wifi, DoorOpen, Cable } from "lucide-react";
import { rooms, routers, isp, roomsByFloor } from "@/data/network";
import { StatTile } from "@/components/ui/stat-tile";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const lanDropCount = rooms.filter((r) => r.lanDrop).length;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-label-sm font-bold uppercase tracking-widest text-primary">
            Workspace Monitoring
          </span>
          <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-xl">
            Command Center
          </h1>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container p-4">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          <span className="font-medium">
            {routers.length} router online · {rooms.length} kamar terpetakan
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/floor-plan"
          className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/20 text-primary-container">
              <Layers size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-primary"
            />
          </div>
          <h2 className="mt-4 text-lg font-bold text-on-surface">Denah &amp; Jaringan</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Lantai 1 ({roomsByFloor(1).length} kamar) &amp; Lantai 2 ({roomsByFloor(2).length} kamar) ·{" "}
            {isp.provider}, {routers.length} router
          </p>
        </Link>

        <Link
          href="/rooms/ahnaf"
          className="group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container/20 text-secondary">
              <Cpu size={24} />
            </div>
            <ArrowRight
              size={20}
              className="text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-primary"
            />
          </div>
          <h2 className="mt-4 text-lg font-bold text-on-surface">Setup Ahnaf</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Skema kabel monitor, laptop &amp; perintilan kecil di meja kerja Lantai 1
          </p>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatTile icon={DoorOpen} label="Total Kamar" value={String(rooms.length)} />
        <StatTile icon={Router} label="Router" value={String(routers.length)} accent="text-primary" />
        <StatTile icon={Cable} label="LAN Drop" value={String(lanDropCount)} accent="text-secondary" />
        <StatTile icon={Wifi} label="ISP" value={isp.provider} />
      </div>

      <Card className="mt-6 p-6">
        <h3 className="font-bold text-on-surface">Catatan Instalasi</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-on-surface-variant">
          <li>
            1 langganan {isp.provider} di {isp.ontLocation}, dibagi ke 2 router (satu per lantai) via
            backbone LAN.
          </li>
          <li>Kabel LAN dari Router Lantai 1 ditarik khusus ke meja Ahnaf untuk koneksi wired laptop.</li>
          <li>Jalur listrik rumah masih 1 meteran bersama (2700VA), belum dipisah per-kamar/MCB.</li>
        </ul>
      </Card>
    </div>
  );
}
