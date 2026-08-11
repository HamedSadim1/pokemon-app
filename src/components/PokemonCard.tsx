import { Link } from "react-router-dom";
import { useFavorites } from "../hooks";
import {
  formatDexNumber,
  getPokemonArtworkUrl,
  getIdFromUrl,
  getPokemonSpriteUrl,
} from "../utils";
import type { FavoritePokemon, Result } from "./Services/IPokemon";
import { ICON_CONFIG, POKEMON_CONFIG, ROUTES } from "../config";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";
import PokemonTypeList from "./PokemonTypeList";

export type CardPokemon = Result | FavoritePokemon;

type CatalogCardProps = {
  pokemon: Result;
  id: number;
  variant?: "catalog";
  action?: "favorite-toggle";
};

type FavoriteCardProps = {
  pokemon: FavoritePokemon;
  id: number;
  variant: "favorite";
  action?: "remove";
};

type PokemonCardProps = CatalogCardProps | FavoriteCardProps;

const PokemonCard = (props: PokemonCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const favorite = favorites.some((item) => item.id === props.id);
  const isFavoriteCard = props.variant === "favorite";
  const id = props.id;
  const action = props.action || (isFavoriteCard ? "remove" : "favorite-toggle");
  const catalogId = isFavoriteCard
    ? id
    : getIdFromUrl(props.pokemon.url, "pokemon") || id;

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id);
      return;
    }

    addFavorite({
      id,
      name: props.pokemon.name,
      sprites: { front_default: getPokemonSpriteUrl(catalogId) },
    });
  };

  return (
    <article className="pokemon-card">
      <div className="pokemon-card-top">
        <span className="pokemon-number">{formatDexNumber(id)}</span>
        {action === "favorite-toggle" && (
          <div className="card-actions">
            <button
              type="button"
              className={`card-favorite${favorite ? " is-favorite" : ""}`}
              onClick={toggleFavorite}
              aria-label={`${favorite ? "Remove" : "Add"} ${props.pokemon.name} ${favorite ? "from" : "to"} favorites`}
              aria-pressed={favorite}
            >
              <Icon name="heart" fill={favorite ? "currentColor" : "none"} size={ICON_CONFIG.sizes.small} />
            </button>
          </div>
        )}
      </div>
      <Link
        to={ROUTES.pokemonDetail(id)}
        className="pokemon-card-main"
        aria-label={`View ${props.pokemon.name} details`}
      >
        <div className="pokemon-art-wrap">
          <ImageWithFallback
            key={catalogId}
            className="pokemon-art"
            src={getPokemonArtworkUrl(catalogId)}
            fallbackSrc={
              isFavoriteCard
                ? props.pokemon.sprites?.front_default || getPokemonSpriteUrl(catalogId)
                : getPokemonSpriteUrl(catalogId)
            }
            alt=""
            loading="lazy"
          />
        </div>
        <div className="pokemon-card-content">
          <h3>{props.pokemon.name}</h3>
          {isFavoriteCard ? (
            <PokemonTypeList types={props.pokemon.types} limit={POKEMON_CONFIG.cardVisibleTypes} />
          ) : (
            <p>View Pokémon profile</p>
          )}
          <span className="card-arrow" aria-hidden="true">
            <Icon name="arrow-up-right" size={ICON_CONFIG.sizes.small} />
          </span>
        </div>
      </Link>
      {action === "remove" && (
        <button
          type="button"
          className="button-danger w-full mt-md"
          onClick={() => removeFavorite(id)}
          aria-label={`Remove ${props.pokemon.name} from favorites`}
        >
          Remove from favorites
        </button>
      )}
    </article>
  );
};

export default PokemonCard;
