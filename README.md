# kontrakan

Command center untuk kontrakan: denah & pemetaan jaringan (2 router + 1 langganan MyRepublic,
Lantai 1 dengan 2 kamar dan Lantai 2 dengan 3 kamar) dengan visualisasi animasi jalur kabel LAN
dan listrik, plus halaman detail setup meja kerja Ahnaf (monitor, laptop, dock, dan perintilan
kecil seperti flashdisk/mouse/keyboard).

Dibangun dengan Next.js (App Router) + TypeScript + Tailwind CSS v4, mendukung light & dark mode.

## Getting Started

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Halaman

- `/` — Dashboard ringkasan
- `/floor-plan` — Denah & pemetaan jaringan per lantai
- `/rooms/ahnaf` — Skema kabel meja kerja Ahnaf

Data topologi jaringan ada di `src/data/network.ts` dan `src/data/floor-schematic.ts`; data skema
meja Ahnaf ada di `src/data/ahnaf-setup.ts` — ubah di sana untuk menyesuaikan nama kamar,
penghuni, atau pemetaan kabel.
