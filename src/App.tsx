import { QueryClientProvider } from "@tanstack/react-query";
import { createAppQueryClient } from "./query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/HomePage";
import Root from "./components/Root";
import NotFound from "./components/NotFound";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { FavoritesProvider, ThemeProvider } from "./contexts";
import { LEGACY_ROUTES, ROUTES } from "./config";

const Favorites = lazy(() => import("./components/Favorites"));
const Pokemon = lazy(() => import("./components/Pokemon"));
const PokemonDetail = lazy(() => import("./components/PokemonDetail"));
const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then(({ ReactQueryDevtools: Devtools }) => ({
    default: Devtools,
  }))
);

const LegacyPokemonRedirect = () => {
  const { id } = useParams();
  return <Navigate replace to={id ? ROUTES.pokemonDetail(id) : ROUTES.pokedex} />;
};

const queryClient = createAppQueryClient();

/**
 * Hoofdcomponent van de applicatie.
 * Configureert alle providers (Theme, Favorites, Query) en routing.
 * Bevat ook React Query DevTools voor development debugging.
 *
 * Provider volgorde (binnenste naar buitenste):
 * 1. QueryClientProvider - TanStack Query voor data fetching
 * 2. ThemeProvider - Dark/light theme context
 * 3. FavoritesProvider - Favorieten state management
 * 4. RouterProvider - React Router voor navigatie
 */
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: ROUTES.pokedex,
          caseSensitive: true,
          element: <Pokemon />,
        },
        {
          path: ROUTES.pokedexDetail,
          caseSensitive: true,
          element: <PokemonDetail />,
        },
        {
          path: ROUTES.favorites,
          element: <Favorites />,
        },
        {
          path: LEGACY_ROUTES.pokedex,
          caseSensitive: true,
          element: <Navigate replace to={ROUTES.pokedex} />,
        },
        {
          path: LEGACY_ROUTES.pokedexDetail,
          caseSensitive: true,
          element: <LegacyPokemonRedirect />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <div>
            <RouterProvider router={router} />
          </div>
        </FavoritesProvider>
      </ThemeProvider>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}

export default App;
