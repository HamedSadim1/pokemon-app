import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import {
  getPokemonArtworkUrl,
  getPokemonIdFromUrl,
  getPokemonSpriteUrl,
} from "../utils/helpers";
import { Result } from "./Services/IPokemon";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";

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
            <Icon name="heart" fill={favorite ? "currentColor" : "none"} size={16} />
          </button>
        </div>
      </div>
      <Link
        to={`/pokemon/${id}`}
        className="pokemon-card-main"
        aria-label={`View ${pokemon.name} details`}
      >
        <div className="pokemon-art-wrap">
          <ImageWithFallback
            key={catalogId}
            className="pokemon-art"
            src={getPokemonArtworkUrl(catalogId)}
            fallbackSrc={getPokemonSpriteUrl(catalogId)}
            alt=""
            loading="lazy"
          />
        </div>
        <div className="pokemon-card-content">
          <h3>{pokemon.name}</h3>
          <p>View Pokémon profile</p>
          <span className="card-arrow" aria-hidden="true">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default PokemonCard;
