import type { Metadata } from "next";

import TicketAccountMockup from "@/components/tickets/TicketAccountMockup";
import TicketComparison from "@/components/tickets/TicketComparison";
import TicketFAQ from "@/components/tickets/TicketFAQ";
import TicketFutureArchitecture from "@/components/tickets/TicketFutureArchitecture";
import TicketHero from "@/components/tickets/TicketHero";
import TicketPassGrid from "@/components/tickets/TicketPassGrid";
import TicketPaymentReadiness from "@/components/tickets/TicketPaymentReadiness";
import TicketProcessStepper from "@/components/tickets/TicketProcessStepper";
import TicketVisualPreview from "@/components/tickets/TicketVisualPreview";
import {
  ticketAccountFeatures,
  ticketComparison,
  ticketFaq,
  ticketFutureCapabilities,
  ticketPasses,
  ticketPaymentMethods,
  ticketProcessSteps,
} from "@/data/tickets";
import { buildPageMetadata, siteUrl } from "@/lib/seo";
import { ticketingSafetyRules } from "@/lib/tickets/safety";

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent Tickets | Festival Talent 2027",
  description:
    "Reservez votre experience officielle Festival Talent 2027 : Pass Standard, Premium, VIP, Partenaire, Presse, Staff, Artiste et Backstage. Billetterie preparatoire sans paiement reel.",
  path: "/tickets",
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Festival Talent 2027",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2027-05-15",
    location: {
      "@type": "Place",
      name: "Casino de Paris",
      address: "Paris, France",
    },
    organizer: {
      "@type": "Organization",
      name: "Festival Talent",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/tickets`,
      availability: "https://schema.org/PreOrder",
      priceCurrency: "XOF",
      validFrom: "2026-07-05",
      description:
        "Billetterie preparatoire Festival Talent 2027. Aucun paiement reel n'est connecte.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Festival Talent",
    url: siteUrl,
    logo: `${siteUrl}/images/festival-talent-logo.webp`,
  },
];

export default function TicketsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,#000,rgba(10,8,2,0.98),#000)]" />

      <TicketHero />
      <TicketPassGrid passes={ticketPasses} />
      <TicketComparison features={ticketComparison} />
      <TicketProcessStepper steps={ticketProcessSteps} />
      <TicketPaymentReadiness methods={ticketPaymentMethods} />
      <TicketVisualPreview />
      <TicketAccountMockup features={ticketAccountFeatures} />
      <TicketFAQ items={ticketFaq} />
      <TicketFutureArchitecture capabilities={ticketFutureCapabilities} />

      <section className="relative px-6 pb-28 text-white sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl rounded-lg border border-red-500/25 bg-red-500/10 p-7 text-center backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-200">
            Garde-fous de securite
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase text-white">
            Billetterie non active
          </h2>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 text-left text-sm leading-7 text-white/68 sm:grid-cols-2">
            {ticketingSafetyRules.map((rule) => (
              <li
                key={rule}
                className="rounded-lg border border-white/10 bg-black/35 p-4"
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
