import { Link } from "react-router-dom";
import Icon from "./Icon";
import { API_CONFIG, ICON_CONFIG, NAV_ITEMS, UI_COPY } from "../config";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <div>
          <div className="footer-brand">Pokédex / Field notes for trainers</div>
          <p className="footer-copy">Data provided by PokeAPI · Built for curious explorers.</p>
        </div>
        <nav className="footer-links" aria-label={UI_COPY.navigation.footerLabel}>
          {NAV_ITEMS.map(({ to, label }) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
          <a href={API_CONFIG.pokeApiWebsite} target="_blank" rel="noreferrer">
            PokeAPI <Icon name="arrow-up-right" size={ICON_CONFIG.sizes.inline} />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
