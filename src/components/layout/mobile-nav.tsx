"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "./nav-items";

export function MobileNav({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-14 z-30 border-b border-outline-variant bg-surface-container p-4 lg:hidden">
      <div className="mb-3 flex items-center rounded-full border border-outline-variant bg-surface-container-high px-4 py-2">
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
              onClick={onNavigate}
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
  );
}
