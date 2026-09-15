import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";

function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="py-6">
      <h2 className="text-boliviana-navy text-xl font-semibold">{heading}</h2>
      <div className="text-boliviana-navy/80 mt-2 max-w-2xl space-y-2 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/** Marks a legally-required field we don't have real business data for yet — never fill with invented facts. */
function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="text-boliviana-orange text-sm font-medium">{children}</p>
  );
}

/**
 * Impressum (German legal notice, § 5 DDG). Kept in German regardless of
 * site locale — it's a filing tied to German law, and machine-translating
 * statutory language risks changing its legal meaning (common practice on
 * German multilingual business sites: only the page chrome is localized).
 *
 * Several required fields are still placeholders (see Placeholder uses
 * below) — the operator's full legal name, VAT ID, commercial register
 * entry (if any), and the consumer dispute resolution stance are business
 * facts/decisions only the café owner can supply, and this page must not
 * go live with them unfilled.
 */
export function ImpressumDetails() {
  const t = useTranslations("impressum");

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

      <div
        aria-hidden="true"
        className="textile-stripe my-10 h-1.5 w-24 rounded-full"
      />

      <div className="divide-boliviana-navy/10 w-full max-w-2xl divide-y">
        <Section heading="Angaben gemäß § 5 DDG">
          <p>Boliviana</p>
          <p>{siteConfig.address.streetAddress}</p>
          <p>
            {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
          </p>
          <p>Deutschland</p>
          <Placeholder>
            Vertreten durch: [vollständiger Name der/des Inhaber:in – bitte
            ergänzen]
          </Placeholder>
        </Section>

        <Section heading="Kontakt">
          <p>Telefon: {siteConfig.phone.display}</p>
          <p>E-Mail: {siteConfig.email}</p>
        </Section>

        <Section heading="Umsatzsteuer-ID">
          <Placeholder>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
            [wird ergänzt]
          </Placeholder>
        </Section>

        <Section heading="Handelsregister">
          <Placeholder>
            Registergericht und Registernummer, sofern eingetragen: [wird
            ergänzt]
          </Placeholder>
        </Section>

        <Section heading="Verbraucherstreitbeilegung">
          <Placeholder>
            Angabe zur Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle (VSBG): [wird ergänzt]
          </Placeholder>
        </Section>

        <Section heading="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </Section>

        <Section heading="Haftung für Links">
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter (z. B.
            Instagram), auf deren Inhalte wir keinen Einfluss haben. Deshalb
            können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
            Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt
            der Verlinkung nicht erkennbar. Eine permanente inhaltliche
            Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Links
            umgehend entfernen.
          </p>
        </Section>

        <Section heading="Urheberrecht">
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Fotos in der Galerie stammen, sofern nicht anders gekennzeichnet,
            von den jeweils verlinkten Instagram-Profilen von Die Seele
            Boliviens, Caraya Coffee und Miskisimi.
          </p>
        </Section>
      </div>

      <div
        aria-hidden="true"
        className="textile-stripe mt-10 h-1.5 w-24 rounded-full"
      />
    </main>
  );
}
