import type { Locale } from "@/i18n/routing";
import type { PartnerBrand } from "@/lib/brands";
import galleryData from "@/data/gallery.json";

export interface GalleryPhoto {
  id: string;
  /** Path under public/images/gallery. */
  src: string;
  /** Intrinsic pixel dimensions of the file at src, for next/image and layout. */
  width: number;
  height: number;
  alt: Record<Locale, string>;
  /** The original Instagram post this photo is curated from. */
  instagramUrl: string;
}

export interface GallerySection {
  /** Matches a partnerBrands id (src/lib/brands.ts) so brand name/color/icon are reused, not duplicated. */
  id: PartnerBrand["id"];
  photos: GalleryPhoto[];
}

interface GalleryFile {
  sections: GallerySection[];
}

const data = galleryData as GalleryFile;

/** Curated gallery photos, coffee → food → wine — the same order as partnerBrands. */
export const gallerySections: GallerySection[] = data.sections;
