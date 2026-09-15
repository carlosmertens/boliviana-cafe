import { siteConfig } from "@/lib/site";
import { weeklyHours } from "@/lib/hours";

const schemaDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Groups consecutive open days that share the same hours into one spec entry. */
function buildOpeningHoursSpecification() {
  const openDays = weeklyHours.filter((d) => d.open && d.close);
  const groups = new Map<string, string[]>();

  for (const { day, open, close } of openDays) {
    const key = `${open}-${close}`;
    const dayName = `https://schema.org/${schemaDayNames[day]}`;
    const existing = groups.get(key);
    if (existing) {
      existing.push(dayName);
    } else {
      groups.set(key, [dayName]);
    }
  }

  return Array.from(groups.entries()).map(([key, dayOfWeek]) => {
    const [opens, closes] = key.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens,
      closes,
    };
  });
}

/**
 * LocalBusiness structured data (JSON-LD) so Google can show rich results
 * for the café. Only includes facts we actually know — sourced from the
 * Google Business listing (see src/lib/site.ts and src/lib/hours.ts).
 */
export function CafeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone.href,
    email: siteConfig.email,
    servesCuisine: "Bolivian",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.addressLocality,
      addressCountry: siteConfig.address.addressCountry,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
