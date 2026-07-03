"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LogOut, Cpu } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-outline-variant bg-surface-container lg:flex">
      <div className="p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
            <Cpu size={20} />
          </div>
          <div>
            <h2 className="font-bold text-on-surface">Ahnaf Setup</h2>
            <p className="text-label-sm font-mono text-on-surface-variant">Active Session</p>
          </div>
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

      <div className="mt-auto space-y-4 border-t border-outline-variant p-6">
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
