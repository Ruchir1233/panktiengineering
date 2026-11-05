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
