import {
  Wrench,
  Zap,
  Wifi,
  Code,
  Paintbrush,
  Hammer,
  Droplets,
  Wind,
  Sparkles,
  Home,
  type LucideIcon,
} from "lucide-react";

const KEYWORD_MAP: Array<[RegExp, LucideIcon]> = [
  [/network|wifi|internet/i, Wifi],
  [/electric/i, Zap],
  [/plumb|water|pipe/i, Droplets],
  [/paint/i, Paintbrush],
  [/web|app|software|dev/i, Code],
  [/hvac|air|cool|heat/i, Wind],
  [/clean/i, Sparkles],
  [/carpentry|wood|build/i, Hammer],
  [/home|repair/i, Home],
];

export function getCategoryIcon(name: string): LucideIcon {
  for (const [pattern, Icon] of KEYWORD_MAP) {
    if (pattern.test(name)) return Icon;
  }
  return Wrench;
}
