import React from "react";
import Icon from "./Icon";
import { ICON_CONFIG, UI_COPY } from "@/config";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search Pokémon...",
}) => {
  return (
    <div className="search-control">
      <span className="search-icon">
        <Icon name="search" />
      </span>
      <input
        id="pokemon-search"
        name="pokemon-search"
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search Pokémon"
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label={UI_COPY.search.clearLabel}
        >
          <Icon name="close" size={ICON_CONFIG.sizes.small} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
