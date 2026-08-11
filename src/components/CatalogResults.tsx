import type { Result } from "./Services/IPokemon";
import { EmptyState, ErrorState } from "./FeedbackState";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { UI_COPY } from "../config";

export interface CatalogCard {
  pokemon: Result;
  id: number;
}

interface CatalogResultsProps {
  isRefreshing: boolean;
  error: string;
  onRetry: () => void;
  showEmptyState: boolean;
  onClearSearch: () => void;
  cards: CatalogCard[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CatalogResults = ({
  isRefreshing,
  error,
  onRetry,
  showEmptyState,
  onClearSearch,
  cards,
  currentPage,
  totalPages,
  onPageChange,
}: CatalogResultsProps) => (
  <div className="pokemon-results-region">
    {isRefreshing && (
      <p className="query-refresh-status" role="status" aria-live="polite">
        Updating results...
      </p>
    )}

    {error && (
      <ErrorState
        icon="warning"
        title="We lost the signal."
        description={error}
        action={(
          <button
            type="button"
            className="button-secondary"
            onClick={() => void onRetry()}
          >
            {UI_COPY.shared.tryAgain}
          </button>
        )}
      />
    )}

    {showEmptyState && (
      <EmptyState
        icon="search"
        title="No Pokémon found."
        description="Try another name or number, or clear the search to browse again."
        action={(
          <button
            type="button"
            className="button-secondary"
            onClick={onClearSearch}
          >
            {UI_COPY.search.clearLabel}
          </button>
        )}
      />
    )}

    {!error && cards.length > 0 && (
      <>
        <div className="pokemon-grid">
          {cards.map(({ pokemon, id }) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} id={id} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </>
    )}
  </div>
);

export default CatalogResults;
