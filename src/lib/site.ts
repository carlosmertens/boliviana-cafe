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
  mapsUrl:
    "https://www.google.com/maps/place/BOLIVIANA+-+Die+Seele+Boliviens+-/@52.5335319,13.4231295,17z/data=!3m1!4b1!4m6!3m5!1s0x47a84ff1b48eaeb9:0x641ea795f691d51e!8m2!3d52.5335319!4d13.4257044!16s%2Fg%2F11rxndnxr_",
};
