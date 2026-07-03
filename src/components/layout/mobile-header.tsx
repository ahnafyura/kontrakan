"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function MobileHeader({
  onMenuClick,
  mobileNavOpen,
}: {
  onMenuClick: () => void;
  mobileNavOpen: boolean;
}) {
  return (
    <header className="fixed top-0 z-40 flex h-14 w-full items-center justify-between border-b border-outline-variant bg-surface-container-highest px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link href="/" className="text-lg font-bold text-primary-container">
          Kontrakan Hub
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
}
