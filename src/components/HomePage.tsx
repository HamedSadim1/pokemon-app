import { Link } from "react-router-dom";
import { getPokemonArtworkUrl, getPokemonSpriteUrl } from "../utils/helpers";

const heroArtwork = getPokemonArtworkUrl(25);

const HomePage = () => {
  return (
    <>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div>
            <span className="eyebrow">National dex / 001—1025</span>
            <h1 className="display-heading">
              Find your next <span className="highlight">favorite</span> Pokémon.
            </h1>
            <p className="hero-copy">
              A calm, fast Pokédex for curious trainers. Search the collection,
              learn the details, and keep the ones you want close.
            </p>
            <div className="hero-actions">
              <Link to="/Pokemon" className="button-primary">
                Explore the Pokédex <span aria-hidden="true">→</span>
              </Link>
              <Link to="/favorites" className="button-secondary">
                View favorites <span aria-hidden="true">♡</span>
              </Link>
            </div>
            <div className="hero-stats" aria-label="Pokédex highlights">
              <div className="hero-stat">
                <strong>1,025</strong>
                <span>Species to discover</span>
              </div>
              <div className="hero-stat">
                <strong>18</strong>
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
            <span className="hero-art-label">Featured today / #025</span>
            <img
              className="hero-art-image"
              src={heroArtwork}
              alt="Pikachu official artwork"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getPokemonSpriteUrl(25);
              }}
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
              <div className="feature-icon" aria-hidden="true">⌕</div>
              <h3>Search without friction</h3>
              <p>Find a Pokémon by name in a clean, focused list built for quick scanning.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">◈</div>
              <h3>Details that matter</h3>
              <p>See types, abilities, physical details, and base stats in one clear view.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">♡</div>
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
