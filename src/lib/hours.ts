export interface DayHours {
  /** 0 = Sunday ... 6 = Saturday, matching Date#getDay(). */
  day: number;
  open?: string;
  close?: string;
}

/**
 * Source: Google Business listing (Boliviana Café, formerly listed as
 * "Die Seele Boliviens"), confirmed 2026-09-13. Listed Monday-first to
 * match typical display order.
 */
export const weeklyHours: DayHours[] = [
  { day: 1 }, // Monday — closed
  { day: 2 }, // Tuesday — closed
  { day: 3, open: "10:00", close: "18:00" },
  { day: 4, open: "10:00", close: "18:00" },
  { day: 5, open: "10:00", close: "18:00" },
  { day: 6, open: "10:00", close: "18:00" },
  { day: 0, open: "10:00", close: "18:00" },
];

export interface HoursGroup {
  days: number[];
  open?: string;
  close?: string;
}

/** Groups consecutive days that share the same status into ranges, e.g. Mon–Tue closed, Wed–Sun 10:00–18:00. */
export function groupedHours(): HoursGroup[] {
  const groups: HoursGroup[] = [];

  for (const { day, open, close } of weeklyHours) {
    const last = groups[groups.length - 1];
    if (last && last.open === open && last.close === close) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], open, close });
    }
  }

  return groups;
}

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Whether the café is open right now, in its own (Europe/Berlin) timezone. */
export function isOpenNow(date: Date = new Date()): boolean {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );

  const day = weekdayIndex[parts.weekday];
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const today = weeklyHours.find((d) => d.day === day);

  if (!today?.open || !today.close) return false;

  const [openHour, openMinute] = today.open.split(":").map(Number);
  const [closeHour, closeMinute] = today.close.split(":").map(Number);

  return (
    minutes >= openHour * 60 + openMinute &&
    minutes < closeHour * 60 + closeMinute
  );
}
