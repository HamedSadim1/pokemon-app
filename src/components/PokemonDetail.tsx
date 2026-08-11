import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import {
  formatDexNumber,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonTypeClass,
  humanizeSlug,
} from "../utils/helpers";
import { PokemonDetailSkeleton } from "./LoadingSkeletons";
import type { EvolutionNode, Stat } from "./Services/IPokemon";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";
import { ErrorState } from "./FeedbackState";
import DetailChips from "./DetailChips";

const getEvolutionPaths = (
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

const getEnglishText = <T extends { language: { name: string } }>(
  entries: T[] | undefined
): T | undefined => entries?.find((entry) => entry.language.name === "en");

const getEvolutionRequirement = (node: EvolutionNode) => {
  const detail = node.evolution_details?.[0];
  if (!detail) return "Base form";
  if (detail.min_level) return `Level ${detail.min_level}`;
  if (detail.item?.name) return humanizeSlug(detail.item.name);
  return humanizeSlug(detail.trigger?.name, "Special condition");
};

const getSpeciesId = (url: string) => {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
};

interface EvolutionPathsSectionProps {
  paths: EvolutionNode[][];
}

const EvolutionPathsSection = ({ paths }: EvolutionPathsSectionProps) => (
  <section className="detail-section full-width evolution-section">
    <h2>Evolution paths</h2>
    {paths.length ? (
      <div className="evolution-viewport">
        <div
          className="evolution-paths"
          role="region"
          aria-label="Evolution paths"
          tabIndex={0}
        >
          {paths.map((path) => (
            <div
              className="evolution-list"
              key={path.map((node) => node.species.name).join("-")}
            >
              {path.map((node, index) => {
              const evolutionId = getSpeciesId(node.species.url);
              if (!evolutionId) return null;

              return (
                <div className="evolution-step" key={node.species.name}>
                  {index > 0 && <span className="evolution-arrow"><Icon name="arrow-right" size={20} /></span>}
                  <Link to={`/pokemon/${evolutionId}`} className="evolution-card">
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
        <p className="evolution-swipe-hint">Swipe to view the full path</p>
      </div>
    ) : (
      <DetailChips items={[]} emptyLabel="No evolution path listed" />
    )}
  </section>
);

interface BaseStatsSectionProps {
  stats: Stat[];
}

const BaseStatsSection = ({ stats }: BaseStatsSectionProps) => (
  <section className="detail-section full-width">
    <h2>Base stats</h2>
    {stats.length ? stats.map((stat) => {
      const statValue = stat.base_stat ?? 0;
      const percentage = Math.min((statValue / 255) * 100, 100);

      return (
        <div className="stat-row" key={stat.stat?.name}>
          <div className="stat-label"><span>{stat.stat?.name}</span><strong>{statValue}</strong></div>
          <div
            className="stat-track"
            role="progressbar"
            aria-label={`${stat.stat?.name || "Unknown"} base stat`}
            aria-valuenow={statValue}
            aria-valuemin={0}
            aria-valuemax={255}
            aria-valuetext={`${statValue} base points`}
          >
            <div className="stat-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      );
    }) : <DetailChips items={[]} emptyLabel="No stats listed" />}
  </section>
);

const PokemonDetail = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { id } = useParams();
  const hasValidPokemonId = Boolean(id && /^[1-9]\d*$/.test(id));
  const pokemonId = hasValidPokemonId ? Number(id) : 0;
  const {
    pokemon,
    species,
    evolution,
    speciesUnavailable,
    evolutionUnavailable,
    loading,
    error,
  } = usePokemonDetail(pokemonId);

  if (!hasValidPokemonId) {
    return (
      <section className="detail-page">
        <div className="page-container">
          <ErrorState
            icon="warning"
            title="Invalid Pokémon number."
            headingLevel="h1"
            description="Use a positive National Dex number to open a profile."
            action={(
              <Link to="/pokemon" className="button-secondary">
                Back to Pokédex
              </Link>
            )}
          />
        </div>
      </section>
    );
  }

  if (loading) {
    return <PokemonDetailSkeleton />;
  }

  if (error || !pokemon) {
    return (
      <section className="detail-page">
        <div className="page-container">
          <ErrorState
            icon="warning"
            title="Profile unavailable."
            description={error || "This Pokémon could not be found."}
            action={(
              <Link to="/pokemon" className="button-secondary">
                Back to Pokédex
              </Link>
            )}
          />
        </div>
      </section>
    );
  }

  const favorite = isFavorite(pokemon.id);
  const artwork =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    getPokemonArtworkUrl(pokemon.id);
  const genus = getEnglishText(species?.genera)?.genus;
  const flavorText = getEnglishText(species?.flavor_text_entries)
    ?.flavor_text.replace(/[\n\f]/g, " ");
  const evolutionPaths = evolution ? getEvolutionPaths(evolution.chain) : [];
  const moves = pokemon.moves?.slice(0, 16) || [];
  const supplementalDataUnavailable = speciesUnavailable || evolutionUnavailable;

  return (
    <section className="detail-page">
      <div className="page-container">
        <Link to="/pokemon" className="detail-breadcrumb">
          <Icon name="arrow-left" size={16} /> Back to Pokédex
        </Link>

        <div className="detail-hero">
          <div className="detail-art">
            <ImageWithFallback
              key={artwork}
              src={artwork}
              fallbackSrc={
                pokemon.sprites?.front_default || getPokemonSpriteUrl(pokemon.id)
              }
              alt={`${pokemon.name} official artwork`}
            />
          </div>
          <div className="detail-info">
            <div className="detail-number">NATIONAL DEX {formatDexNumber(pokemon.id)}</div>
            <h1 className="detail-title">{pokemon.name}</h1>
            {genus && <p className="detail-genus">{genus}</p>}
            <div className="type-list">
              {pokemon.types?.map((type) => (
                <span key={type.type?.name} className={getPokemonTypeClass(type.type?.name)}>
                  {type.type?.name}
                </span>
              ))}
            </div>
            <p className="detail-description">
              {flavorText ||
                `Explore the profile of ${pokemon.name}, from its core abilities to the stats that define its battle style.`}
            </p>
            {supplementalDataUnavailable && (
              <p className="detail-notice" role="status">
                {speciesUnavailable && "Species information is temporarily unavailable."}
                {speciesUnavailable && evolutionUnavailable && " "}
                {evolutionUnavailable && "Evolution information is temporarily unavailable."}
              </p>
            )}
            <div className="detail-actions">
              <button
                type="button"
                className={favorite ? "button-danger" : "button-primary"}
                onClick={() =>
                  favorite ? removeFavorite(pokemon.id) : addFavorite(pokemon)
                }
              >
                <Icon name="heart" fill={favorite ? "currentColor" : "none"} size={17} />
                {favorite ? "Remove favorite" : "Save to favorites"}
              </button>
              <Link to="/pokemon" className="button-quiet">Browse more</Link>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <section className="detail-section">
            <h2>At a glance</h2>
            <dl className="measure-grid">
              <div className="measure"><dt>Height / dm</dt><dd>{pokemon.height}</dd></div>
              <div className="measure"><dt>Weight / hg</dt><dd>{pokemon.weight}</dd></div>
              <div className="measure"><dt>Capture rate</dt><dd>{species?.capture_rate ?? "—"}</dd></div>
              <div className="measure"><dt>Base happiness</dt><dd>{species?.base_happiness ?? "—"}</dd></div>
            </dl>
          </section>

          <section className="detail-section">
            <h2>Species profile</h2>
            <dl className="metadata-list">
              <div><dt>Generation</dt><dd>{species?.generation?.name ? `Gen ${species.generation.name.replace("generation-", "")}` : "—"}</dd></div>
              <div><dt>Habitat</dt><dd>{humanizeSlug(species?.habitat?.name, "Unknown")}</dd></div>
              <div><dt>Growth rate</dt><dd>{humanizeSlug(species?.growth_rate?.name)}</dd></div>
              <div><dt>Egg groups</dt><dd>{species?.egg_groups?.map((group) => humanizeSlug(group.name)).join(", ") || "—"}</dd></div>
            </dl>
          </section>

          <section className="detail-section">
            <h2>Abilities</h2>
            <DetailChips
              items={(pokemon.abilities || []).flatMap((ability) =>
                ability.ability?.name
                  ? [{ key: ability.ability.name, content: ability.ability.name }]
                  : [],
              )}
              emptyLabel="No abilities listed"
            />
          </section>

          <section className="detail-section">
            <h2>Known moves</h2>
            <DetailChips
              items={moves.flatMap((move) =>
                move.move?.name
                  ? [{ key: move.move.name, content: move.move.name }]
                  : [],
              )}
              emptyLabel="No moves listed"
            />
            {pokemon.moves && pokemon.moves.length > moves.length && (
              <p className="section-note">Showing {moves.length} of {pokemon.moves.length} moves.</p>
            )}
          </section>

          <EvolutionPathsSection paths={evolutionPaths} />
          <BaseStatsSection stats={pokemon.stats || []} />
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
