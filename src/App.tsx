import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favorites from "./components/Favorites";
import HomePage from "./components/HomePage";
import Pokemon from "./components/Pokemon";
import PokemonDetail from "./components/PokemonDetail";
import Root from "./components/Root";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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
  console.log("App rendering");
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
          path: "/Pokemon",
          element: <Pokemon />,
        },
        {
          path: "/Pokemon/:id",
          element: <PokemonDetail />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
