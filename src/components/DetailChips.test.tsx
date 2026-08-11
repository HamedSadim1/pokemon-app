import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DetailChips from "./DetailChips";

describe("DetailChips", () => {
  it("renders chip content", () => {
    render(
      <DetailChips
        items={[{ key: "overgrow", content: "Overgrow" }]}
        emptyLabel="No abilities listed"
      />,
    );

    expect(screen.getByText("Overgrow")).toBeInTheDocument();
    expect(screen.getByText("Overgrow")).toHaveClass("detail-chip");
  });

  it("renders the empty fallback", () => {
    render(<DetailChips items={[]} emptyLabel="No moves listed" />);
    expect(screen.getByText("No moves listed")).toHaveClass("detail-chip");
  });
});
