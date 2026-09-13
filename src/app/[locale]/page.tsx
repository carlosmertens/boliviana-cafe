import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, pathname: "", namespace: "metadata" });
}

export default function Home() {
  const t = useTranslations("hero");

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="bg-boliviana-pink flex flex-1 flex-col items-center justify-center gap-6 rounded-t-[3rem] px-6 py-24 text-center text-white sm:rounded-t-[4rem]"
      >
        <p className="text-boliviana-yellow text-xl font-bold tracking-[0.3em] uppercase">
          {t("location")}
        </p>
        <h1 className="font-script max-w-2xl text-6xl font-semibold text-balance sm:text-7xl">
          {t("tagline")}
        </h1>
        <p className="max-w-md text-lg">{t("subtitle")}</p>
      </main>
    </>
  );
}
