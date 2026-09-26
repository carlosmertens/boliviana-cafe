import { MapPin, Clock, Phone, Mail, Star, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { partnerBrands, type PartnerBrand } from "@/lib/brands";
import { siteConfig } from "@/lib/site";
import { OpeningHoursList } from "@/components/OpeningHoursAccordion";

const brandById = Object.fromEntries(partnerBrands.map((b) => [b.id, b]));

const icons = {
  dieSeeleBoliviens: Star,
  carayaCoffee: Sun,
  miskisimi: Moon,
} as const;

const iconColors = {
  pink: "text-boliviana-pink",
  navy: "text-boliviana-navy",
  purple: "text-boliviana-purple",
} as const;

const underlineColors = {
  pink: "decoration-boliviana-pink",
  navy: "decoration-boliviana-navy",
  purple: "decoration-boliviana-purple",
} as const;

const linkClass =
  "text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control text-sm font-medium underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2";

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        aria-hidden="true"
        className="text-boliviana-pink mt-0.5 size-5 shrink-0"
      />
      <div className="text-boliviana-navy/90">{children}</div>
    </div>
  );
}

/** Primary "get in touch" card for the café itself (Boliviana, formerly Die Seele Boliviens — same transferred accounts). */
function PrimaryContact() {
  const t = useTranslations("contact");
  const tHours = useTranslations("hours");
  const whatsappHref = `https://wa.me/${siteConfig.phone.href.replace("+", "")}`;

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <ContactRow icon={MapPin}>
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {siteConfig.address.streetAddress}, {siteConfig.address.postalCode}{" "}
          {siteConfig.address.addressLocality}
        </a>
      </ContactRow>

      <ContactRow icon={Clock}>
        <p className="font-medium">{tHours("title")}</p>
        <OpeningHoursList className="text-boliviana-navy/70 mt-1 space-y-0.5 text-sm" />
      </ContactRow>

      <ContactRow icon={Phone}>
        <a href={`tel:${siteConfig.phone.href}`} className={linkClass}>
          {t("call")}
        </a>
        <span className="text-boliviana-navy/40 mx-2">·</span>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          WhatsApp
        </a>
        <p className="text-boliviana-navy/60 mt-0.5 text-sm">
          {siteConfig.phone.display}
        </p>
      </ContactRow>

      <ContactRow icon={Mail}>
        <a href={`mailto:${siteConfig.email}`} className={linkClass}>
          {siteConfig.email}
        </a>
      </ContactRow>

      <div className="flex items-center gap-1 pl-8 text-sm">
        <a
          href={brandById.dieSeeleBoliviens.external.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Instagram
        </a>
        <span className="text-boliviana-navy/40 mx-2">·</span>
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Facebook
        </a>
      </div>
    </div>
  );
}

function BrandContactChapter({ brand }: { brand: PartnerBrand }) {
  const t = useTranslations(`about.brands.${brand.id}`);
  const Icon = icons[brand.id];

  return (
    <div className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:gap-6">
      <Icon
        aria-hidden="true"
        className={`size-8 shrink-0 ${iconColors[brand.color]}`}
      />
      <div className="flex-1">
        <h3
          className={`font-script decoration-3 underline-offset-4 ${underlineColors[brand.color]} text-boliviana-navy text-3xl font-semibold underline`}
        >
          {t("name")}
        </h3>
        <p className="text-boliviana-navy/80 mt-1 max-w-xl">{t("blurb")}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {brand.external.email && (
            <>
              <a href={`mailto:${brand.external.email}`} className={linkClass}>
                {brand.external.email}
              </a>
              <span className="text-boliviana-navy/40">·</span>
            </>
          )}
          {brand.external.phone && (
            <>
              <a
                href={`tel:${brand.external.phone.href}`}
                className={linkClass}
              >
                {brand.external.phone.display}
              </a>
              <span className="text-boliviana-navy/40">·</span>
            </>
          )}
          <a
            href={brand.external.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram
          </a>
          {brand.external.facebookUrl && (
            <>
              <span className="text-boliviana-navy/40">·</span>
              <a
                href={brand.external.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Facebook
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Contact page content: the café's own primary contact details, then brand-specific channels for Caraya Coffee and Miskisimi (Die Seele Boliviens' own accounts are Boliviana's own, already shown above). */
export function ContactDetails() {
  const t = useTranslations("contact");
  const brandsToContact = partnerBrands.filter(
    (brand) => brand.id !== "dieSeeleBoliviens",
  );

  return (
    <main
      id="main-content"
      className="hero-tint flex flex-1 flex-col items-center rounded-t-[3rem] px-6 py-24 shadow-[0_12px_30px_-18px_rgba(28,21,82,0.3)] sm:rounded-t-[4rem] sm:px-10"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-boliviana-navy text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-boliviana-navy/80 max-w-xl text-lg text-balance">
          {t("intro")}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe my-10 h-1.5 w-24 rounded-full"
      />

      <PrimaryContact />

      <div
        aria-hidden="true"
        className="textile-stripe my-10 h-1.5 w-24 rounded-full"
      />

      <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <h2 className="text-boliviana-navy text-2xl font-semibold">
          {t("brandsHeading")}
        </h2>
        <p className="text-boliviana-navy/70 max-w-xl text-balance">
          {t("brandsIntro")}
        </p>
      </div>

      <div className="divide-boliviana-navy/10 w-full max-w-3xl divide-y">
        {brandsToContact.map((brand) => (
          <BrandContactChapter key={brand.id} brand={brand} />
        ))}
      </div>
    </main>
  );
}
