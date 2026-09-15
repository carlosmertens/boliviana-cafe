import { StarIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { partnerBrands } from "@/lib/brands";
import {
  menuSections,
  type AllergenKey,
  type MenuCategory,
  type MenuItem,
  type MenuSection,
} from "@/lib/menu";

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

function PriceTag({ item }: { item: MenuItem }) {
  const format = useFormatter();
  const t = useTranslations("menu");
  const currency = (value: number) =>
    format.number(value, { style: "currency", currency: "EUR" });

  if (item.priceGlass !== undefined && item.priceBottle !== undefined) {
    return (
      <span className="text-boliviana-navy/80 shrink-0 text-right text-sm font-medium">
        {t("glass")} {currency(item.priceGlass)}
        <br />
        {t("bottle")} {currency(item.priceBottle)}
      </span>
    );
  }

  if (item.price === undefined) return null;

  return (
    <span className="text-boliviana-navy shrink-0 font-semibold">
      {currency(item.price)}
    </span>
  );
}

function MenuItemRow({ item, locale }: { item: MenuItem; locale: Locale }) {
  const t = useTranslations("menu");
  const tAllergens = useTranslations("menu.allergens");

  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-boliviana-navy font-semibold">
          {item.name[locale]}
          {item.featured && (
            <span
              aria-hidden="true"
              className="text-boliviana-orange ml-1.5"
              title={t("featured")}
            >
              ★
            </span>
          )}
        </h4>
        <PriceTag item={item} />
      </div>
      {item.featured && <span className="sr-only">{t("featured")}</span>}
      {item.subtitle && (
        <p className="text-boliviana-navy/60 text-sm italic">
          {item.subtitle[locale]}
        </p>
      )}
      {item.description && (
        <p className="text-boliviana-navy/80 mt-0.5 max-w-xl text-sm">
          {item.description[locale]}
        </p>
      )}
      {item.allergens && item.allergens.length > 0 && (
        <p className="text-boliviana-navy/50 mt-1 text-xs">
          {item.allergens
            .map((key: AllergenKey) => tAllergens(key))
            .join(" · ")}
        </p>
      )}
    </div>
  );
}

function MenuCategoryBlock({
  category,
  locale,
}: {
  category: MenuCategory;
  locale: Locale;
}) {
  return (
    <div className="py-6">
      <h3 className="text-boliviana-navy text-xl font-semibold">
        {category.title[locale]}
      </h3>
      {category.description && (
        <p className="text-boliviana-navy/70 mt-1 max-w-2xl text-sm">
          {category.description[locale]}
        </p>
      )}
      <div className="divide-boliviana-navy/10 mt-3 divide-y">
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function MenuSectionBlock({ section }: { section: MenuSection }) {
  const locale = useLocale() as Locale;
  const t = useTranslations(`about.brands.${section.id}`);
  const Icon = icons[section.id];
  const color = brandById[section.id].color;

  return (
    <section aria-labelledby={`menu-${section.id}`} className="py-10">
      <div className="flex items-center gap-3">
        <Icon
          aria-hidden="true"
          className={`size-8 shrink-0 ${iconColors[color]}`}
        />
        <h2
          id={`menu-${section.id}`}
          className={`font-script decoration-3 underline-offset-4 ${underlineColors[color]} text-boliviana-navy text-3xl font-semibold underline`}
        >
          {t("name")}
        </h2>
      </div>
      <p className="text-boliviana-navy/70 mt-2 max-w-2xl text-sm">
        {section.intro[locale]}
      </p>

      <div className="divide-boliviana-navy/10 mt-2 divide-y">
        {section.categories.map((category) => (
          <MenuCategoryBlock
            key={category.id}
            category={category}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

/** Menu page content: shared intro, then the full menu grouped by partner brand (food → coffee → wine), mirroring the About/Events page pattern. */
export function MenuBrands() {
  const t = useTranslations("menu");

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

      <div className="divide-boliviana-navy/10 w-full max-w-3xl divide-y">
        {menuSections.map((section) => (
          <MenuSectionBlock key={section.id} section={section} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe mt-10 h-1.5 w-24 rounded-full"
      />
    </main>
  );
}
