import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center dark:bg-black">
      <div className="absolute top-4 right-4">
        <LocaleSwitcher />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {t("tagline")}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        {t("subtitle")}
      </p>
    </main>
  );
}
