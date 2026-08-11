import SearchBar from "./SearchBar";
import { FORMAT_CONFIG, SEARCH_CONFIG } from "../config";

interface CatalogToolbarProps {
  isSearching: boolean;
  hasSearchInput: boolean;
  foundCount: number;
  shownCount: number;
  totalCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchNeedsMoreCharacters: boolean;
}

const CatalogToolbar = ({
  isSearching,
  hasSearchInput,
  foundCount,
  shownCount,
  totalCount,
  searchTerm,
  onSearchChange,
  searchNeedsMoreCharacters,
}: CatalogToolbarProps) => (
  <div className="list-toolbar">
    <div className="toolbar-meta" aria-live="polite">
      {isSearching ? (
        <>
          Found <strong>{foundCount}</strong> matches
        </>
      ) : hasSearchInput ? (
        <>Keep typing to search the full Pokédex</>
      ) : (
        <>
          Showing <strong>{shownCount || 0}</strong> of{" "}
          <strong>{totalCount || FORMAT_CONFIG.fallbackDash}</strong> Pokémon
        </>
      )}
    </div>
    <div className="search-field">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search name or #number..."
      />
      {searchNeedsMoreCharacters && (
        <p className="search-hint">Type at least {SEARCH_CONFIG.minLength} characters to search.</p>
      )}
    </div>
  </div>
);

export default CatalogToolbar;
