import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <div>
          <div className="footer-brand">Pokédex / Field notes for trainers</div>
          <p className="footer-copy">Data provided by PokeAPI · Built for curious explorers.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/Pokemon">Pokédex</Link>
          <Link to="/favorites">Favorites</Link>
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            PokeAPI ↗
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
