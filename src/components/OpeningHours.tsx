import { useFormatter, useTranslations } from "next-intl";
import { weeklyHours } from "@/lib/hours";

// Offset in days from a known Monday (2024-01-01), used to derive a
// localized weekday name without hardcoding day-name translations.
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

export function OpeningHours() {
  const t = useTranslations("hours");
  const format = useFormatter();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      {weeklyHours.map(({ day, open, close }) => {
        const date = new Date(referenceMonday);
        date.setUTCDate(referenceMonday.getUTCDate() + mondayOffset[day]);
        const weekday = format.dateTime(date, {
          weekday: "long",
          timeZone: "UTC",
        });

        return (
          <div key={day} className="contents">
            <dt className="capitalize">{weekday}</dt>
            <dd>{open && close ? `${open}–${close}` : t("closed")}</dd>
          </div>
        );
      })}
    </dl>
  );
}
