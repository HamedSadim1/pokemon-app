import { useEffect, useRef } from "react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Root = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      mainRef.current?.focus();
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main
        id="main-content"
        ref={mainRef}
        className="main-content"
        tabIndex={-1}
      >
        <Suspense fallback={<LoadingSpinner message="Loading Pokédex..." />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Root;
