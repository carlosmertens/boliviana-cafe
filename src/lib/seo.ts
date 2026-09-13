import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

interface BuildMetadataArgs {
  locale: string;
  /** Path without locale prefix — "" for home, "/about" for the about page, etc. */
  pathname: string;
  /** Translation namespace with a title key and a description key. */
  namespace: string;
  /** Key within the namespace to use as the meta description (defaults to "description"). */
  descriptionKey?: string;
}

/**
 * Builds per-page Metadata with correct canonical URL and hreflang alternates
 * for every locale — needed so Google treats /de, /en, /es as translations
 * of the same page rather than duplicate content.
 */
export async function buildMetadata({
  locale,
  pathname,
  namespace,
  descriptionKey = "description",
}: BuildMetadataArgs): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("title");
  const description = t(descriptionKey);
  const url = `${siteConfig.url}/${locale}${pathname}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.url}/${l}${pathname}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
