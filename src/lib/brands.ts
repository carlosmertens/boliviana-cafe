/**
 * The three partner brands under Boliviana's roof, in the order they appear
 * on the About, Menu, and Gallery pages (coffee → food → wine, matching the
 * brochure's own ordering per stakeholder feedback, 2026-09-15).
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
    facebookUrl?: string;
    /** Brand's own contact email, for brand-specific inquiries (Contact page). */
    email?: string;
    /** Brand's own contact phone, for brand-specific inquiries (Contact page) — omit when the brand's Impressum lists none. */
    phone?: {
      display: string;
      href: string;
    };
  };
}

export const partnerBrands: PartnerBrand[] = [
  {
    id: "carayaCoffee",
    color: "navy",
    external: {
      instagramHandle: "@caraya_coffee",
      instagramUrl: "https://www.instagram.com/caraya_coffee/",
      websiteUrl: "https://www.caraya-coffee.com/",
      facebookUrl: "https://www.facebook.com/carayacoffee",
      // Source: caraya-coffee.com/info/impressum.html, confirmed 2026-09-15.
      email: "info@caraya-coffee.com",
      phone: {
        display: "0160 98538615",
        href: "+4916098538615",
      },
    },
  },
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
    id: "miskisimi",
    color: "purple",
    external: {
      instagramHandle: "@miskisimi_imports",
      instagramUrl: "https://www.instagram.com/miskisimi_imports/",
      websiteUrl: "https://miskisimi.com/",
      facebookUrl: "https://www.facebook.com/people/MiskiSimi/100054278300331/",
      email: "info@miskisimi.com",
      // Source: stakeholder feedback, confirmed 2026-09-16.
      phone: {
        display: "0156 78818266",
        href: "+4915678818266",
      },
    },
  },
];
