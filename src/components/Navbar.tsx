import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        theme === "dark"
          ? "bg-black/20 border-gray-700/50 shadow-2xl shadow-black/20"
          : "bg-white/10 border-white/20 shadow-2xl shadow-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="group relative text-2xl font-bold transition-all duration-300 hover:scale-105"
            >
              <span
                className={`bg-linear-to-r ${
                  theme === "dark"
                    ? "from-yellow-400 via-red-500 to-pink-500"
                    : "from-blue-600 via-purple-600 to-pink-600"
                } bg-clip-text text-transparent`}
              >
                Pokédex
              </span>
              <div
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r ${
                  theme === "dark"
                    ? "from-yellow-400 to-pink-500"
                    : "from-blue-600 to-pink-600"
                } transition-all duration-300 group-hover:w-full`}
              ></div>
            </NavLink>
          </div>
          <div className="flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive
                    ? `bg-linear-to-r ${
                        theme === "dark"
                          ? "from-yellow-400 to-pink-500"
                          : "from-blue-600 to-pink-600"
                      } text-white shadow-lg`
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Pokemon"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive
                    ? `bg-linear-to-r ${
                        theme === "dark"
                          ? "from-yellow-400 to-pink-500"
                          : "from-blue-600 to-pink-600"
                      } text-white shadow-lg`
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                }`
              }
            >
              Pokémon
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive
                    ? `bg-linear-to-r ${
                        theme === "dark"
                          ? "from-yellow-400 to-pink-500"
                          : "from-blue-600 to-pink-600"
                      } text-white shadow-lg`
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-black/5"
                }`
              }
            >
              ❤️ Favorites
            </NavLink>
            <button
              onClick={toggleTheme}
              className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                theme === "dark"
                  ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  : "text-gray-800 hover:text-gray-600 hover:bg-gray-800/10"
              }`}
            >
              <span className="text-lg transition-transform duration-300 group-hover:rotate-12">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  theme === "dark"
                    ? "bg-linear-to-r from-yellow-400/20 to-pink-500/20"
                    : "bg-linear-to-r from-blue-600/20 to-purple-600/20"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
