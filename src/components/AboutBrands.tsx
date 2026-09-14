import { StarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { partnerBrands, type PartnerBrand } from "@/lib/brands";

const icons = {
  dieSeeleBoliviens: StarIcon,
  carayaCoffee: SunIcon,
  miskisimi: MoonIcon,
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

function BrandChapter({ brand }: { brand: PartnerBrand }) {
  const t = useTranslations(`about.brands.${brand.id}`);
  const Icon = icons[brand.id];

  return (
    <div className="flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:gap-6">
      <Icon
        aria-hidden="true"
        className={`size-8 shrink-0 ${iconColors[brand.color]}`}
      />
      <div className="flex-1">
        <p className="text-boliviana-navy/60 text-xs font-bold tracking-[0.2em] uppercase">
          {t("chapterLabel")}
        </p>
        <h2
          className={`font-script decoration-3 underline-offset-4 ${underlineColors[brand.color]} text-boliviana-navy text-3xl font-semibold underline`}
        >
          {t("name")}
        </h2>
        <p className="text-boliviana-navy/80 mt-1 max-w-xl">{t("blurb")}</p>
      </div>

      {brand.external ? (
        <a
          href={brand.external.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control shrink-0 text-sm font-medium underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2"
        >
          {t("cta")} →
        </a>
      ) : (
        <Link
          href="/menu"
          className="text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control shrink-0 text-sm font-medium underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2"
        >
          {t("cta")} →
        </Link>
      )}
    </div>
  );
}

/** About page content: shared intro, then one compact "chapter" row per partner brand (Proposal B). */
export function AboutBrands() {
  const t = useTranslations("about");

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center px-6 py-20 sm:px-10"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-boliviana-navy text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-boliviana-navy/80 max-w-xl text-lg text-balance">
          {t("lead")}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe my-10 h-1.5 w-24 rounded-full"
      />

      <div className="divide-boliviana-navy/10 w-full max-w-3xl divide-y">
        {partnerBrands.map((brand) => (
          <BrandChapter key={brand.id} brand={brand} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe mt-10 h-1.5 w-24 rounded-full"
      />

      <p className="text-boliviana-navy/70 mt-6 text-sm">{t("closing")}</p>
    </main>
  );
}
