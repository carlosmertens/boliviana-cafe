"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const navItems = ["about", "menu", "events", "gallery", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();

  return (
    <Collapsible
      aria-label={tCommon("mainNavigation")}
      className="bg-boliviana-cream relative"
      render={<nav />}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink neon-wordmark text-xl font-normal tracking-[0.3em] outline-offset-4 focus-visible:outline-2"
              >
                BOLIVIANA
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-6">
              {navItems.map((item) => {
                const href = `/${item}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "border-boliviana-pink text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium outline-offset-4 focus-visible:outline-2"
                        : "text-boliviana-navy/70 hover:border-boliviana-navy/20 hover:text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium outline-offset-4 focus-visible:outline-2"
                    }
                  >
                    {t(item)}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LocaleSwitcher />
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <CollapsibleTrigger className="group text-boliviana-navy/70 hover:bg-boliviana-navy/5 hover:text-boliviana-navy focus:outline-boliviana-pink rounded-control relative inline-flex items-center justify-center p-2 focus:outline-2 focus:-outline-offset-1">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">{tCommon("openMenu")}</span>
              <Menu
                aria-hidden="true"
                className="block size-6 group-data-panel-open:hidden"
              />
              <X
                aria-hidden="true"
                className="hidden size-6 group-data-panel-open:block"
              />
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      <CollapsibleContent className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {navItems.map((item) => {
            const href = `/${item}`;
            const isActive = pathname === href;
            return (
              <Link
                key={item}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "bg-boliviana-pink/10 border-boliviana-pink text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control block border-l-4 py-2 pr-4 pl-3 text-base font-medium -outline-offset-2 focus-visible:outline-2"
                    : "text-boliviana-navy/70 hover:border-boliviana-navy/20 hover:bg-boliviana-navy/5 hover:text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium -outline-offset-2 focus-visible:outline-2"
                }
              >
                {t(item)}
              </Link>
            );
          })}
        </div>
        <div className="border-boliviana-navy/10 border-t px-4 py-4">
          <LocaleSwitcher />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
