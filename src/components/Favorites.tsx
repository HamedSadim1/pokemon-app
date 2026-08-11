import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { getPokemonArtworkUrl, getPokemonSpriteUrl } from "../utils/helpers";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";

const getTypeClass = (type?: string) =>
  `type-pill type-${type?.toLowerCase() || "default"}`;

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="favorites-page">
        <div className="page-container">
          <div className="empty-state">
            <div className="empty-state-icon"><Icon name="heart" size={24} /></div>
            <div className="page-kicker">Your collection</div>
            <h1 className="page-title">Nothing saved yet.</h1>
            <p>
              Keep the Pokémon that catch your eye close by saving them from a
              profile page.
            </p>
            <Link to="/pokemon" className="button-primary mt-lg">
              Start exploring <Icon name="arrow-right" size={17} />
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
              <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-top">
                <span className="pokemon-number">
                  #{String(pokemon.id).padStart(4, "0")}
                </span>
                <span className="card-arrow"><Icon name="arrow-up-right" size={16} /></span>
              </Link>
              <Link to={`/pokemon/${pokemon.id}`} className="pokemon-art-wrap">
                <ImageWithFallback
                  key={pokemon.id}
                  className="pokemon-art"
                  src={getPokemonArtworkUrl(pokemon.id)}
                  fallbackSrc={
                    pokemon.sprites?.front_default ||
                    getPokemonSpriteUrl(pokemon.id)
                  }
                  alt={`${pokemon.name} artwork`}
                  loading="lazy"
                />
              </Link>
              <div className="pokemon-card-content">
                <h3>{pokemon.name}</h3>
                <div className="type-list mt-sm">
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
                  className="button-danger w-full mt-md"
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
