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
