import { useEffect, useState } from "react";
import { GOOGLE } from "@/lib/business";

export interface LiveReview {
  name: string;
  rating: number;
  text: string;
  when: string;
}

export interface GoogleData {
  rating: number;
  count: number;
  /** null = live reviews not available, show the built-in fallback ones */
  reviews: LiveReview[] | null;
  live: boolean;
}

const fallback: GoogleData = {
  rating: GOOGLE.rating,
  count: GOOGLE.reviewCount,
  reviews: null,
  live: false,
};

// One shared request per page load, however many components use the hook.
let cache: Promise<GoogleData> | null = null;

const load = (): Promise<GoogleData> => {
  if (!cache) {
    cache = fetch("/api/reviews", { headers: { Accept: "application/json" } })
      .then((r) => {
        const isJson = (r.headers.get("content-type") || "").includes("application/json");
        if (!r.ok || !isJson) throw new Error("reviews unavailable");
        return r.json();
      })
      .then((d): GoogleData => {
        if (typeof d?.rating !== "number" || typeof d?.count !== "number") {
          throw new Error("bad shape");
        }
        const reviews: LiveReview[] = Array.isArray(d.reviews)
          ? d.reviews.filter(
              (x: LiveReview) => x && typeof x.text === "string" && x.text.trim() && typeof x.rating === "number",
            )
          : [];
        return { rating: d.rating, count: d.count, reviews: reviews.length ? reviews : null, live: true };
      })
      .catch(() => fallback);
  }
  return cache;
};

/** Live Google rating + reviews, falling back to the constants in lib/business.ts. */
export function useGoogleReviews(): GoogleData {
  const [data, setData] = useState<GoogleData>(fallback);
  useEffect(() => {
    let active = true;
    load().then((d) => {
      if (active) setData(d);
    });
    return () => {
      active = false;
    };
  }, []);
  return data;
}
