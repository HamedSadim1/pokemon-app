import type { Ability } from "./Services/IPokemon";
import DetailChips from "./DetailChips";
import DetailSection from "./DetailSection";
import { UI_COPY } from "@/config";

interface AbilitiesSectionProps {
  abilities: Ability[];
}

const AbilitiesSection = ({ abilities }: AbilitiesSectionProps) => (
  <DetailSection title="Abilities">
    <DetailChips
      items={abilities.flatMap((ability) =>
        ability.ability?.name
          ? [{ key: ability.ability.name, content: ability.ability.name }]
          : [],
      )}
      emptyLabel={UI_COPY.detail.emptyAbilities}
    />
  </DetailSection>
);

export default AbilitiesSection;
