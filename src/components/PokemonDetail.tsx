import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useTheme } from "../contexts/ThemeContext";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import LoadingSpinner from "./LoadingSpinner";

const PokemonDetail = () => {
  const { theme } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { id } = useParams();
  const pokemonId: number = id !== undefined ? parseInt(id) : 0;

  const { pokemon, loading, error } = usePokemonDetail(pokemonId);

  const handleFavorite = () => {
    if (isFavorite(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemon);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          theme === "dark"
            ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
            : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
        }`}
      >
        <LoadingSpinner theme={theme} message="Loading Pokémon details..." />
      </div>
    );
  }

  if (error || !pokemon.id) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-16 ${
          theme === "dark"
            ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
            : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h3
            className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Pokémon Not Found
          </h3>
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {error || "This Pokémon doesn't exist in our database."}
          </p>
          <Link
            to="/Pokemon"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                : "bg-black/10 border border-black/20 text-gray-800 hover:bg-black/20"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Pokémon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 pt-24 ${
        theme === "dark"
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/Pokemon"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                : "bg-black/10 border border-black/20 text-gray-800 hover:bg-black/20"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Pokémon
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {/* Pokemon Image Card */}
            <div
              className={`relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:rotate-1 group ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
                  : "bg-white/20 border-white/30 shadow-2xl shadow-black/10"
              }`}
            >
              {/* Animated background gradients */}
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400/10 via-pink-500/10 to-purple-600/10 animate-pulse"></div>
              <div className="absolute inset-0 bg-linear-to-tr from-blue-400/5 via-transparent to-green-400/5 animate-pulse animation-delay-1000"></div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60 animation-delay-500"></div>
                <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-70 animation-delay-1000"></div>
                <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce opacity-50 animation-delay-1500"></div>
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-80 animation-delay-2000"></div>
              </div>

              {/* Rotating border effect */}
              <div className="absolute inset-2 rounded-2xl border-2 border-transparent bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>

              <div className="relative text-center">
                {/* Enhanced image container */}
                <div className="relative w-72 h-72 mx-auto mb-6">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-400/30 via-pink-500/30 to-purple-600/30 blur-xl animate-pulse scale-110"></div>

                  {/* Middle ring with rotation */}
                  <div className="absolute inset-2 rounded-full border-4 border-transparent bg-linear-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 animate-spin-reverse opacity-70"></div>

                  {/* Inner container */}
                  <div className="relative w-full h-full rounded-full bg-linear-to-br from-yellow-400/30 via-pink-500/30 to-purple-600/30 flex items-center justify-center shadow-2xl">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>

                    {/* Pokemon image */}
                    <img
                      src={
                        pokemon.sprites?.other?.officialArtwork?.frontDefault ||
                        pokemon.sprites?.other?.home?.frontDefault ||
                        pokemon.sprites?.front_default
                      }
                      alt={pokemon.name}
                      className="relative w-56 h-56 object-contain drop-shadow-2xl filter brightness-110 contrast-110 saturate-110 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 image-rendering-crisp-edges"
                      style={{
                        imageRendering: "pixelated",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}
                      loading="lazy"
                    />

                    {/* Inner sparkle effects */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60 animation-delay-1000"></div>
                    <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping opacity-80 animation-delay-500"></div>
                  </div>
                </div>
                <h1
                  className={`text-4xl font-black mb-2 capitalize ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {pokemon.name}
                </h1>
                <p
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-yellow-400" : "text-blue-600"
                  }`}
                >
                  #{String(pokemon.id).padStart(3, "0")}
                </p>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border ${
                isFavorite(pokemonId)
                  ? "bg-red-500/80 border-red-400/50 text-white shadow-lg shadow-red-500/25"
                  : `backdrop-blur-sm border-white/20 ${
                      theme === "dark"
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-black/10 text-gray-800 hover:bg-black/20"
                    }`
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {isFavorite(pokemonId) ? "❤️" : "🤍"}{" "}
                {isFavorite(pokemonId) ? "Remove from" : "Add to"} Favorites
              </span>
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Types */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Types
              </h3>
              <div className="flex flex-wrap gap-3">
                {pokemon.types?.map((type) => (
                  <span
                    key={type.type?.name}
                    className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-blue-500/20 border-blue-400/30 text-blue-200"
                        : "bg-blue-500/30 border-blue-400/40 text-blue-800"
                    }`}
                  >
                    {type.type?.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Abilities
              </h3>
              <div className="flex flex-wrap gap-3">
                {pokemon.abilities?.map((ability) => (
                  <span
                    key={ability.ability?.name}
                    className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-green-500/20 border-green-400/30 text-green-200"
                        : "bg-green-500/30 border-green-400/40 text-green-800"
                    }`}
                  >
                    {ability.ability?.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Physical Stats */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Physical Characteristics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-yellow-400" : "text-blue-600"
                    }`}
                  >
                    {pokemon.height}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Height (dm)
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-yellow-400" : "text-blue-600"
                    }`}
                  >
                    {pokemon.weight}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Weight (hg)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Base Stats */}
        <div
          className={`mt-8 p-8 rounded-3xl backdrop-blur-xl border ${
            theme === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white/20 border-white/30"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Base Stats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pokemon.stats && pokemon.stats.length > 0 ? (
              pokemon.stats.map((stat) => (
                <div key={stat.stat?.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-semibold capitalize ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {stat.stat?.name}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        theme === "dark" ? "text-yellow-400" : "text-blue-600"
                      }`}
                    >
                      {stat.base_stat}
                    </span>
                  </div>
                  <div
                    className={`h-3 rounded-full overflow-hidden backdrop-blur-sm border ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-gray-600/30"
                        : "bg-gray-200/50 border-gray-300/30"
                    }`}
                  >
                    <div
                      className="h-full bg-linear-to-r from-yellow-400 to-pink-500 transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: `${Math.min(stat.base_stat || 0, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No stats available for this Pokémon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
