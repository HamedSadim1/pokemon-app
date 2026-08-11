import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import Icon from "./Icon";
import PokemonCard from "./PokemonCard";
import { EmptyState } from "./FeedbackState";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="favorites-page">
        <div className="page-container">
          <EmptyState
            icon="heart"
            kicker="Your collection"
            title="Nothing saved yet."
            headingLevel="h1"
            description="Keep the Pokémon that catch your eye close by saving them from a profile page."
            action={(
              <Link to="/pokemon" className="button-primary">
                Start exploring <Icon name="arrow-right" size={17} />
              </Link>
            )}
          />
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
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              id={pokemon.id}
              variant="favorite"
              action="remove"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
