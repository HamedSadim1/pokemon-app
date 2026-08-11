import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import {
  getPokemonArtworkUrl,
  getPokemonIdFromUrl,
  getPokemonSpriteUrl,
} from "../utils/helpers";
import { Result } from "./Services/IPokemon";

interface PokemonCardProps {
  pokemon: Result;
  id: number;
}

const PokemonCard = ({ pokemon, id }: PokemonCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const favorite = favorites.some((item) => item.id === id);
  const catalogId = getPokemonIdFromUrl(pokemon.url) || id;

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
      return;
    }

    addFavorite({
      id,
      name: pokemon.name,
      sprites: { front_default: getPokemonSpriteUrl(catalogId) },
    });
  };

  return (
    <article className="pokemon-card">
      <div className="pokemon-card-top">
        <span className="pokemon-number">#{String(id).padStart(4, "0")}</span>
        <div className="card-actions">
          <button
            type="button"
            className={`card-favorite${favorite ? " is-favorite" : ""}`}
            onClick={toggleFavorite}
            aria-label={`${favorite ? "Remove" : "Add"} ${pokemon.name} ${favorite ? "from" : "to"} favorites`}
            aria-pressed={favorite}
          >
            {favorite ? "♥" : "♡"}
          </button>
          <Link
            to={`/Pokemon/${id}`}
            className="card-arrow"
            aria-label={`View ${pokemon.name} details`}
          >
            ↗
          </Link>
        </div>
      </div>
      <Link to={`/Pokemon/${id}`} className="pokemon-art-wrap">
        <img
          className="pokemon-art"
          src={getPokemonArtworkUrl(catalogId)}
          alt={`${pokemon.name} artwork`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = getPokemonSpriteUrl(catalogId);
          }}
        />
      </Link>
      <div className="pokemon-card-content">
        <h3>{pokemon.name}</h3>
        <p>View Pokémon profile</p>
      </div>
    </article>
  );
};

export default PokemonCard;
