import { Link } from "react-router-dom";
import { formatDexNumber, getPokemonArtworkUrl, getPokemonSpriteUrl } from "../utils";
import Icon from "./Icon";
import ImageWithFallback from "./ImageWithFallback";
import { usePokemonList } from "../hooks";
import { FORMAT_CONFIG, ICON_CONFIG, POKEMON_CONFIG, ROUTES, resolveTotalSpecies } from "../config";

const heroArtwork = getPokemonArtworkUrl(POKEMON_CONFIG.featuredPokemonId);

const HomePage = () => {
  // Live species-count uit de gedeelde list-query (gecachet met de Pokédex-pagina).
  const { pokemon } = usePokemonList(1, POKEMON_CONFIG.itemsPerPage);
  const totalSpecies = resolveTotalSpecies(pokemon.count);

  return (
    <>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div>
            <span className="eyebrow">National dex / 001—{totalSpecies}</span>
            <h1 className="display-heading">
              Find your next <span className="highlight">favorite</span> Pokémon.
            </h1>
            <p className="hero-copy">
              A calm, fast Pokédex for curious trainers. Search the collection,
              learn the details, and keep the ones you want close.
            </p>
            <div className="hero-actions">
              <Link to={ROUTES.pokedex} className="button-primary">
                Explore the Pokédex <Icon name="arrow-right" size={ICON_CONFIG.sizes.button} />
              </Link>
              <Link to={ROUTES.favorites} className="button-secondary">
                View favorites <Icon name="heart" size={ICON_CONFIG.sizes.button} />
              </Link>
            </div>
            <div className="hero-stats" aria-label="Pokédex highlights">
              <div className="hero-stat">
                <strong>{totalSpecies.toLocaleString("en-US")}</strong>
                <span>Species to discover</span>
              </div>
              <div className="hero-stat">
                <strong>{POKEMON_CONFIG.typeCount}</strong>
                <span>Type families</span>
              </div>
              <div className="hero-stat">
                <strong>∞</strong>
                <span>Ways to explore</span>
              </div>
            </div>
          </div>

          <div className="hero-art-panel" aria-label="Featured Pokémon artwork">
            <div className="hero-art-grid" aria-hidden="true" />
            {/* FORMAT_CONFIG.idWidth houdt de 3-cijferige hero-stijl aan, parallel aan de eyebrow ("001—1351"). */}
            <span className="hero-art-label">Featured today / {formatDexNumber(POKEMON_CONFIG.featuredPokemonId, FORMAT_CONFIG.idWidth)}</span>
            <ImageWithFallback
              key={heroArtwork}
              className="hero-art-image"
              src={heroArtwork}
              fallbackSrc={getPokemonSpriteUrl(POKEMON_CONFIG.featuredPokemonId)}
              alt="Pikachu official artwork"
            />
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Built for discovery</span>
              <h2>Everything trainers need, nothing in the way.</h2>
            </div>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon"><Icon name="search" /></div>
              <h3>Search without friction</h3>
              <p>Find a Pokémon by name in a clean, focused list built for quick scanning.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon"><Icon name="checkered" /></div>
              <h3>Details that matter</h3>
              <p>See types, abilities, physical details, and base stats in one clear view.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon"><Icon name="heart" /></div>
              <h3>Build your collection</h3>
              <p>Save favorites locally and return to the Pokémon you want to remember.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
