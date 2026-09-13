"use client";

import type { ReactNode } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export interface SelectMenuOption {
  id: string;
  label: string;
  /** Optional image shown next to the label (e.g. an avatar or a flag icon). */
  avatar?: string;
}

interface SelectMenuProps {
  label: string;
  options: SelectMenuOption[];
  value: string;
  onChange: (id: string) => void;
  /** Keep the label accessible but visually hidden (e.g. compact header controls). */
  hideLabel?: boolean;
  /** Applied to the button/options wrapper — use to set a min-width so longer
   * option labels don't get clipped (the options panel matches the button's width). */
  className?: string;
  /** Generic leading icon shown before the selected label (e.g. a language glyph). */
  icon?: ReactNode;
}

/**
 * Reusable Headless UI listbox, styled after Tailwind Plus's
 * "Custom with avatar" select menu. The avatar is optional per option.
 */
export function SelectMenu({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
  className,
  icon,
}: SelectMenuProps) {
  const selected = options.find((option) => option.id === value) ?? options[0];

  return (
    <Listbox value={selected} onChange={(option) => onChange(option.id)}>
      <Label
        className={
          hideLabel
            ? "sr-only"
            : "text-boliviana-navy block text-sm/6 font-medium"
        }
      >
        {label}
      </Label>
      <div className={`relative ${hideLabel ? "" : "mt-2"} ${className ?? ""}`}>
        <ListboxButton className="text-boliviana-navy outline-boliviana-navy/20 focus-visible:outline-boliviana-purple grid w-full cursor-default grid-cols-1 rounded-full bg-white py-1.5 pr-2 pl-3 text-left outline-1 -outline-offset-1 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
            {icon && (
              <span
                aria-hidden="true"
                className="text-boliviana-navy/60 flex shrink-0"
              >
                {icon}
              </span>
            )}
            {selected.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                src={selected.avatar}
                className="bg-boliviana-cream size-5 shrink-0 rounded-full"
              />
            )}
            <span className="block truncate">{selected.label}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="text-boliviana-navy/50 col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group text-boliviana-navy data-focus:bg-boliviana-purple relative cursor-default py-2 pr-9 pl-3 select-none data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center gap-2">
                {option.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt=""
                    src={option.avatar}
                    className="size-5 shrink-0 rounded-full"
                  />
                )}
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {option.label}
                </span>
              </div>

              <span className="text-boliviana-purple absolute inset-y-0 right-0 flex items-center pr-4 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
