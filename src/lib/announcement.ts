import type { Locale } from "@/i18n/routing";
import announcementData from "@/data/announcement.json";
import { upcomingEvents, type CafeEvent } from "@/lib/events";

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
}

const data = announcementData as AnnouncementFile;

/**
 * The one thing the banner should show right now: the soonest upcoming
 * event with a confirmed time and description (from src/data/events.json,
 * shared with the /events page), falling
 * back to the general info notice, or null when there's nothing to say
 * (which hides the banner entirely).
 */
export function getActiveAnnouncement(
  now: Date = new Date(),
): CafeEvent | AnnouncementInfo | null {
  if (!data.enabled) return null;

  // Events still marked TBC (no time or no description) aren't ready to be announced.
  const next = upcomingEvents(now).find(
    (event) => event.startTime && event.description,
  );
  return next ?? data.info;
}

export function isAnnouncementEvent(
  announcement: CafeEvent | AnnouncementInfo,
): announcement is CafeEvent {
  return "date" in announcement;
}
