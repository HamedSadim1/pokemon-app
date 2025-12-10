import React from "react";
import { Link } from "react-router-dom";
import { Result } from "./Services/IPokemon";

/**
 * Props interface voor de PokemonCard component
 */
interface PokemonCardProps {
  /** De Pokémon data om weer te geven */
  pokemon: Result;
  /** Het ID van de Pokémon (voor routing en display) */
  id: number;
  /** Het huidige thema ("dark" of "light") */
  theme: "dark" | "light";
}

/**
 * Herbruikbare kaart component voor het weergeven van een Pokémon in een lijst.
 * Toont de Pokémon naam, ID en heeft hover effecten met glassmorphism styling.
 * Klikbaar om naar de detail pagina te navigeren.
 *
 * Features:
 * - Hover animaties en schaal effecten
 * - Glassmorphism achtergrond
 * - Theme ondersteuning (dark/light)
 * - Automatische navigatie naar detail pagina
 *
 * @param props - De component props
 * @returns JSX element voor een Pokémon kaart
 *
 * @example
 * ```tsx
 * <PokemonCard pokemon={pokemonData} id={25} theme="dark" />
 * ```
 */
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, id, theme }) => {
  return (
    <Link
      to={`/Pokemon/${id}`}
      className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 backdrop-blur-xl border ${
        theme === "dark"
          ? "bg-white/5 border-white/10"
          : "bg-white/20 border-white/30"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-r from-yellow-400/0 via-yellow-400/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-white">
            #{String(id).padStart(3, "0")}
          </span>
        </div>
        <h5
          className={`text-lg font-bold capitalize mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {pokemon.name}
        </h5>
        <div className="flex justify-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              theme === "dark"
                ? "bg-white/10 text-gray-300"
                : "bg-white/20 text-gray-700"
            }`}
          >
            Pokémon
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  );
};

export default PokemonCard;
