import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Crown } from "lucide-react";

import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its children as text", () => {
    render(<Badge>Festival Talent 2027</Badge>);

    expect(screen.getByText("Festival Talent 2027")).toBeInTheDocument();
  });

  it("renders the optional icon", () => {
    render(<Badge icon={Crown}>Battle All Style</Badge>);

    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
