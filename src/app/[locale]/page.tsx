import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <>
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-boliviana-navy text-lg font-bold tracking-[0.2em]">
          BOLIVIANA
        </span>
        <LocaleSwitcher />
      </header>

      <main className="bg-boliviana-pink text-boliviana-cream flex flex-1 flex-col items-center justify-center gap-6 rounded-t-[3rem] px-6 py-24 text-center sm:rounded-t-[4rem]">
        <p className="text-boliviana-yellow text-sm font-semibold tracking-[0.3em] uppercase">
          Berlin
        </p>
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-balance sm:text-6xl">
          {t("tagline")}
        </h1>
        <p className="text-boliviana-cream/90 max-w-md text-lg">
          {t("subtitle")}
        </p>
      </main>
    </>
  );
}
