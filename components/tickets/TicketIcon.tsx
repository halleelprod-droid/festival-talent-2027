import {
  Crown,
  Handshake,
  Lock,
  Mic2,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";

import type { TicketIconKey } from "@/types/tickets";

const iconByKey = {
  ticket: Ticket,
  sparkles: Sparkles,
  crown: Crown,
  handshake: Handshake,
  newspaper: Newspaper,
  shield: ShieldCheck,
  mic: Mic2,
  lock: Lock,
} satisfies Record<TicketIconKey, typeof Ticket>;

type TicketIconProps = {
  icon: TicketIconKey;
  className?: string;
  size?: number;
};

export default function TicketIcon({
  icon,
  className = "",
  size = 26,
}: TicketIconProps) {
  const Icon = iconByKey[icon];
  return <Icon aria-hidden="true" className={className} size={size} />;
}
