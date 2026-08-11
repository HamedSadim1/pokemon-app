import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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
  return <Navigate replace to={id ? `/pokemon/${id}` : "/pokemon"} />;
};

/**
 * Configureert TanStack Query client met optimale instellingen voor de Pokémon app.
 * - staleTime: 5 minuten - data blijft vers in cache
 * - gcTime: 10 minuten - cache wordt na 10 minuten geleegd
 * - retry: 2 - pogingen bij falende requests
 * - refetchOnWindowFocus: false - geen refetch bij window focus
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

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
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "pokemon",
          caseSensitive: true,
          element: <Pokemon />,
        },
        {
          path: "pokemon/:id",
          caseSensitive: true,
          element: <PokemonDetail />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "Pokemon",
          caseSensitive: true,
          element: <Navigate replace to="/pokemon" />,
        },
        {
          path: "Pokemon/:id",
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
