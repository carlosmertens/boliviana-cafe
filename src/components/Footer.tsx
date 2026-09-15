import { siteConfig } from "@/lib/site";
import { OpeningHoursAccordion } from "@/components/OpeningHoursAccordion";
import { Link } from "@/i18n/navigation";

export function Footer() {
  return (
    <footer className="from-boliviana-purple to-boliviana-navy text-boliviana-cream mt-auto bg-gradient-to-b px-6 py-10 sm:px-10 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm sm:flex-row sm:items-start sm:gap-16">
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-boliviana-cream/90 rounded-control outline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          {siteConfig.address.streetAddress}, {siteConfig.address.postalCode}{" "}
          {siteConfig.address.addressLocality}
        </a>

        <OpeningHoursAccordion />
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-xs">
        <p className="text-boliviana-cream/70">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <Link
          href="/impressum"
          className="text-boliviana-cream/70 rounded-control outline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          Impressum
        </Link>
      </div>
    </footer>
  );
}
