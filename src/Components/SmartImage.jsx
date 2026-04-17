import React from "react";
import { cloudinaryOptimizeUrl } from "../utility/cloudinary";

function SmartImage({
  src,
  alt = "",
  width,
  height,
  crop,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  className,
  ...rest
}) {
  const finalSrc = cloudinaryOptimizeUrl(src, { width, height, crop });

  // Avoid passing undefined to the DOM where possible.
  const imgProps = {
    src: finalSrc,
    alt,
    loading,
    decoding,
    className,
    ...rest,
  };
  if (fetchPriority) imgProps.fetchPriority = fetchPriority;

  return <img {...imgProps} />;
}

export default SmartImage;

