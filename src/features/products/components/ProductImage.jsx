import { getProductImageUrl } from "@/utils/productImages";
import { useState } from "react";

export default function ProductImage({
  path,
  name,
  size = 48,
  className = "",
}) {
  const [hasError, setHasError] = useState(false);
  const url = getProductImageUrl(path);
  return (
    <div
      className={`bg-grey-50 shrink-0 overflow-hidden rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      {url && !hasError ? (
        <img
          key={url}
          src={url}
          alt={name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="text-grey-400 flex h-full w-full items-center justify-center">
          No image
        </div>
      )}
    </div>
  );
}
