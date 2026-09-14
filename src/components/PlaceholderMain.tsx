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
      className="hero-tint flex flex-1 flex-col items-center justify-center gap-4 rounded-t-[3rem] px-6 py-24 text-center shadow-[0_12px_30px_-18px_rgba(28,21,82,0.3)] sm:rounded-t-[4rem]"
    >
      <h1 className="text-boliviana-navy text-4xl font-semibold sm:text-5xl">
        {t("title")}
      </h1>
      <p className="text-boliviana-navy/70 max-w-md text-lg">{t("intro")}</p>
    </main>
  );
}
