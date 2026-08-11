import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import {
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
} from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import type { EvolutionNode, Stat } from "./Services/IPokemon";

const getTypeClass = (type?: string) =>
  `type-pill type-${type?.toLowerCase() || "default"}`;

const getEvolutionPaths = (node: EvolutionNode): EvolutionNode[][] => {
  if (node.evolves_to.length === 0) return [[node]];

  return node.evolves_to.flatMap((child) =>
    getEvolutionPaths(child).map((path) => [node, ...path])
  );
};

const getEnglishText = <T extends { language: { name: string } }>(
  entries: T[] | undefined
): T | undefined => entries?.find((entry) => entry.language.name === "en");

const getEvolutionRequirement = (node: EvolutionNode) => {
  const detail = node.evolution_details?.[0];
  if (!detail) return "Base form";
  if (detail.min_level) return `Level ${detail.min_level}`;
  if (detail.item?.name) return detail.item.name.replace(/-/g, " ");
  return detail.trigger?.name?.replace(/-/g, " ") || "Special condition";
};

const getSpeciesId = (url: string) => {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
};

interface EvolutionPathsSectionProps {
  paths: EvolutionNode[][];
}

const EvolutionPathsSection = ({ paths }: EvolutionPathsSectionProps) => (
  <section className="detail-section full-width">
    <h2>Evolution paths</h2>
    <div className="evolution-paths">
      {paths.map((path) => (
        <div className="evolution-list" key={path.map((node) => node.species.name).join("-")}>
          {path.map((node, index) => {
            const evolutionId = getSpeciesId(node.species.url);
            if (!evolutionId) return null;

            return (
              <div className="evolution-step" key={node.species.name}>
                {index > 0 && <span className="evolution-arrow" aria-hidden="true">→</span>}
                <Link to={`/Pokemon/${evolutionId}`} className="evolution-card">
                  <img src={getPokemonSpriteUrl(evolutionId)} alt="" />
                  <span className="evolution-number">#{String(evolutionId).padStart(4, "0")}</span>
                  <strong>{node.species.name}</strong>
                  <small>{getEvolutionRequirement(node)}</small>
                </Link>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </section>
);

interface BaseStatsSectionProps {
  stats: Stat[];
}

const BaseStatsSection = ({ stats }: BaseStatsSectionProps) => (
  <section className="detail-section full-width">
    <h2>Base stats</h2>
    {stats.length ? stats.map((stat) => (
      <div className="stat-row" key={stat.stat?.name}>
        <div className="stat-label"><span>{stat.stat?.name}</span><strong>{stat.base_stat}</strong></div>
        <div className="stat-track"><div className="stat-fill" style={{ width: `${Math.min(stat.base_stat || 0, 100)}%` }} /></div>
      </div>
    )) : <span className="detail-chip">No stats listed</span>}
  </section>
);

const PokemonDetail = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { id } = useParams();
  const pokemonId = id && /^\d+$/.test(id) ? Number(id) : 0;
  const { pokemon, species, evolution, loading, error } =
    usePokemonDetail(pokemonId);

  if (loading) {
    return (
      <section className="detail-page">
        <div className="page-container">
          <LoadingSpinner message="Loading Pokémon profile..." />
        </div>
      </section>
    );
  }

  if (error || !pokemon) {
    return (
      <section className="detail-page">
        <div className="page-container">
          <div className="error-state" role="alert">
            <div className="empty-state-icon" aria-hidden="true">!</div>
            <h2>Profile unavailable.</h2>
            <p>{error || "This Pokémon could not be found."}</p>
            <Link to="/Pokemon" className="button-secondary" style={{ marginTop: "1.25rem" }}>
              Back to Pokédex
            </Link>
          </div>
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

  return (
    <section className="detail-page">
      <div className="page-container">
        <Link to="/Pokemon" className="detail-breadcrumb">
          <span aria-hidden="true">←</span> Back to Pokédex
        </Link>

        <div className="detail-hero">
          <div className="detail-art">
            <img
              src={artwork}
              alt={`${pokemon.name} official artwork`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  pokemon.sprites?.front_default || getPokemonSpriteUrl(pokemon.id);
              }}
            />
          </div>
          <div className="detail-info">
            <div className="detail-number">NATIONAL DEX #{String(pokemon.id).padStart(4, "0")}</div>
            <h1 className="detail-title">{pokemon.name}</h1>
            {genus && <p className="detail-genus">{genus}</p>}
            <div className="type-list">
              {pokemon.types?.map((type) => (
                <span key={type.type?.name} className={getTypeClass(type.type?.name)}>
                  {type.type?.name}
                </span>
              ))}
            </div>
            <p className="detail-description">
              {flavorText ||
                `Explore the profile of ${pokemon.name}, from its core abilities to the stats that define its battle style.`}
            </p>
            <div className="detail-actions">
              <button
                type="button"
                className={favorite ? "button-danger" : "button-primary"}
                onClick={() =>
                  favorite ? removeFavorite(pokemon.id) : addFavorite(pokemon)
                }
              >
                <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
                {favorite ? "Remove favorite" : "Save to favorites"}
              </button>
              <Link to="/Pokemon" className="button-quiet">Browse more</Link>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <section className="detail-section">
            <h2>At a glance</h2>
            <div className="measure-grid">
              <div className="measure"><strong>{pokemon.height}</strong><span>Height / dm</span></div>
              <div className="measure"><strong>{pokemon.weight}</strong><span>Weight / hg</span></div>
              <div className="measure"><strong>{species?.capture_rate ?? "—"}</strong><span>Capture rate</span></div>
              <div className="measure"><strong>{species?.base_happiness ?? "—"}</strong><span>Base happiness</span></div>
            </div>
          </section>

          <section className="detail-section">
            <h2>Species profile</h2>
            <dl className="metadata-list">
              <div><dt>Generation</dt><dd>{species?.generation?.name?.replace("generation-", "Gen ") || "—"}</dd></div>
              <div><dt>Habitat</dt><dd>{species?.habitat?.name?.replace(/-/g, " ") || "Unknown"}</dd></div>
              <div><dt>Growth rate</dt><dd>{species?.growth_rate?.name?.replace(/-/g, " ") || "—"}</dd></div>
              <div><dt>Egg groups</dt><dd>{species?.egg_groups?.map((group) => group.name.replace(/-/g, " ")).join(", ") || "—"}</dd></div>
            </dl>
          </section>

          <section className="detail-section">
            <h2>Abilities</h2>
            <div className="detail-list">
              {pokemon.abilities?.length ? pokemon.abilities.map((ability) => (
                <span className="detail-chip" key={ability.ability?.name}>{ability.ability?.name}</span>
              )) : <span className="detail-chip">No abilities listed</span>}
            </div>
          </section>

          <section className="detail-section">
            <h2>Known moves</h2>
            <div className="detail-list">
              {moves.length ? moves.map((move) => (
                <span className="detail-chip" key={move.move?.name}>{move.move?.name}</span>
              )) : <span className="detail-chip">No moves listed</span>}
            </div>
            {pokemon.moves && pokemon.moves.length > moves.length && (
              <p className="section-note">Showing {moves.length} of {pokemon.moves.length} moves.</p>
            )}
          </section>

          {evolutionPaths.length > 0 && <EvolutionPathsSection paths={evolutionPaths} />}
          <BaseStatsSection stats={pokemon.stats || []} />
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
