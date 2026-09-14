import type { Locale } from "@/i18n/routing";
import announcementData from "@/data/announcement.json";

export interface AnnouncementEvent {
  id: string;
  /** ISO date (YYYY-MM-DD), Europe/Berlin. */
  date: string;
  /** HH:mm, Europe/Berlin. */
  startTime: string;
  /** HH:mm, Europe/Berlin — the event is treated as past once this time is reached. */
  endTime: string;
  title: Record<Locale, string>;
  /** Set to false for notices visitors shouldn't be able to dismiss (e.g. a holiday closure). Defaults to true. */
  dismissible?: boolean;
}

export type AnnouncementKind = "info" | "promotion";

export interface AnnouncementInfo {
  /** Bump when the message changes so visitors who dismissed the old one see the new one. */
  id: string;
  /** Controls the banner's first-row label ("Information" vs "Promotion"). Defaults to "info". */
  kind?: AnnouncementKind;
  /** Optional second-row line (a deadline, validity window, etc). Free text per locale. */
  dateLabel?: Record<Locale, string>;
  message: Record<Locale, string>;
  /** Set to false for notices visitors shouldn't be able to dismiss (e.g. a holiday closure). Defaults to true. */
  dismissible?: boolean;
}

interface AnnouncementFile {
  /** Master switch — set to false to hide the banner regardless of content. */
  enabled: boolean;
  /** General notice (closing days, special hours, etc). Set to null when there's none. */
  info: AnnouncementInfo | null;
  /** Upcoming events (cuppings, courses, celebrations). The soonest one that hasn't ended yet is shown. */
  events: AnnouncementEvent[];
}

const data = announcementData as AnnouncementFile;

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

function hasEnded(event: AnnouncementEvent, now: Date): boolean {
  const berlinNow = berlinNowParts(now);
  if (event.date !== berlinNow.date) return event.date < berlinNow.date;
  return event.endTime <= berlinNow.time;
}

/**
 * The one thing the banner should show right now: the soonest event that
 * hasn't ended yet, falling back to the general info notice, or null when
 * there's nothing to say (which hides the banner entirely).
 */
export function getActiveAnnouncement(
  now: Date = new Date(),
): AnnouncementEvent | AnnouncementInfo | null {
  if (!data.enabled) return null;

  const upcoming = data.events
    .filter((event) => !hasEnded(event, now))
    .sort((a, b) =>
      `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`),
    );

  if (upcoming.length > 0) return upcoming[0];
  return data.info;
}

export function isAnnouncementEvent(
  announcement: AnnouncementEvent | AnnouncementInfo,
): announcement is AnnouncementEvent {
  return "date" in announcement;
}
