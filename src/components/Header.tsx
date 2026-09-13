import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const navItems = ["about", "menu", "gallery", "events", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
      <Link
        href="/"
        className="text-boliviana-navy text-lg font-bold tracking-[0.2em]"
      >
        BOLIVIANA
      </Link>

      <nav className="text-boliviana-navy flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item}
            href={`/${item}`}
            className="hover:text-boliviana-pink"
          >
            {t(item)}
          </Link>
        ))}
      </nav>

      <LocaleSwitcher />
    </header>
  );
}
