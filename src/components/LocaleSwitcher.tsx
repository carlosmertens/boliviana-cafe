"use client";

import { useLocale } from "next-intl";
import { LanguageIcon } from "@heroicons/react/20/solid";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SelectMenu } from "@/components/ui/SelectMenu";

const localeLabels: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  es: "Español",
};

const localeOptions = routing.locales.map((code) => ({
  id: code,
  label: localeLabels[code],
}));

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SelectMenu
      label="Language"
      hideLabel
      icon={<LanguageIcon className="size-4" />}
      className="min-w-32"
      options={localeOptions}
      value={locale}
      onChange={(newLocale) => router.replace(pathname, { locale: newLocale })}
    />
  );
}
