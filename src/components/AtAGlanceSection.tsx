import type { PokemonSpecies } from "./Services/IPokemon";
import DetailSection from "./DetailSection";
import { FORMAT_CONFIG } from "../config";

interface AtAGlanceSectionProps {
  height: number;
  weight: number;
  species: PokemonSpecies | null;
}

const AtAGlanceSection = ({
  height,
  weight,
  species,
}: AtAGlanceSectionProps) => (
  <DetailSection title="At a glance">
    <dl className="measure-grid">
      <div className="measure"><dt>Height / dm</dt><dd>{height}</dd></div>
      <div className="measure"><dt>Weight / hg</dt><dd>{weight}</dd></div>
      <div className="measure"><dt>Capture rate</dt><dd>{species?.capture_rate ?? FORMAT_CONFIG.fallbackDash}</dd></div>
      <div className="measure"><dt>Base happiness</dt><dd>{species?.base_happiness ?? FORMAT_CONFIG.fallbackDash}</dd></div>
    </dl>
  </DetailSection>
);

export default AtAGlanceSection;
