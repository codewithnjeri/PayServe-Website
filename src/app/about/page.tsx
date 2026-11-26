import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Button, Heading, Section } from "@/components/ui";
import { CtaBand, FeatureCard, PageHero } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PayServe",
  description: "Invoicing, reminders and collections for businesses that send a lot of invoices, plus smart meters and access control for property.",
};

// Uses only copy that already appears elsewhere on the site.
// TODO: add PayServe's story, team and history once PayServe supplies them.
export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Company · About"
        title="About PayServe"
        intro="PayServe sends your invoices on time, reminds customers automatically, and collects and matches every payment through M-Pesa or your bank. Smart meters and access control for property."
        actions={<Button href="/book-demo" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>}
        stats={[{ value: site.unitsBilled, label: "units already billed on PayServe across East Africa" }]}
      />

      <Section>
        <Heading eyebrow="What we do" title="Invoicing that gets you paid on time" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="For every business"
            text="Invoicing, reminders and collections for businesses that send a lot of invoices."
            href="/invoicing"
            linkLabel="See invoicing"
          />
          <FeatureCard
            title="For real estate"
            text="Smart meters and access control for property, billed and collected through the same engine."
            href="/real-estate"
            linkLabel="See real estate"
          />
        </div>
      </Section>

      <Section tone="surface">
        <Heading eyebrow="Find us" title="Talk to the team" />
        <ul className="mt-8 space-y-4 text-body">
          <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-accent" /><span>{site.address.join(", ")}</span></li>
          <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex gap-3 hover:text-navy-800"><Phone className="size-5 text-accent" />{site.phone}</a></li>
          <li><a href={site.whatsapp} className="flex gap-3 hover:text-navy-800"><MessageCircle className="size-5 text-accent" />WhatsApp us</a></li>
        </ul>
      </Section>

      <CtaBand title="See PayServe with your own invoices." text="Three quick details and we will set up a demo around your business." />
    </>
  );
}
