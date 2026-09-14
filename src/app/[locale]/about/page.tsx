import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { AboutBrands } from "@/components/AboutBrands";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/about",
    namespace: "about",
    descriptionKey: "intro",
  });
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutBrands />
    </>
  );
}
