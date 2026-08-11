import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { theme } = useTheme();

  if (favorites.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center pt-24 relative overflow-hidden ${
          theme === "dark"
            ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
            : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto px-4">
          <div
            className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
                : "bg-white/20 border-white/30 shadow-2xl shadow-black/10"
            }`}
          >
            <div className="text-8xl mb-6 animate-bounce">💔</div>
            <h1
              className={`text-4xl font-black mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              No Favorites Yet
            </h1>
            <p
              className={`text-lg leading-relaxed mb-8 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Your heart is empty! Start collecting your favorite Pokémon and
              fill it with joy.
            </p>

            <Link
              to="/Pokemon"
              className="group relative inline-block px-8 py-4 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>🧭</span>
                Start Exploring
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 pt-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-block p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
                : "bg-white/20 border-white/30 shadow-2xl shadow-black/10"
            }`}
          >
            <h1
              className={`text-5xl font-black mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ❤️ My Favorites
            </h1>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {favorites.length} Pokémon in your collection
            </p>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((pokemon) => (
            <div
              key={pokemon.id}
              className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
                  : "bg-white/20 border-white/30 shadow-2xl shadow-black/10"
              }`}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400/0 via-pink-500/0 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6">
                <Link to={`/Pokemon/${pokemon.id}`} className="block">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-linear-to-br from-yellow-400/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm">
                      <img
                        src={pokemon.sprites?.front_default}
                        alt={pokemon.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <h3
                      className={`text-lg font-bold capitalize mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {pokemon.name}
                    </h3>
                    <p
                      className={`text-sm font-semibold ${
                        theme === "dark" ? "text-yellow-400" : "text-blue-600"
                      }`}
                    >
                      #{String(pokemon.id).padStart(3, "0")}
                    </p>
                  </div>
                </Link>

                {/* Types */}
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {pokemon.types?.slice(0, 2).map((type) => (
                    <span
                      key={type.type?.name}
                      className={`px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border ${
                        theme === "dark"
                          ? "bg-blue-500/20 border-blue-400/30 text-blue-200"
                          : "bg-blue-500/30 border-blue-400/40 text-blue-800"
                      }`}
                    >
                      {type.type?.name}
                    </span>
                  ))}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFavorite(pokemon.id)}
                  className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border ${
                    theme === "dark"
                      ? "bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30"
                      : "bg-red-500/30 border-red-400/40 text-red-800 hover:bg-red-500/40"
                  }`}
                >
                  Remove ❤️
                </button>
              </div>

              {/* Animated border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 via-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Back to Pokemon link */}
        <div className="text-center mt-12">
          <Link
            to="/Pokemon"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm border ${
              theme === "dark"
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-black/10 border-black/20 text-gray-800 hover:bg-black/20"
            }`}
          >
            <span>🔍</span>
            Browse More Pokémon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
