"use client";

import { useState, useSyncExternalStore } from "react";
import { Megaphone, X } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { getActiveAnnouncement, isAnnouncementEvent } from "@/lib/announcement";

const storageKey = "boliviana-announcement-dismissed";

// Distinct from any real dismissed id (or null/"nothing dismissed") — lets us
// tell "haven't checked localStorage yet" apart from "checked, nothing
// dismissed," so the banner stays hidden until we actually know, instead of
// flashing visible for a frame before an already-dismissed banner hides again.
const unknown = Symbol("unknown");

function noopSubscribe() {
  return () => {};
}

function getPersistedDismissedId(): string | null {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function getServerDismissedId(): typeof unknown {
  return unknown;
}

export function AnnouncementBanner() {
  const t = useTranslations("banner");
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const [sessionDismissedId, setSessionDismissedId] = useState<string | null>(
    null,
  );
  const persistedDismissedId = useSyncExternalStore<
    string | null | typeof unknown
  >(noopSubscribe, getPersistedDismissedId, getServerDismissedId);

  const announcement = getActiveAnnouncement();
  const hydrated = persistedDismissedId !== unknown;
  const dismissedId =
    sessionDismissedId ?? (hydrated ? persistedDismissedId : null);

  if (!hydrated || !announcement || announcement.id === dismissedId)
    return null;

  function handleDismiss() {
    if (!announcement) return;
    setSessionDismissedId(announcement.id);
    try {
      window.localStorage.setItem(storageKey, announcement.id);
    } catch {
      // localStorage unavailable (e.g. private browsing) — dismissal just won't persist.
    }
  }

  const dismissible = announcement.dismissible ?? true;
  const isEvent = isAnnouncementEvent(announcement);
  const label = isEvent
    ? t("eventLabel")
    : announcement.kind === "promotion"
      ? t("promotionLabel")
      : t("infoLabel");
  const dateLine = isEvent
    ? `${format.dateTime(new Date(`${announcement.date}T00:00:00Z`), { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" })} · ${announcement.startTime}–${announcement.endTime}`
    : announcement.dateLabel?.[locale];
  const detail = isEvent
    ? announcement.title[locale]
    : announcement.message[locale];

  return (
    <div className="bg-boliviana-yellow">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-6 py-3 sm:px-10">
        <Megaphone
          aria-hidden="true"
          className="text-boliviana-navy mt-0.5 size-5 shrink-0"
        />
        <div className="flex-1 space-y-0.5">
          <p className="text-boliviana-navy/70 text-xs font-bold tracking-wide uppercase">
            {label}
          </p>
          {dateLine && (
            <p className="text-boliviana-navy/80 text-sm">{dateLine}</p>
          )}
          <p className="text-boliviana-navy text-sm font-semibold">{detail}</p>
        </div>
        {dismissible && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="text-boliviana-navy/70 hover:bg-boliviana-navy/10 hover:text-boliviana-navy focus-visible:ring-boliviana-purple/50 -m-1.5 shrink-0 self-center"
          >
            <span className="sr-only">{t("dismiss")}</span>
            <X aria-hidden="true" className="size-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
