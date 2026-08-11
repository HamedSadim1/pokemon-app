import React from "react";
import Icon from "./Icon";

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
          aria-label="Clear search"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
