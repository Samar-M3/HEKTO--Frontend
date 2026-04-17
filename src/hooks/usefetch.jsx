import { useEffect, useState } from "react";
import BaseUrl from "../constant";

const RENDER_BASE_URL = "https://hekto-backend.onrender.com";

function normalizeApiUrl(url) {
  if (!url || typeof url !== "string") return url;

  // If someone left the Render URL in the code, force it to use BaseUrl.
  if (url.startsWith(RENDER_BASE_URL)) {
    const rest = url.slice(RENDER_BASE_URL.length).replace(/^\/+/, "");
    return `${BaseUrl}${rest}`;
  }

  // Absolute URLs: keep as-is.
  if (/^https?:\/\//i.test(url)) return url;

  // Relative paths: prefix with BaseUrl.
  const rest = url.replace(/^\/+/, "");
  return `${BaseUrl}${rest}`;
}

function useFetch(url, options = {}, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(normalizeApiUrl(url), {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Something went wrong");
        }

        const result = await res.json();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
}

export default useFetch;

