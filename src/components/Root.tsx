import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Root = () => {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="main-content">
        <Suspense fallback={<LoadingSpinner message="Loading Pokédex..." />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Root;
