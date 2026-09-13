export const siteConfig = {
  name: "Boliviana",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    streetAddress: "Winsstraße 17",
    postalCode: "10405",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  // Source: Google Business listing (Boliviana Café, formerly "Die Seele
  // Boliviens"), confirmed 2026-09-13.
  phone: {
    display: "0176 97739948",
    href: "+4917697739948",
  },
};
