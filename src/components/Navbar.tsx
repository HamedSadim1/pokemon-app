import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";
import Icon from "./Icon";

const navigation = [
  { to: "/", label: "Home", end: true },
  { to: "/pokemon", label: "Pokédex" },
  { to: "/favorites", label: "Favorites" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const wasMenuOpen = useRef(false);
  const menuNavigationStarted = useRef(false);

  const closeMenu = () => setMenuOpen(false);
  const handleBrandClick = () => {
    menuNavigationStarted.current = location.pathname !== "/";
    closeMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        menuNavigationStarted.current = false;
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        menuNavigationStarted.current = false;
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      menuNavigationStarted.current = false;
      mobileNavRef.current?.focus();
    } else if (
      wasMenuOpen.current &&
      window.innerWidth <= 768 &&
      !menuNavigationStarted.current
    ) {
      menuButtonRef.current?.focus();
      menuNavigationStarted.current = false;
    }

    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="page-container">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={handleBrandClick}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-wordmark">
              <strong>Pokédex</strong>
              <span>Explore the living index</span>
            </span>
          </NavLink>

          <nav className="nav-links desktop-nav" aria-label="Primary navigation">
            {navigation.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {to === "/favorites" && <Icon name="heart" size={16} />}
                {label}
                {to === "/favorites" && favorites.length > 0 && (
                  <span className="favorite-count">{favorites.length}</span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            ref={mobileNavRef}
            className="mobile-nav"
            aria-label="Mobile navigation"
            tabIndex={-1}
          >
            {navigation.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => {
                  menuNavigationStarted.current = location.pathname !== to;
                  closeMenu();
                }}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {to === "/favorites" && <Icon name="heart" size={16} />}
                {label}
                {to === "/favorites" && favorites.length > 0 && (
                  <span className="favorite-count">{favorites.length}</span>
                )}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
