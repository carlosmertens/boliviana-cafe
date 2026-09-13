import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { OpeningHours } from "@/components/OpeningHours";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-boliviana-navy text-boliviana-cream mt-auto px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="text-lg font-bold tracking-[0.2em]">BOLIVIANA</p>
          <p className="text-boliviana-cream/80 mt-3 text-sm">
            {siteConfig.address.streetAddress}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
          </p>
          <a
            href={`tel:${siteConfig.phone.href}`}
            className="text-boliviana-cream/80 rounded-control focus-visible:outline-boliviana-pink mt-2 inline-block text-sm outline-offset-2 hover:text-white focus-visible:outline-2"
          >
            {siteConfig.phone.display}
          </a>
        </div>

        <div>
          <h2 className="text-boliviana-yellow text-sm font-semibold tracking-wide uppercase">
            {t("hoursTitle")}
          </h2>
          <div className="text-boliviana-cream/80 mt-3">
            <OpeningHours />
          </div>
        </div>
      </div>

      <p className="text-boliviana-cream/60 mx-auto mt-10 max-w-7xl text-xs">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
