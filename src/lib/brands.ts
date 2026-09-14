/**
 * The three partner brands under Boliviana's roof, in the order they appear
 * on the About page (food → coffee → wine, mirroring the physical space).
 *
 * Die Seele Boliviens has no separate external link here: its own Google
 * Business listing and Instagram were transferred to Boliviana itself (see
 * project-scope.md), so it links to the café's own menu instead of an
 * outside profile. Caraya Coffee and MiskiSimi kept their own accounts —
 * URLs confirmed 2026-09-14 via their public websites/Instagram profiles.
 */
export interface PartnerBrand {
  id: "dieSeeleBoliviens" | "carayaCoffee" | "miskisimi";
  /** Maps to the boliviana-{color} design token used for this brand's accent. */
  color: "pink" | "navy" | "purple";
  external?: {
    instagramHandle: string;
    instagramUrl: string;
    websiteUrl: string;
  };
}

export const partnerBrands: PartnerBrand[] = [
  { id: "dieSeeleBoliviens", color: "pink" },
  {
    id: "carayaCoffee",
    color: "navy",
    external: {
      instagramHandle: "@caraya_coffee",
      instagramUrl: "https://www.instagram.com/caraya_coffee/",
      websiteUrl: "https://www.caraya-coffee.com/",
    },
  },
  {
    id: "miskisimi",
    color: "purple",
    external: {
      instagramHandle: "@miskisimi_imports",
      instagramUrl: "https://www.instagram.com/miskisimi_imports/",
      websiteUrl: "https://miskisimi.com/en",
    },
  },
];
