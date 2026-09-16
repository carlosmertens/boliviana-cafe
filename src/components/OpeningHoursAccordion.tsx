"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { useFormatter, useTranslations } from "next-intl";
import { groupedHours, isOpenNow } from "@/lib/hours";

// Offset in days from a known Monday (2024-01-01), used to derive localized
// weekday names without hardcoding day-name translations per locale.
const mondayOffset: Record<number, number> = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  0: 6,
};

const referenceMonday = new Date(Date.UTC(2024, 0, 1));

function weekdayName(
  format: ReturnType<typeof useFormatter>,
  day: number,
  style: "long" | "short",
) {
  const date = new Date(referenceMonday);
  date.setUTCDate(referenceMonday.getUTCDate() + mondayOffset[day]);
  return format.dateTime(date, { weekday: style, timeZone: "UTC" });
}

/** Static weekly schedule, grouped into ranges — the content shown inside the accordion, reused as-is on the Contact page. */
export function OpeningHoursList({
  className = "space-y-1",
}: {
  className?: string;
}) {
  const t = useTranslations("hours");
  const format = useFormatter();

  return (
    <div className={className}>
      {groupedHours().map((group) => {
        const first = weekdayName(format, group.days[0], "short");
        const last = weekdayName(
          format,
          group.days[group.days.length - 1],
          "short",
        );
        const label = group.days.length > 1 ? `${first}–${last}` : first;

        return (
          <div key={group.days.join(",")} className="flex gap-4">
            <span className="w-16 shrink-0">{label}</span>
            <span>
              {group.open && group.close
                ? `${group.open}–${group.close}`
                : t("closed")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Compact "open now / closed now" status that expands to the full weekly
 * schedule (grouped into ranges, e.g. Mon–Tue closed, Wed–Sun 10:00–18:00).
 */
export function OpeningHoursAccordion() {
  const t = useTranslations("hours");
  const isOpen = isOpenNow();

  return (
    <Disclosure as="div">
      {({ open: isExpanded }) => (
        <>
          <DisclosureButton className="group rounded-control flex items-center gap-2 outline-offset-2 focus-visible:outline-2 focus-visible:outline-white">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${isOpen ? "bg-boliviana-yellow" : "bg-boliviana-cream/30"}`}
            />
            <span>{isOpen ? t("openNow") : t("closedNow")}</span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="text-boliviana-cream/60 size-4"
            />
          </DisclosureButton>

          {/* Animating grid-template-rows (rather than height) lets this
              expand/collapse smoothly without knowing the content's height
              up front — plain height transitions can't animate to "auto". */}
          <div
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <DisclosurePanel
              static
              aria-hidden={!isExpanded}
              className={`text-boliviana-cream/70 mt-2 min-h-0 overflow-hidden transition-opacity duration-150 ${isExpanded ? "opacity-100" : "opacity-0"}`}
            >
              <OpeningHoursList />
            </DisclosurePanel>
          </div>
        </>
      )}
    </Disclosure>
  );
}
