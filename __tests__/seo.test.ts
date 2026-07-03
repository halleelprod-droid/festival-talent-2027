import { describe, expect, it } from "vitest";

import { buildPageMetadata, siteName } from "@/lib/seo";

describe("buildPageMetadata", () => {
  it("normalizes a path without a leading slash into a canonical URL", () => {
    const metadata = buildPageMetadata({
      title: "Programme",
      description: "Le programme du festival",
      path: "programme",
    });

    expect(metadata.alternates?.canonical).toBe("/programme");
  });

  it("keeps a path that already has a leading slash unchanged", () => {
    const metadata = buildPageMetadata({
      title: "Tickets",
      description: "La billetterie",
      path: "/tickets",
    });

    expect(metadata.alternates?.canonical).toBe("/tickets");
  });

  it("includes the site name in the Open Graph alt text", () => {
    const metadata = buildPageMetadata({
      title: "Artistes",
      description: "Les artistes confirmés",
      path: "/artists",
    });

    const [image] = metadata.openGraph?.images as { alt: string }[];
    expect(image.alt).toBe(`${siteName} - Artistes`);
  });
});
