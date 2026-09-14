/**
 * The three partner brands under Boliviana's roof, in the order they appear
 * on the About page (food → coffee → wine, mirroring the physical space).
 * Each keeps its own separate website and Instagram, even though Die Seele
 * Boliviens' Instagram now also doubles as the café's own umbrella account
 * (see project-scope.md's "Brand Accounts" section) — URLs confirmed
 * 2026-09-15 via each brand's own public website/Instagram profile.
 */
export interface PartnerBrand {
  id: "dieSeeleBoliviens" | "carayaCoffee" | "miskisimi";
  /** Maps to the boliviana-{color} design token used for this brand's accent. */
  color: "pink" | "navy" | "purple";
  external: {
    instagramHandle: string;
    instagramUrl: string;
    websiteUrl: string;
  };
}

export const partnerBrands: PartnerBrand[] = [
  {
    id: "dieSeeleBoliviens",
    color: "pink",
    external: {
      instagramHandle: "@die_seele_boliviens",
      instagramUrl: "https://www.instagram.com/die_seele_boliviens",
      websiteUrl: "https://dieseeleboliviens.com",
    },
  },
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
      websiteUrl: "https://miskisimi.com/",
    },
  },
];
