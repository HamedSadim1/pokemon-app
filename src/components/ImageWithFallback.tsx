import { useState } from "react";
import Icon from "./Icon";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  className = "",
  loading,
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <span
        className={`${className} image-fallback`.trim()}
        {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      >
        <Icon name="sparkle" size={28} />
      </span>
    );
  }

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading={loading}
      onError={() => {
        if (fallbackSrc && imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
          return;
        }
        setHasFailed(true);
      }}
    />
  );
};

export default ImageWithFallback;
