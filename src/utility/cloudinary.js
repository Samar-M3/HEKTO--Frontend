// Lightweight Cloudinary URL helper:
// - Adds `f_auto,q_auto,dpr_auto` so Cloudinary serves modern formats (webp/avif),
//   tuned quality, and correct pixel density.
// - Optionally adds width/height + crop to avoid downloading original huge images.
export function cloudinaryOptimizeUrl(
  src,
  { width, height, crop = "limit", quality = "auto", format = "auto" } = {}
) {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) return src;

  let url;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  const uploadMarker = "/upload/";
  const idx = url.pathname.indexOf(uploadMarker);
  if (idx === -1) return src;

  const before = url.pathname.slice(0, idx + uploadMarker.length);
  const after = url.pathname.slice(idx + uploadMarker.length).replace(/^\/+/, "");

  const firstSegment = after.split("/")[0] || "";
  const looksLikeTransform = /(?:^|,)(?:w|h|c|q|f|dpr|fl|ar)_/.test(firstSegment);

  const parts = [`f_${format}`, `q_${quality}`, "dpr_auto"];
  // If the URL already has a transform segment, we still inject ours,
  // but we avoid forcing width/height to reduce accidental cropping.
  if (!looksLikeTransform) {
    const w = Number(width);
    const h = Number(height);
    if (Number.isFinite(w) && w > 0) parts.push(`w_${Math.round(w)}`);
    if (Number.isFinite(h) && h > 0) parts.push(`h_${Math.round(h)}`);
    if (crop) parts.push(`c_${crop}`);
  }

  // Improves perceived load for JPEGs; safe for other formats too.
  parts.push("fl_progressive");

  const transform = parts.join(",");
  url.pathname = `${before}${transform}/${after}`;
  return url.toString();
}

