export type TimelineItem = {
  title: string;
  date: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-5">
      <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-yellow-400 via-white/15 to-transparent sm:block" />
      {items.map((item) => (
        <article key={`${item.date}-${item.title}`} className="relative rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:ml-10">
          <div className="absolute -left-[2.4rem] top-7 hidden h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.8)] sm:block" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            {item.date}
          </p>
          <h3 className="mt-3 text-2xl font-black uppercase text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/58">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
