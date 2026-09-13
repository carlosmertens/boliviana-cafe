import { siteConfig } from "@/lib/site";
import { OpeningHoursAccordion } from "@/components/OpeningHoursAccordion";

export function Footer() {
  return (
    <footer className="from-boliviana-pink via-boliviana-purple to-boliviana-purple text-boliviana-cream mt-auto bg-gradient-to-b from-0% via-[16%] to-100% px-6 pt-14 pb-8 sm:px-10 sm:pt-20">
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

      <p className="text-boliviana-cream/70 mx-auto mt-6 max-w-7xl text-xs">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
