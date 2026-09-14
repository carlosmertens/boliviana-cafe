import type { Locale } from "@/i18n/routing";
import eventsData from "@/data/events.json";

export interface CafeEvent {
  id: string;
  /** ISO date (YYYY-MM-DD), Europe/Berlin. */
  date: string;
  /** HH:mm, Europe/Berlin. */
  startTime: string;
  /** HH:mm, Europe/Berlin — the event is treated as past once this time is reached. */
  endTime: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  registrationRequired: boolean;
  /** Only meaningful when registrationRequired is true — omit if there's no sign-up page yet. */
  registrationUrl?: string;
  /** Optional external reference for curious visitors (e.g. photos/background on a dish or tradition) — not a registration link. */
  learnMoreUrl?: string;
  /** Link text for learnMoreUrl — name the destination (e.g. "See photos on Google") so it's clear where the link goes before clicking. Required when learnMoreUrl is set. */
  learnMoreLabel?: Record<Locale, string>;
  /** Set to false for events visitors shouldn't be able to dismiss from the banner. Defaults to true. */
  dismissible?: boolean;
}

interface EventsFile {
  events: CafeEvent[];
}

const data = eventsData as EventsFile;

function berlinNowParts(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: parts.hour + ":" + parts.minute,
  };
}

export function hasEnded(event: CafeEvent, now: Date = new Date()): boolean {
  const berlinNow = berlinNowParts(now);
  if (event.date !== berlinNow.date) return event.date < berlinNow.date;
  return event.endTime <= berlinNow.time;
}

/** All events that haven't ended yet, soonest first — the single source of truth for both the /events page and the announcement banner. */
export function upcomingEvents(now: Date = new Date()): CafeEvent[] {
  return data.events
    .filter((event) => !hasEnded(event, now))
    .sort((a, b) =>
      `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`),
    );
}
