"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LogOut, Cpu, Search, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "./nav-items";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-outline-variant bg-surface-container lg:flex">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
            <Cpu size={20} />
          </div>
          <div>
            <h2 className="font-bold text-on-surface">Kontrakan Hub</h2>
            <p className="text-label-sm font-mono text-on-surface-variant">Ahnaf · Active Session</p>
          </div>
        </div>

        <div className="mb-6 flex items-center rounded-full border border-outline-variant bg-surface-container-high px-4 py-2">
          <Search size={16} className="text-on-surface-variant" />
          <input
            type="text"
            placeholder="Cari perangkat, kamar..."
            className="ml-2 w-full border-none bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-0"
          />
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-4 py-3 transition-transform active:scale-[0.98]",
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 border-t border-outline-variant p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Notifikasi"
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              aria-label="Pengaturan"
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Settings size={18} />
            </button>
            <ThemeToggle />
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-outline bg-secondary-container">
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-on-secondary-container">
              A
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-4 py-2 text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <HelpCircle size={18} />
            <span>Support</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-4 py-2 text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
