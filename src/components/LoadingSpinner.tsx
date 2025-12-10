import React from "react";

/**
 * Props interface voor de LoadingSpinner component
 */
interface LoadingSpinnerProps {
  /** Grootte van de spinner: "sm" (32px), "md" (64px), "lg" (96px) */
  size?: "sm" | "md" | "lg";
  /** Optioneel bericht om onder de spinner weer te geven */
  message?: string;
  /** Het huidige thema voor juiste kleuren */
  theme: "dark" | "light";
}

/**
 * Herbruikbare loading spinner component met dubbele ringen animatie.
 * Toont een geanimeerde spinner met optioneel bericht eronder.
 * Gebruikt Tailwind CSS voor styling en theme ondersteuning.
 *
 * Features:
 * - Drie grootte opties (sm, md, lg)
 * - Dubbele ring animatie met vertraging
 * - Theme ondersteuning voor kleuren
 * - Optioneel bericht
 *
 * @param props - De component props
 * @returns JSX element voor de loading spinner
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" message="Loading Pokémon..." theme="dark" />
 * ```
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "Loading...",
  theme,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-4 border-yellow-400 border-t-transparent ${sizeClasses[size]}`}
        ></div>
        <div
          className={`absolute inset-0 rounded-full border-4 border-pink-400 border-t-transparent animate-spin animation-delay-300 opacity-75 ${sizeClasses[size]}`}
        ></div>
      </div>
      {message && (
        <p
          className={`mt-4 text-lg font-medium ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
