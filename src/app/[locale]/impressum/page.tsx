import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ImpressumDetails } from "@/components/ImpressumDetails";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/impressum",
    namespace: "impressum",
    descriptionKey: "intro",
  });
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <ImpressumDetails />
    </>
  );
}
