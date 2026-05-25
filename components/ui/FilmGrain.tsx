'use client';

export default function FilmGrain() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-[2]
        opacity-[0.035]
        mix-blend-soft-light
      "
      style={{
        backgroundImage:
          `
            url("https://grainy-gradients.vercel.app/noise.svg")
          `
      }}
    />
  );
}