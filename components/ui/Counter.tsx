type CounterProps = {
  value: string;
  label: string;
  className?: string;
};

export default function Counter({ value, label, className = "" }: CounterProps) {
  return (
    <div className={`rounded-lg border border-white/10 bg-white/[0.04] p-5 ${className}`}>
      <p className="text-3xl font-black uppercase text-white">{value}</p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>
    </div>
  );
}
