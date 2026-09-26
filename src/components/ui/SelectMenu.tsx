"use client";

import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  /** Applied to the wrapper — use to set a min-width so longer option labels
   * don't get clipped (the options panel matches the trigger's width). */
  className?: string;
  /** Generic leading icon shown before the selected label (e.g. a language glyph). */
  icon?: ReactNode;
}

/**
 * Reusable select menu built on shadcn/ui's Select, styled for Boliviana.
 * The avatar is optional per option.
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
    <div className={className}>
      <label
        className={
          hideLabel
            ? "sr-only"
            : "text-boliviana-navy mb-2 block text-sm/6 font-medium"
        }
      >
        {label}
      </label>
      <Select value={selected.id} onValueChange={(id) => id && onChange(id)}>
        <SelectTrigger className="text-boliviana-navy focus-visible:ring-boliviana-pink/50 focus-visible:border-boliviana-pink w-full bg-white">
          <SelectValue>
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
            <span className="truncate">{selected.label}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="data-[highlighted]:bg-boliviana-pink/10 data-selected:bg-boliviana-pink/10"
            >
              {option.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  src={option.avatar}
                  className="size-5 shrink-0 rounded-full"
                />
              )}
              <span className="truncate">{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
