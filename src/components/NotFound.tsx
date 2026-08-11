import { Link } from "react-router-dom";
import Icon from "./Icon";

const NotFound = () => (
  <section className="not-found-page">
    <div className="page-container">
      <div className="error-state" role="alert">
        <div className="empty-state-icon"><Icon name="search" size={24} /></div>
        <div className="page-kicker">404 / Off the map</div>
        <h1 className="page-title">This route does not exist.</h1>
        <p>
          The page you requested is not part of this Pokédex. Return to the
          index and keep exploring.
        </p>
        <div className="detail-actions not-found-actions">
          <Link to="/pokemon" className="button-primary">Open Pokédex</Link>
          <Link to="/" className="button-quiet">Back home</Link>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;
