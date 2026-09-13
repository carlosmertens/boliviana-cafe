import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <>
      <Header />

      <main className="bg-boliviana-pink text-boliviana-cream flex flex-1 flex-col items-center justify-center gap-6 rounded-t-[3rem] px-6 py-24 text-center sm:rounded-t-[4rem]">
        <p className="text-boliviana-yellow text-sm font-semibold tracking-[0.3em] uppercase">
          Berlin
        </p>
        <h1 className="font-script max-w-2xl text-6xl font-semibold text-balance sm:text-7xl">
          {t("tagline")}
        </h1>
        <p className="text-boliviana-cream/90 max-w-md text-lg">
          {t("subtitle")}
        </p>
      </main>
    </>
  );
}
