import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState, ErrorState } from "./FeedbackState";

describe("FeedbackState", () => {
  it("renders empty states without alert semantics", () => {
    render(
      <EmptyState
        icon="search"
        title="Nothing found"
        description="Try another search."
      />,
    );

    expect(screen.getByRole("heading", { name: "Nothing found" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders error states as alerts", () => {
    render(
      <ErrorState
        icon="warning"
        title="Request failed"
        description="Please try again."
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Request failed");
  });
});
