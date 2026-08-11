import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useFavorites, useTheme } from "../hooks";
import Icon from "./Icon";
import {
  ICON_CONFIG,
  KEYBOARD_CONFIG,
  NAV_ITEMS,
  RESPONSIVE_CONFIG,
  ROUTES,
  UI_COPY,
} from "../config";

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
    menuNavigationStarted.current = location.pathname !== ROUTES.home;
    closeMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > RESPONSIVE_CONFIG.mobileBreakpointPx) {
        menuNavigationStarted.current = false;
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_CONFIG.escapeKey) {
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
      window.innerWidth <= RESPONSIVE_CONFIG.mobileBreakpointPx &&
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
          <NavLink to={ROUTES.home} className="brand" onClick={handleBrandClick}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-wordmark">
              <strong>Pokédex</strong>
              <span>Explore the living index</span>
            </span>
          </NavLink>

          <nav className="nav-links desktop-nav" aria-label={UI_COPY.navigation.primaryLabel}>
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {to === ROUTES.favorites && <Icon name="heart" size={ICON_CONFIG.sizes.small} />}
                {label}
                {to === ROUTES.favorites && favorites.length > 0 && (
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
              aria-label={UI_COPY.navigation.switchThemeLabel(theme === "dark" ? "light" : "dark")}
              title={UI_COPY.navigation.switchThemeLabel(theme === "dark" ? "light" : "dark")}
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
              aria-label={menuOpen ? UI_COPY.navigation.closeMenuLabel : UI_COPY.navigation.openMenuLabel}
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
            aria-label={UI_COPY.navigation.mobileLabel}
            tabIndex={-1}
          >
            {NAV_ITEMS.map(({ to, label, end }) => (
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
                {to === ROUTES.favorites && <Icon name="heart" size={ICON_CONFIG.sizes.small} />}
                {label}
                {to === ROUTES.favorites && favorites.length > 0 && (
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
