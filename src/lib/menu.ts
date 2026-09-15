import type { Locale } from "@/i18n/routing";
import type { PartnerBrand } from "@/lib/brands";
import menuData from "@/data/menu.json";

export type AllergenKey = "egg" | "gluten" | "milk" | "nuts" | "vegan";

export interface MenuItem {
  id: string;
  name: Record<Locale, string>;
  /** Winery/varietal line shown under a wine's name, e.g. "Jardín Oculto – Tannat | Red". */
  subtitle?: Record<Locale, string>;
  description?: Record<Locale, string>;
  /** Single price in EUR. Mutually exclusive with priceGlass/priceBottle. */
  price?: number;
  priceGlass?: number;
  priceBottle?: number;
  allergens?: AllergenKey[];
  /** Brochure star (★) — the brand's own highlighted pick, e.g. Chuflay, Tannat Nouveau. */
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  title: Record<Locale, string>;
  description?: Record<Locale, string>;
  items: MenuItem[];
}

export interface MenuSection {
  /** Matches a partnerBrands id (src/lib/brands.ts) so brand name/color/icon are reused, not duplicated. */
  id: PartnerBrand["id"];
  intro: Record<Locale, string>;
  categories: MenuCategory[];
}

interface MenuFile {
  sections: MenuSection[];
}

const data = menuData as MenuFile;

/** Full café menu, food → coffee → wine — the same order as partnerBrands. */
export const menuSections: MenuSection[] = data.sections;
