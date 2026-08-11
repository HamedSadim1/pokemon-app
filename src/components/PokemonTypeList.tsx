import type { Pokemon } from "../contexts/FavoritesContextDefinition";
import { getPokemonTypeClass } from "../utils/helpers";

interface PokemonTypeListProps {
  types?: Pokemon["types"];
  limit?: number;
}

const PokemonTypeList = ({ types, limit }: PokemonTypeListProps) => {
  const visibleTypes = types?.slice(0, limit) || [];
  if (!visibleTypes.length) return null;

  return (
    <div className="type-list mt-sm">
    {visibleTypes.map((type) => (
      <span
        key={type.type?.name}
        className={getPokemonTypeClass(type.type?.name)}
      >
        {type.type?.name}
      </span>
    ))}
    </div>
  );
};

export default PokemonTypeList;
