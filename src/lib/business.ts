// Single source of truth for business details shown across the site.
// Change a value here and every page that imports it updates.

export const BUSINESS = {
  name: "Pankti Engineering",
  phoneDisplay: "+91 98795-23937",
  phoneShort: "98795-23937",
  phoneTel: "+919879523937",
  whatsappNumber: "919879523937",
  email: "rohit4860@gmail.com",
  hours: "Tue – Sun: 9:00 AM – 5:30 PM · Monday closed",
  hoursDays: "Tuesday - Sunday",
  hoursTime: "9:00 AM - 5:30 PM",
  postalCode: "396035",
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
// Ratings. Update by hand from the Google Business Profile when they change
// (also in index.html). JustDial / IndiaMART are manual too.
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
