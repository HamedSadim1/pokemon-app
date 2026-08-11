import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`relative overflow-hidden ${
        theme === "dark"
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
      }`}
    >
      {/* Glassmorphism background overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-linear-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
              : "bg-linear-to-br from-blue-400/10 via-purple-500/10 to-pink-500/10"
          }`}
        ></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-black bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Pokédex
              </h3>
              <p
                className={`text-sm font-medium leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Your ultimate companion for exploring the fascinating world of
                Pokémon. Discover, learn, and catch 'em all!
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`text-sm hover:underline transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-yellow-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Pokemon"
                  className={`text-sm hover:underline transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-yellow-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Pokémon List
                </Link>
              </li>
              <li>
                <Link
                  to="/Favorites"
                  className={`text-sm hover:underline transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-yellow-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Connect
            </h4>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50"
                    : "bg-white/50 border-gray-200/50 text-gray-700 hover:bg-white/70 hover:border-gray-300/50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-blue-900/30 border-blue-800/50 text-blue-300 hover:bg-blue-800/40 hover:border-blue-700/50"
                    : "bg-blue-100/50 border-blue-200/50 text-blue-700 hover:bg-blue-200/60 hover:border-blue-300/50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className={`text-sm font-medium mb-4 md:mb-0 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              &copy; 2025 Pokémon App by Hamed Sadim. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Made with ❤️ for Pokémon enthusiasts
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
