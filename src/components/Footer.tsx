import { siteConfig } from "@/lib/site";
import { OpeningHoursAccordion } from "@/components/OpeningHoursAccordion";

export function Footer() {
  return (
    <footer className="bg-boliviana-navy text-boliviana-cream mt-auto px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm sm:flex-row sm:items-start sm:gap-16">
        <div>
          <p className="text-boliviana-cream/90">
            {siteConfig.address.streetAddress}, {siteConfig.address.postalCode}{" "}
            {siteConfig.address.addressLocality}
          </p>
          <a
            href={`tel:${siteConfig.phone.href}`}
            className="text-boliviana-cream/70 rounded-control focus-visible:outline-boliviana-pink mt-1 inline-block outline-offset-2 hover:text-white focus-visible:outline-2"
          >
            {siteConfig.phone.display}
          </a>
        </div>

        <OpeningHoursAccordion />
      </div>

      <p className="text-boliviana-cream/50 mx-auto mt-6 max-w-7xl text-xs">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
