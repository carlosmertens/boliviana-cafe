import { useTranslations } from "next-intl";

interface PlaceholderMainProps {
  /** Translation namespace with `title` and `intro` keys. */
  namespace: string;
}

/** Simple centered title/intro block used by pages that don't have real content yet. */
export function PlaceholderMain({ namespace }: PlaceholderMainProps) {
  const t = useTranslations(namespace);

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center"
    >
      <h1 className="text-boliviana-navy text-4xl font-semibold sm:text-5xl">
        {t("title")}
      </h1>
      <p className="text-boliviana-navy/70 max-w-md text-lg">{t("intro")}</p>
    </main>
  );
}
