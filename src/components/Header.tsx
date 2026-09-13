"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const navItems = ["about", "menu", "gallery", "events", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-boliviana-cream relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink text-lg font-bold tracking-[0.2em] outline-offset-4 focus-visible:outline-2"
              >
                BOLIVIANA
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              {navItems.map((item) => {
                const href = `/${item}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item}
                    href={href}
                    className={
                      isActive
                        ? "border-boliviana-pink text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium outline-offset-4 focus-visible:outline-2"
                        : "text-boliviana-navy/60 hover:border-boliviana-navy/20 hover:text-boliviana-navy rounded-control focus-visible:outline-boliviana-pink inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium outline-offset-4 focus-visible:outline-2"
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
            <DisclosureButton className="group text-boliviana-navy/60 hover:bg-boliviana-navy/5 hover:text-boliviana-navy focus:outline-boliviana-pink rounded-control relative inline-flex items-center justify-center p-2 focus:outline-2 focus:-outline-offset-1">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {navItems.map((item) => {
            const href = `/${item}`;
            const isActive = pathname === href;
            return (
              <DisclosureButton
                key={item}
                as={Link}
                href={href}
                className={
                  isActive
                    ? "bg-boliviana-pink/10 border-boliviana-pink text-boliviana-navy focus-visible:outline-boliviana-pink block border-l-4 py-2 pr-4 pl-3 text-base font-medium outline-offset-[-2px] focus-visible:outline-2"
                    : "text-boliviana-navy/60 hover:border-boliviana-navy/20 hover:bg-boliviana-navy/5 hover:text-boliviana-navy focus-visible:outline-boliviana-pink block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium outline-offset-[-2px] focus-visible:outline-2"
                }
              >
                {t(item)}
              </DisclosureButton>
            );
          })}
        </div>
        <div className="border-boliviana-navy/10 border-t px-4 py-4">
          <LocaleSwitcher />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
