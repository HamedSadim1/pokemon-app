import { Link, useParams } from "react-router-dom";
import { useFavorites, usePokemonDetail } from "@/hooks";
import { PokemonDetailSkeleton } from "./LoadingSkeletons";
import { ErrorState } from "./FeedbackState";
import AbilitiesSection from "./AbilitiesSection";
import AtAGlanceSection from "./AtAGlanceSection";
import BaseStatsSection from "./BaseStatsSection";
import EvolutionPathsSection from "./EvolutionPathsSection";
import Icon from "./Icon";
import MovesSection from "./MovesSection";
import PokemonDetailHero from "./PokemonDetailHero";
import SpeciesProfileSection from "./SpeciesProfileSection";
import { ICON_CONFIG, POKEMON_CONFIG, ROUTES } from "@/config";

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
              <Link to={ROUTES.pokedex} className="button-secondary">
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
              <Link to={ROUTES.pokedex} className="button-secondary">
                Back to Pokédex
              </Link>
            )}
          />
        </div>
      </section>
    );
  }

  const favorite = isFavorite(pokemon.id);
  const moves = pokemon.moves?.slice(0, POKEMON_CONFIG.visibleMoves) || [];

  return (
    <section className="detail-page">
      <div className="page-container">
        <Link to={ROUTES.pokedex} className="detail-breadcrumb">
          <Icon name="arrow-left" size={ICON_CONFIG.sizes.small} /> Back to Pokédex
        </Link>

        <PokemonDetailHero
          pokemon={pokemon}
          species={species}
          favorite={favorite}
          onToggleFavorite={() =>
            favorite ? removeFavorite(pokemon.id) : addFavorite(pokemon)
          }
          speciesUnavailable={speciesUnavailable}
          evolutionUnavailable={evolutionUnavailable}
        />

        <div className="detail-sections">
          <AtAGlanceSection
            height={pokemon.height}
            weight={pokemon.weight}
            species={species}
          />
          <SpeciesProfileSection species={species} />
          <AbilitiesSection abilities={pokemon.abilities || []} />
          <MovesSection
            moves={moves}
            totalMoves={pokemon.moves?.length || 0}
          />
          <EvolutionPathsSection chain={evolution} />
          <BaseStatsSection stats={pokemon.stats || []} />
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
