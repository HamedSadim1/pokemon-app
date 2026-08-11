import { Link } from "react-router-dom";
import {
  formatDexNumber,
  getEnglishText,
  getPokemonArtworkUrl,
  getPokemonSpriteUrl,
  getPokemonTypeClass,
} from "../utils";
import type { PokemonDex, PokemonSpecies } from "./Services/IPokemon";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";
import { ICON_CONFIG, ROUTES } from "../config";

interface PokemonDetailHeroProps {
  pokemon: PokemonDex;
  species: PokemonSpecies | null;
  favorite: boolean;
  onToggleFavorite: () => void;
  speciesUnavailable: boolean;
  evolutionUnavailable: boolean;
}

const PokemonDetailHero = ({
  pokemon,
  species,
  favorite,
  onToggleFavorite,
  speciesUnavailable,
  evolutionUnavailable,
}: PokemonDetailHeroProps) => {
  const artwork =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    getPokemonArtworkUrl(pokemon.id);
  const genus = getEnglishText(species?.genera)?.genus;
  const flavorText = getEnglishText(species?.flavor_text_entries)
    ?.flavor_text.replace(/[\n\f]/g, " ");
  const supplementalDataUnavailable = speciesUnavailable || evolutionUnavailable;

  return (
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
            onClick={onToggleFavorite}
          >
            <Icon name="heart" fill={favorite ? "currentColor" : "none"} size={ICON_CONFIG.sizes.button} />
            {favorite ? "Remove favorite" : "Save to favorites"}
          </button>
          <Link to={ROUTES.pokedex} className="button-quiet">Browse more</Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailHero;
