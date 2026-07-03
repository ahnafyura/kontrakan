"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, Settings, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "./nav-items";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Topbar({
  onMenuClick,
  mobileNavOpen,
}: {
  onMenuClick: () => void;
  mobileNavOpen: boolean;
}) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface-container-highest px-4 md:px-margin-desktop">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface lg:hidden"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link href="/" className="text-headline-lg-mobile font-bold text-primary-container md:text-headline-lg">
          Kontrakan Hub
        </Link>
        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "cursor-pointer text-sm font-medium transition-colors duration-200 active:scale-95",
                  active
                    ? "border-b-2 border-primary text-primary"
                    : "text-on-surface-variant hover:text-primary-container",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden items-center rounded-full border border-outline-variant bg-surface-container px-4 py-2 sm:flex">
          <Search size={18} className="text-on-surface-variant" />
          <input
            type="text"
            placeholder="Cari perangkat, kamar..."
            className="ml-2 w-40 border-none bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="button"
          aria-label="Notifikasi"
          className="hidden h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary sm:flex"
        >
          <Bell size={20} />
        </button>
        <button
          type="button"
          aria-label="Pengaturan"
          className="hidden h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary sm:flex"
        >
          <Settings size={20} />
        </button>
        <ThemeToggle />
        <div className="h-8 w-8 overflow-hidden rounded-full border border-outline bg-secondary-container">
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-on-secondary-container">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
