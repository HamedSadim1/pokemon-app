import { Link } from "react-router-dom";
import {
  formatDexNumber,
  getEvolutionPaths,
  getEvolutionRequirement,
  getIdFromUrl,
  getPokemonSpriteUrl,
} from "@/utils";
import type { EvolutionChain } from "./Services/IPokemon";
import DetailChips from "./DetailChips";
import DetailSection from "./DetailSection";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";
import { ICON_CONFIG, ROUTES, UI_COPY } from "@/config";

const SECTION_TITLE = "Evolution paths";

interface EvolutionPathsSectionProps {
  chain: EvolutionChain | null;
}

const EvolutionPathsSection = ({ chain }: EvolutionPathsSectionProps) => {
  const paths = chain ? getEvolutionPaths(chain.chain) : [];

  return (
    <DetailSection title={SECTION_TITLE} className="full-width evolution-section">
      {paths.length ? (
        <div className="evolution-viewport">
          <div
            className="evolution-paths"
            role="region"
            aria-label={SECTION_TITLE}
            tabIndex={0}
          >
            {paths.map((path) => (
              <div
                className="evolution-list"
                key={path.map((node) => node.species.name).join("-")}
              >
                {path.map((node, index) => {
                  const evolutionId = getIdFromUrl(node.species.url, "pokemon-species");
                  if (!evolutionId) return null;

                  return (
                    <div className="evolution-step" key={node.species.name}>
                      {index > 0 && <span className="evolution-arrow"><Icon name="arrow-right" size={ICON_CONFIG.sizes.medium} /></span>}
                      <Link to={ROUTES.pokemonDetail(evolutionId)} className="evolution-card">
                        <ImageWithFallback
                          key={evolutionId}
                          src={getPokemonSpriteUrl(evolutionId)}
                          alt=""
                        />
                        <span className="evolution-number">{formatDexNumber(evolutionId)}</span>
                        <strong>{node.species.name}</strong>
                        <small>{getEvolutionRequirement(node)}</small>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="evolution-swipe-hint">{UI_COPY.shared.swipeHint}</p>
        </div>
      ) : (
        <DetailChips items={[]} emptyLabel={UI_COPY.detail.emptyEvolution} />
      )}
    </DetailSection>
  );
};

export default EvolutionPathsSection;
