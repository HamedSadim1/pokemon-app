import { humanizeSlug } from "../utils";
import type { PokemonSpecies } from "./Services/IPokemon";
import DetailSection from "./DetailSection";
import { FORMAT_CONFIG } from "../config";

interface SpeciesProfileSectionProps {
  species: PokemonSpecies | null;
}

const SpeciesProfileSection = ({ species }: SpeciesProfileSectionProps) => (
  <DetailSection title="Species profile">
    <dl className="metadata-list">
      <div><dt>Generation</dt><dd>{species?.generation?.name ? `${FORMAT_CONFIG.generationPrefix}${species.generation.name.replace(FORMAT_CONFIG.generationSlugPrefix, "")}` : FORMAT_CONFIG.fallbackDash}</dd></div>
      <div><dt>Habitat</dt><dd>{humanizeSlug(species?.habitat?.name, FORMAT_CONFIG.fallbackUnknown)}</dd></div>
      <div><dt>Growth rate</dt><dd>{humanizeSlug(species?.growth_rate?.name)}</dd></div>
      <div><dt>Egg groups</dt><dd>{species?.egg_groups?.map((group) => humanizeSlug(group.name)).join(FORMAT_CONFIG.listSeparator) || FORMAT_CONFIG.fallbackDash}</dd></div>
    </dl>
  </DetailSection>
);

export default SpeciesProfileSection;
