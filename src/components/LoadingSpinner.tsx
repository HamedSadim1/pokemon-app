import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading Pokémon...",
}) => {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div>
        <div className="loading-ring" aria-hidden="true" />
        <p className="loading-copy">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
