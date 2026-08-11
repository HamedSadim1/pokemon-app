import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { getPokemonArtworkUrl, getPokemonSpriteUrl } from "../utils/helpers";

const getTypeClass = (type?: string) =>
  `type-pill type-${type?.toLowerCase() || "default"}`;

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="favorites-page">
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">♡</div>
            <div className="page-kicker">Your collection</div>
            <h1 className="page-title">Nothing saved yet.</h1>
            <p>
              Keep the Pokémon that catch your eye close by saving them from a
              profile page.
            </p>
            <Link to="/Pokemon" className="button-primary" style={{ marginTop: "1.25rem" }}>
              Start exploring <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="page-container">
        <div className="section-heading">
          <div>
            <div className="page-kicker">Your collection</div>
            <h1 className="page-title">Favorites worth keeping.</h1>
            <p className="page-intro">
              Your personal shortlist, saved locally on this device.
            </p>
          </div>
          <span className="toolbar-meta">
            <strong>{favorites.length}</strong> saved
          </span>
        </div>

        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <article key={pokemon.id} className="pokemon-card">
              <Link to={`/Pokemon/${pokemon.id}`} className="pokemon-card-top">
                <span className="pokemon-number">
                  #{String(pokemon.id).padStart(4, "0")}
                </span>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link to={`/Pokemon/${pokemon.id}`} className="pokemon-art-wrap">
                <img
                  className="pokemon-art"
                  src={getPokemonArtworkUrl(pokemon.id)}
                  alt={`${pokemon.name} artwork`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      pokemon.sprites?.front_default ||
                      getPokemonSpriteUrl(pokemon.id);
                  }}
                />
              </Link>
              <div className="pokemon-card-content">
                <h3>{pokemon.name}</h3>
                <div className="type-list" style={{ marginTop: "0.6rem" }}>
                  {pokemon.types?.slice(0, 2).map((type) => (
                    <span
                      key={type.type?.name}
                      className={getTypeClass(type.type?.name)}
                    >
                      {type.type?.name}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="button-danger"
                  style={{ width: "100%", marginTop: "0.8rem" }}
                  onClick={() => removeFavorite(pokemon.id)}
                  aria-label={`Remove ${pokemon.name} from favorites`}
                >
                  Remove from favorites
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
