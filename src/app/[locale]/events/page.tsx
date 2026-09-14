import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { EventsList } from "@/components/EventsList";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    pathname: "/events",
    namespace: "events",
    descriptionKey: "intro",
  });
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <EventsList />
    </>
  );
}
