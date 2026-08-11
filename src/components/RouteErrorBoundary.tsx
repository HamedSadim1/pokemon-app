import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { ErrorState } from "./FeedbackState";

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
        <ErrorState
          icon="warning"
          kicker="Something went wrong"
          title="This page needs another try."
          headingLevel="h1"
          description={getErrorMessage(error)}
          action={(
            <>
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
            </>
          )}
          actionClassName="not-found-actions"
        />
      </div>
    </section>
  );
};

export default RouteErrorBoundary;
