import { StarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
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
  const tCommon = useTranslations("about");
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

      <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
        <a
          href={brand.external.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control text-sm font-medium underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2"
        >
          {tCommon("visitWebsite")} →
        </a>
        <a
          href={brand.external.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control text-sm font-medium underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2"
        >
          {tCommon("visitInstagram")} →
        </a>
      </div>
    </div>
  );
}

/** About page content: shared intro, then one compact "chapter" row per partner brand (Proposal B). */
export function AboutBrands() {
  const t = useTranslations("about");

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
          {t("lead")}
        </p>
        <p className="text-boliviana-navy/70 max-w-xl text-balance">
          {t("story")}
        </p>
        <p className="text-boliviana-navy/70 max-w-xl text-balance">
          {t("storyDetail")}
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
    </main>
  );
}
