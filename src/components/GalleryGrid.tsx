import Image from "next/image";
import { StarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { partnerBrands } from "@/lib/brands";
import {
  gallerySections,
  type GalleryPhoto,
  type GallerySection,
} from "@/lib/gallery";

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

const brandById = Object.fromEntries(partnerBrands.map((b) => [b.id, b]));

function GalleryPhotoCard({
  photo,
  locale,
}: {
  photo: GalleryPhoto;
  locale: Locale;
}) {
  const t = useTranslations("gallery");

  return (
    <a
      href={photo.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${photo.alt[locale]} — ${t("viewOnInstagram")}`}
      className="rounded-control focus-visible:outline-boliviana-pink mb-4 block break-inside-avoid overflow-hidden outline-offset-2 focus-visible:outline-2"
    >
      <Image
        src={photo.src}
        alt={photo.alt[locale]}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 768px) 33vw, 50vw"
        className="rounded-control h-auto w-full hover:opacity-90"
      />
    </a>
  );
}

function GallerySectionBlock({ section }: { section: GallerySection }) {
  const locale = useLocale() as Locale;
  const t = useTranslations(`about.brands.${section.id}`);
  const Icon = icons[section.id];
  const color = brandById[section.id].color;

  return (
    <section aria-labelledby={`gallery-${section.id}`} className="py-10">
      <div className="flex items-center gap-3">
        <Icon
          aria-hidden="true"
          className={`size-8 shrink-0 ${iconColors[color]}`}
        />
        <h2
          id={`gallery-${section.id}`}
          className={`font-script decoration-3 underline-offset-4 ${underlineColors[color]} text-boliviana-navy text-3xl font-semibold underline`}
        >
          {t("name")}
        </h2>
      </div>

      <div className="mt-6 columns-2 gap-4 sm:columns-3">
        {section.photos.map((photo) => (
          <GalleryPhotoCard key={photo.id} photo={photo} locale={locale} />
        ))}
      </div>
    </section>
  );
}

/** Gallery page content: shared intro, then curated Instagram photos grouped by partner brand (food → coffee → wine), mirroring the About/Menu/Contact page pattern. */
export function GalleryGrid() {
  const t = useTranslations("gallery");

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

      <div className="divide-boliviana-navy/10 w-full max-w-4xl divide-y">
        {gallerySections.map((section) => (
          <GallerySectionBlock key={section.id} section={section} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe mt-10 h-1.5 w-24 rounded-full"
      />
    </main>
  );
}
