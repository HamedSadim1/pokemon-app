import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${
        theme === "dark"
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 animate-fade-in-up">
            <span className="block bg-linear-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Welcome to
            </span>
            <span className="block bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              Pokédex
            </span>
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-400 to-pink-500 mx-auto rounded-full mb-8"></div>
        </div>

        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 font-light leading-relaxed animate-fade-in-up animation-delay-300 max-w-3xl mx-auto">
          Discover and explore the fascinating world of Pokémon.
          <span className="block mt-2 text-lg sm:text-xl text-yellow-200 font-medium">
            Catch 'em all! ✨
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
          <Link
            to="/Pokemon"
            className="group relative px-8 py-4 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Start Exploring</span>
            <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </Link>

          <Link
            to="/favorites"
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-white/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">❤️ View Favorites</span>
          </Link>
        </div>

        {/* Floating Pokémon icons */}
        <div className="absolute top-20 left-10 animate-bounce animation-delay-1000 opacity-20">
          <span className="text-4xl">⚡</span>
        </div>
        <div className="absolute top-32 right-16 animate-bounce animation-delay-2000 opacity-20">
          <span className="text-4xl">🔥</span>
        </div>
        <div className="absolute bottom-20 left-16 animate-bounce animation-delay-3000 opacity-20">
          <span className="text-4xl">💧</span>
        </div>
        <div className="absolute bottom-32 right-10 animate-bounce animation-delay-4000 opacity-20">
          <span className="text-4xl">🌿</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
