import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Layers, Cpu } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/floor-plan", label: "Denah & Jaringan", icon: Layers },
  { href: "/rooms/ahnaf", label: "Setup Ahnaf", icon: Cpu },
];
