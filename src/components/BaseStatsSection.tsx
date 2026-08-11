import { FORMAT_CONFIG, POKEMON_CONFIG, UI_COPY } from "../config";
import type { Stat } from "./Services/IPokemon";
import DetailChips from "./DetailChips";
import DetailSection from "./DetailSection";

interface BaseStatsSectionProps {
  stats: Stat[];
}

const BaseStatsSection = ({ stats }: BaseStatsSectionProps) => (
  <DetailSection title="Base stats" className="full-width">
    {stats.length ? stats.map((stat) => {
      const statValue = stat.base_stat ?? 0;
      const percentage = Math.min(
        (statValue / POKEMON_CONFIG.maxBaseStat) * FORMAT_CONFIG.percentMax,
        FORMAT_CONFIG.percentMax,
      );

      return (
        <div className="stat-row" key={stat.stat?.name}>
          <div className="stat-label"><span>{stat.stat?.name}</span><strong>{statValue}</strong></div>
          <div
            className="stat-track"
            role="progressbar"
            aria-label={`${stat.stat?.name || FORMAT_CONFIG.fallbackUnknown} base stat`}
            aria-valuenow={statValue}
            aria-valuemin={0}
            aria-valuemax={POKEMON_CONFIG.maxBaseStat}
            aria-valuetext={`${statValue} base points`}
          >
            <div className="stat-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      );
    }) : <DetailChips items={[]} emptyLabel={UI_COPY.detail.emptyStats} />}
  </DetailSection>
);

export default BaseStatsSection;
