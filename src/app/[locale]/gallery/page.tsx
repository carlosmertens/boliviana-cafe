import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PlaceholderMain } from "@/components/PlaceholderMain";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/gallery",
    namespace: "gallery",
    descriptionKey: "intro",
  });
}

export default function GalleryPage() {
  return (
    <>
      <Header />
      <PlaceholderMain namespace="gallery" />
    </>
  );
}
