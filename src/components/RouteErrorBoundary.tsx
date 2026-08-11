import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import Icon from "./Icon";

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return "The page you requested could not be found.";
    }

    return error.statusText || "The page could not be loaded.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An unexpected error interrupted this page.";
};

const RouteErrorBoundary = () => {
  const error = useRouteError();

  return (
    <section className="not-found-page">
      <div className="page-container">
        <div className="error-state" role="alert">
          <div className="empty-state-icon">
            <Icon name="warning" size={24} />
          </div>
          <div className="page-kicker">Something went wrong</div>
          <h1 className="page-title">This page needs another try.</h1>
          <p>{getErrorMessage(error)}</p>
          <div className="detail-actions not-found-actions">
            <button
              type="button"
              className="button-primary"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
            <Link to="/pokemon" className="button-secondary">
              Open Pokédex
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteErrorBoundary;
