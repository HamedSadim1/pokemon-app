import type { FavoritePokemon } from "./Services/IPokemon";
import { getPokemonTypeClass } from "../utils";

interface PokemonTypeListProps {
  types?: FavoritePokemon["types"];
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
