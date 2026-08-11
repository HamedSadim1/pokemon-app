import axios from "axios";

export interface PokemonResult {
  count: number;
  next: null;
  previous?: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Species;
  version: Species;
}

export interface GenusEntry {
  genus: string;
  language: Species;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  base_happiness?: number;
  capture_rate?: number;
  gender_rate?: number;
  hatch_counter?: number;
  egg_groups?: Species[];
  evolution_chain?: { url: string };
  flavor_text_entries?: FlavorTextEntry[];
  genera?: GenusEntry[];
  generation?: Species;
  growth_rate?: Species;
  habitat?: Species | null;
  is_baby?: boolean;
  is_legendary?: boolean;
  is_mythical?: boolean;
}

export interface EvolutionDetail {
  min_level?: number | null;
  trigger?: Species;
  item?: Species | null;
}

export interface EvolutionNode {
  species: Species;
  evolves_to: EvolutionNode[];
  evolution_details?: EvolutionDetail[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}

export interface PokemonDex {
  abilities: Ability[];
  baseExperience: number;
  forms: Species[];
  gameIndices: GameIndex[];
  height: number;
  heldItems: HeldItem[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: Move[];
  name: string;
  order: number;
  pastTypes: unknown[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability?: Species;
  isHidden?: boolean;
  slot?: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  gameIndex?: number;
  version?: Species;
}

export interface HeldItem {
  item?: Species;
  versionDetails?: VersionDetail[];
}

export interface VersionDetail {
  rarity?: number;
  version?: Species;
}

export interface Move {
  move?: Species;
  versionGroupDetails?: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  levelLearnedAt?: number;
  moveLearnMethod?: Species;
  versionGroup?: Species;
}

export interface GenerationV {
  blackWhite?: Sprites;
}

export interface GenerationIv {
  diamondPearl?: Sprites;
  heartgoldSoulsilver?: Sprites;
  platinum?: Sprites;
}

export interface Versions {
  generationI?: GenerationI;
  generationIi?: GenerationIi;
  generationIii?: GenerationIii;
  generationIv?: GenerationIv;
  generationV?: GenerationV;
  generationVi?: { [key: string]: Home };
  generationVii?: GenerationVii;
  generationViii?: GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female?: null;
  back_shiny?: string;
  back_shinyFemale?: null;
  front_default?: string;
  front_female?: null;
  front_shiny?: string;
  front_shiny_Female?: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  redBlue?: RedBlue;
  yellow?: RedBlue;
}

export interface RedBlue {
  backDefault?: string;
  backGray?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontGray?: string;
  frontTransparent?: string;
}

export interface GenerationIi {
  crystal?: Crystal;
  gold?: Gold;
  silver?: Gold;
}

export interface Crystal {
  backDefault?: string;
  backShiny?: string;
  backShinyTransparent?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontShinyTransparent?: string;
  frontTransparent?: string;
}

export interface Gold {
  backDefault?: string;
  backShiny?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontTransparent?: string;
}

export interface GenerationIii {
  emerald?: Emerald;
  fireredLeafgreen?: Gold;
  rubySapphire?: Gold;
}

export interface Emerald {
  frontDefault?: string;
  frontShiny?: string;
}

export interface Home {
  frontDefault?: string;
  frontFemale?: null;
  frontShiny?: string;
  frontShinyFemale?: null;
}

export interface GenerationVii {
  icons?: DreamWorld;
  ultraSunUltraMoon?: Home;
}

export interface DreamWorld {
  frontDefault?: string;
  frontFemale?: null;
}

export interface GenerationViii {
  icons?: DreamWorld;
}

export interface Other {
  dreamWorld?: DreamWorld;
  home?: Home;
  officialArtwork?: OfficialArtwork;
}

export interface OfficialArtwork {
  frontDefault?: string;
}

export interface Stat {
  base_stat?: number;
  effort?: number;
  stat?: Species;
}

export interface Type {
  slot?: number;
  type?: Species;
}

//! Pokemon

export const getPokemon = async (offset: number = 0, limit: number = 20) => {
  const response = await axios.get<PokemonResult>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const response = await axios.get<PokemonDex>(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  return response.data;
};

export const getPokemonById = async (id: number) => {
  const response = await axios.get<PokemonDex>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return response.data;
};

export const getPokemonSpecies = async (id: number) => {
  const response = await axios.get<PokemonSpecies>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data;
};

export const getEvolutionChain = async (url: string) => {
  const response = await axios.get<EvolutionChain>(url);
  return response.data;
};
