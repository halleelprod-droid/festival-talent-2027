import type { TicketFaqItem } from "@/types/tickets";

type TicketFAQProps = {
  items: TicketFaqItem[];
};

export default function TicketFAQ({ items }: TicketFAQProps) {
  return (
    <section className="relative px-6 py-20 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            FAQ
          </p>
          <h2 className="font-display mt-5 text-4xl uppercase leading-tight sm:text-5xl">
            Questions essentielles
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <summary className="cursor-pointer list-none text-lg font-black uppercase text-white outline-none transition group-open:text-yellow-300">
                {item.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-white/62">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
