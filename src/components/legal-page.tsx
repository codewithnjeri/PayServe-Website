import { PageHero } from "./sections";
import { Section } from "./ui";
import { site } from "@/lib/site";

/* Placeholder for the Privacy and Terms pages until PayServe publishes the full policies. */
export function LegalPage({ title, updated, subject }: { title: string; updated: string; subject: string }) {
  return (
    <>
      <PageHero crumb="Company · Legal" title={title} intro={`Last updated ${updated}`} />
      <Section>
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-body">
          <p>Our full {subject} is coming soon.</p>
          <p>
            If you have a question in the meantime, call us on{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-navy-800 underline underline-offset-4">{site.phone}</a>{" "}
            or <a href={site.whatsapp} className="font-semibold text-navy-800 underline underline-offset-4">WhatsApp us</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
