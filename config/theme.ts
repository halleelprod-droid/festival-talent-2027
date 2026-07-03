export const theme = {
  colors: {
    black: "#000000",
    surface: "#050505",
    gold: "#C9A84C",
    goldLight: "#F8D86A",
    red: "#B91C1C",
    white: "#FFFFFF",
  },
  radius: {
    card: "0.5rem",
    control: "999px",
  },
  typography: {
    display: "font-display uppercase leading-none tracking-tight",
    h1: "text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl",
    h2: "text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl",
    h3: "text-2xl font-black uppercase leading-tight",
    body: "text-base leading-8 text-white/65",
    caption: "text-xs font-black uppercase tracking-[0.22em]",
    badge: "text-[10px] font-black uppercase tracking-[0.18em]",
    cta: "text-xs font-black uppercase tracking-[0.2em]",
  },
  glow: {
    page: "bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]",
    red: "bg-[radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.16),transparent_30%)]",
  },
} as const;
