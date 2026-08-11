/**
 * Evolution chain traversal and requirement formatting.
 */

import type { EvolutionNode } from "../components/Services/IPokemon";
import { humanizeSlug } from "./format";

export const getEvolutionPaths = (
  node: EvolutionNode,
  visited = new Set<string>(),
): EvolutionNode[][] => {
  const nodeKey = `${node.species.name}:${node.species.url}`;
  if (visited.has(nodeKey)) return [];

  const nextVisited = new Set(visited).add(nodeKey);
  const validChildren = node.evolves_to.filter(
    (child) => child.species?.name && child.species?.url,
  );
  if (validChildren.length === 0) return [[node]];

  return validChildren.flatMap((child) =>
    getEvolutionPaths(child, nextVisited).map((path) => [node, ...path]),
  );
};

export const getEvolutionRequirement = (node: EvolutionNode): string => {
  const detail = node.evolution_details?.[0];
  if (!detail) return "Base form";
  if (detail.min_level) return `Level ${detail.min_level}`;
  if (detail.item?.name) return humanizeSlug(detail.item.name);
  return humanizeSlug(detail.trigger?.name, "Special condition");
};
