// Vercel serverless function: GET /api/reviews
// Returns the live Google rating, review count and the latest reviews for the
// Pankti Engineering Google Business Profile, using the Google Places API (New).
//
// Required environment variables (Vercel > Project > Settings > Environment Variables):
//   GOOGLE_PLACES_API_KEY  - API key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID        - the Place ID of the business (starts with "ChIJ...")
//
// The key stays on the server and is never sent to the browser.

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    res.status(503).json({ error: "not_configured" });
    return;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`;
    const r = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });

    if (!r.ok) {
      res.status(502).json({ error: "upstream_error", status: r.status });
      return;
    }

    const p = await r.json();
    const reviews = (p.reviews || [])
      .map((v) => ({
        name: v.authorAttribution?.displayName || "Google user",
        rating: v.rating,
        text: v.text?.text || v.originalText?.text || "",
        when: v.relativePublishTimeDescription || "",
      }))
      .filter((v) => v.text.trim());

    // Cache at Vercel's edge for 1 hour so Google is called rarely (keeps cost ~zero).
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ rating: p.rating, count: p.userRatingCount, reviews });
  } catch {
    res.status(502).json({ error: "fetch_failed" });
  }
}
