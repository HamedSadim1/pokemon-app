import React from "react";
import { UI_COPY } from "@/config";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = UI_COPY.loading.spinner,
}) => {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
      <div>
        <div className="loading-ring" aria-hidden="true" />
        <p className="loading-copy">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
