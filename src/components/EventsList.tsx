import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { upcomingEvents, type CafeEvent } from "@/lib/events";

function EventRow({ event }: { event: CafeEvent }) {
  const t = useTranslations("events");
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const date = new Date(`${event.date}T00:00:00Z`);

  return (
    <div className="flex flex-col items-start gap-4 py-8 sm:flex-row">
      <div className="border-boliviana-navy text-boliviana-navy flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2">
        <span className="text-[10px] font-bold tracking-wide uppercase opacity-70">
          {format.dateTime(date, { month: "short", timeZone: "UTC" })}
        </span>
        <span className="font-script text-2xl leading-none">
          {format.dateTime(date, { day: "numeric", timeZone: "UTC" })}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-boliviana-navy/60 text-sm">
          {format.dateTime(date, {
            weekday: "short",
            day: "numeric",
            month: "short",
            timeZone: "UTC",
          })}{" "}
          · {event.startTime}–{event.endTime}
        </p>
        <h2 className="text-boliviana-navy text-2xl font-semibold">
          {event.title[locale]}
        </h2>
        <p className="text-boliviana-navy/80 mt-1 max-w-xl">
          {event.description[locale]}
        </p>

        {event.learnMoreUrl && (
          <a
            href={event.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-boliviana-navy/70 hover:text-boliviana-navy focus-visible:outline-boliviana-pink rounded-control mt-1 inline-block text-sm underline decoration-1 underline-offset-4 outline-offset-2 focus-visible:outline-2"
          >
            {event.learnMoreLabel?.[locale] ?? t("seePhotos")} →
          </a>
        )}

        <div className="mt-3">
          {event.registrationRequired ? (
            event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-boliviana-pink focus-visible:outline-boliviana-pink rounded-control inline-block px-4 py-1.5 text-sm font-semibold text-white outline-offset-2 hover:opacity-90 focus-visible:outline-2"
              >
                {t("register")} →
              </a>
            ) : (
              <p className="text-boliviana-navy/60 text-sm">
                {t("registrationRequired")}
              </p>
            )
          ) : (
            <p className="text-boliviana-navy/50 text-sm">
              {t("noRegistrationNeeded")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Events page content: shared intro, then a chronological list of upcoming events (Proposal 1). */
export function EventsList() {
  const t = useTranslations("events");
  const items = upcomingEvents();

  return (
    <main
      id="main-content"
      className="hero-tint flex flex-1 flex-col items-center rounded-t-[3rem] px-6 py-24 shadow-[0_12px_30px_-18px_rgba(28,21,82,0.3)] sm:rounded-t-[4rem] sm:px-10"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-boliviana-navy text-4xl font-semibold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="text-boliviana-navy/80 max-w-xl text-lg text-balance">
          {t("intro")}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-boliviana-navy/70 mt-14 text-lg">{t("empty")}</p>
      ) : (
        <div className="divide-boliviana-navy/10 mt-14 w-full max-w-2xl divide-y">
          {items.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
