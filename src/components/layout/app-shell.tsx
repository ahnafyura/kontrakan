"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MobileHeader } from "./mobile-header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader
        onMenuClick={() => setMobileNavOpen((v) => !v)}
        mobileNavOpen={mobileNavOpen}
      />
      <Sidebar />
      <MobileNav
        key={pathname}
        open={mobileNavOpen}
        onNavigate={() => setMobileNavOpen(false)}
      />
      <main className="min-h-screen pt-14 lg:pl-64 lg:pt-0">
        <div className="mx-auto max-w-max-width p-gutter">{children}</div>
      </main>
    </div>
  );
}
