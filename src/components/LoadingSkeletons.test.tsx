import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PokemonDetailSkeleton,
  PokemonListSkeleton,
  PokemonPageSkeleton,
} from "./LoadingSkeletons";

describe("loading skeletons", () => {
  it("reserves the catalog grid with twenty card-shaped placeholders", () => {
    const { container } = render(<PokemonListSkeleton />);

    expect(screen.getByRole("status", { name: "Loading Pokémon list" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(20);
    expect(container.querySelectorAll(".skeleton-pokemon-art")).toHaveLength(20);
    expect(container.querySelectorAll(".card-actions")).toHaveLength(20);
    expect(container.querySelectorAll(".skeleton-card-title")).toHaveLength(20);
    expect(container.querySelectorAll(".skeleton-card-copy")).toHaveLength(20);
    expect(container.querySelector(".pagination-skeleton")).toBeInTheDocument();
  });

  it("keeps the complete Pokédex page shell during initial loading", () => {
    const { container } = render(<PokemonPageSkeleton />);

    expect(screen.getByRole("status", { name: "Loading the Pokédex" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(container.querySelector(".pokemon-page-skeleton-heading")).toBeInTheDocument();
    expect(container.querySelector(".pokemon-toolbar-skeleton")).toBeInTheDocument();
    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(20);
    expect(container.querySelector(".pagination-skeleton")).toBeInTheDocument();
  });

  it("mirrors the detail hero and information sections", () => {
    const { container } = render(<PokemonDetailSkeleton />);

    expect(screen.getByRole("status", { name: "Loading Pokémon profile" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(container.querySelector(".detail-hero-skeleton")).toBeInTheDocument();
    expect(container.querySelector(".detail-art-skeleton")).toBeInTheDocument();
    expect(container.querySelectorAll(".detail-section-skeleton")).toHaveLength(6);
    expect(container.querySelectorAll(".skeleton-stat-row")).toHaveLength(6);
    expect(container.querySelectorAll(".skeleton-detail-description")).toHaveLength(4);
    expect(container.querySelectorAll(".skeleton-chip")).toHaveLength(20);
    expect(container.querySelectorAll(".evolution-viewport")).toHaveLength(1);
    expect(container.querySelectorAll(".evolution-paths")).toHaveLength(1);
    expect(container.querySelectorAll(".skeleton-evolution-list")).toHaveLength(1);
    expect(container.querySelectorAll(".evolution-swipe-hint")).toHaveLength(1);
  });
});
