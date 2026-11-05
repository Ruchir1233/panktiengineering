// Single source of truth for business details shown across the site.
// Change a value here and every page that imports it updates.

export const BUSINESS = {
  name: "Pankti Engineering",
  phoneDisplay: "+91 98795-23937",
  phoneShort: "98795-23937",
  phoneTel: "+919879523937",
  whatsappNumber: "919879523937",
  email: "rohit4860@gmail.com",
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
  hoursDays: "Monday - Saturday",
  hoursTime: "9:00 AM - 6:00 PM",
  postalCode: "396001",
  foundedYear: 2016,
} as const;

/** Years in business, computed so it never goes stale (e.g. "10+"). */
export const yearsInBusiness = (): string =>
  `${new Date().getFullYear() - BUSINESS.foundedYear}+`;

export const whatsappLink = (message?: string): string =>
  `https://wa.me/${BUSINESS.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

// ---------------------------------------------------------------------------
// Ratings.
// GOOGLE is the fallback shown until the live /api/reviews endpoint responds
// (or if it is not configured). Update these two numbers if you ever need to
// by hand. Other platforms are manual: check and update them occasionally.
// ---------------------------------------------------------------------------
export const GOOGLE = {
  rating: 4.9,
  reviewCount: 76,
  url: "https://share.google/vJzqng6O1HGMQAg5R",
} as const;

export const OTHER_PLATFORMS = {
  justdial: { rating: "5.0", count: "71" },
  indiamart: { rating: "4.8" },
} as const;
