import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import {
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
} from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const getTypeClass = (type?: string) =>
  `type-pill type-${type?.toLowerCase() || "default"}`;

const PokemonDetail = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { id } = useParams();
  const pokemonId = Number.parseInt(id || "0", 10);
  const { pokemon, loading, error } = usePokemonDetail(pokemonId);

  if (loading) {
    return (
      <section className="detail-page">
        <div className="page-container">
          <LoadingSpinner message="Loading Pokémon profile..." />
        </div>
      </section>
    );
  }

  if (error || !pokemon.id) {
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

  const favorite = isFavorite(pokemonId);
  const artwork =
    pokemon.sprites?.other?.officialArtwork?.frontDefault ||
    pokemon.sprites?.other?.home?.frontDefault ||
    getPokemonArtworkUrl(pokemon.id);

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
            <div className="type-list">
              {pokemon.types?.map((type) => (
                <span key={type.type?.name} className={getTypeClass(type.type?.name)}>
                  {type.type?.name}
                </span>
              ))}
            </div>
            <p className="detail-description">
              Explore the profile of {pokemon.name}, from its core abilities to
              the stats that define its battle style.
            </p>
            <div className="detail-actions">
              <button
                type="button"
                className={favorite ? "button-danger" : "button-primary"}
                onClick={() =>
                  favorite ? removeFavorite(pokemonId) : addFavorite(pokemon)
                }
              >
                <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
                {favorite ? "Remove favorite" : "Save to favorites"}
              </button>
              <Link to="/Pokemon" className="button-quiet">
                Browse more
              </Link>
            </div>
          </div>
        </div>

        <div className="detail-sections">
          <section className="detail-section">
            <h2>At a glance</h2>
            <div className="measure-grid">
              <div className="measure">
                <strong>{pokemon.height}</strong>
                <span>Height / dm</span>
              </div>
              <div className="measure">
                <strong>{pokemon.weight}</strong>
                <span>Weight / hg</span>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h2>Abilities</h2>
            <div className="detail-list">
              {pokemon.abilities?.length ? (
                pokemon.abilities.map((ability) => (
                  <span className="detail-chip" key={ability.ability?.name}>
                    {ability.ability?.name}
                  </span>
                ))
              ) : (
                <span className="detail-chip">No abilities listed</span>
              )}
            </div>
          </section>

          <section className="detail-section full-width">
            <h2>Base stats</h2>
            {pokemon.stats?.length ? (
              pokemon.stats.map((stat) => (
                <div className="stat-row" key={stat.stat?.name}>
                  <div className="stat-label">
                    <span>{stat.stat?.name}</span>
                    <strong>{stat.base_stat}</strong>
                  </div>
                  <div className="stat-track">
                    <div
                      className="stat-fill"
                      style={{ width: `${Math.min(stat.base_stat || 0, 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <span className="detail-chip">No stats listed</span>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
