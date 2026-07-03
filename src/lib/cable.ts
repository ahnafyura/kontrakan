export type CableType = "lan" | "power" | "usb";

export const cableClassName: Record<CableType, string> = {
  lan: "cable-lan",
  power: "cable-power",
  usb: "cable-usb",
};

export const cableDotClass: Record<CableType, string> = {
  lan: "bg-cable-lan",
  power: "bg-cable-power",
  usb: "bg-cable-usb",
};

export const cableTextClass: Record<CableType, string> = {
  lan: "text-cable-lan",
  power: "text-cable-power",
  usb: "text-cable-usb",
};
