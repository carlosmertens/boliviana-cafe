import { siteConfig } from "@/lib/site";

/**
 * LocalBusiness structured data (JSON-LD) so Google can show rich results
 * for the café. Only includes facts we actually know — no invented phone
 * number or opening hours.
 */
export function CafeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.name,
    url: siteConfig.url,
    servesCuisine: "Bolivian",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.addressLocality,
      addressCountry: siteConfig.address.addressCountry,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
