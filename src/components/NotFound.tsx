import { Link } from "react-router-dom";
import { EmptyState } from "./FeedbackState";
import { ROUTES, UI_COPY } from "../config";

const NotFound = () => (
  <section className="not-found-page">
    <div className="page-container">
      <EmptyState
        icon="search"
        kicker="404 / Off the map"
        title="This route does not exist."
        headingLevel="h1"
        description="The page you requested is not part of this Pokédex. Return to the index and keep exploring."
        action={(
          <>
            <Link to={ROUTES.pokedex} className="button-primary">{UI_COPY.shared.openPokedex}</Link>
            <Link to={ROUTES.home} className="button-quiet">Back home</Link>
          </>
        )}
        actionClassName="not-found-actions"
      />
    </div>
  </section>
);

export default NotFound;
