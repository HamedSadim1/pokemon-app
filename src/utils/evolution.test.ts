import { describe, expect, it } from "vitest";
import type {
  EvolutionDetail,
  EvolutionNode,
} from "@/components/Services/IPokemon";
import { getEvolutionPaths, getEvolutionRequirement } from "./evolution";

const makeNode = (
  name: string,
  evolvesTo: EvolutionNode[] = [],
  evolutionDetails?: EvolutionDetail[],
): EvolutionNode => ({
  species: { name, url: `https://pokeapi.co/api/v2/pokemon-species/${name}/` },
  evolves_to: evolvesTo,
  ...(evolutionDetails ? { evolution_details: evolutionDetails } : {}),
});

describe("getEvolutionPaths", () => {
  it("returns a single-node path for base forms", () => {
    const node = makeNode("charmander");
    expect(getEvolutionPaths(node)).toEqual([[node]]);
  });

  it("flattens a linear chain into one path", () => {
    const node = makeNode("charmander", [
      makeNode("charmeleon", [makeNode("charizard")]),
    ]);
    const paths = getEvolutionPaths(node);
    expect(paths).toHaveLength(1);
    expect(paths[0].map((entry) => entry.species.name)).toEqual([
      "charmander",
      "charmeleon",
      "charizard",
    ]);
  });

  it("produces one path per branching evolution", () => {
    const node = makeNode("eevee", [
      makeNode("vaporeon"),
      makeNode("jolteon"),
      makeNode("flareon"),
    ]);
    expect(getEvolutionPaths(node)).toHaveLength(3);
  });

  it("guards against cycles", () => {
    const node = makeNode("ditto");
    node.evolves_to.push(node);
    expect(getEvolutionPaths(node)).toEqual([]);
  });
});

describe("getEvolutionRequirement", () => {
  it("falls back to the base form label", () => {
    expect(getEvolutionRequirement(makeNode("charmander"))).toBe("Base form");
  });

  it("formats level requirements", () => {
    const node = makeNode("charmeleon", [], [
      { min_level: 16, trigger: { name: "level-up", url: "https://pokeapi.co/api/v2/evolution-trigger/1/" } },
    ]);
    expect(getEvolutionRequirement(node)).toBe("Level 16");
  });

  it("humanizes item requirements", () => {
    const node = makeNode("raichu", [], [
      {
        item: { name: "thunder-stone", url: "https://pokeapi.co/api/v2/item/83/" },
        trigger: { name: "use-item", url: "https://pokeapi.co/api/v2/evolution-trigger/3/" },
      },
    ]);
    expect(getEvolutionRequirement(node)).toBe("thunder stone");
  });

  it("falls back to a special condition label", () => {
    const node = makeNode("milotic", [], [{ trigger: undefined }]);
    expect(getEvolutionRequirement(node)).toBe("Special condition");
  });
});
