import type { Metadata } from "next";
import { ArrowRight, BarChart3, Bell, Check, FileText, HandCoins } from "lucide-react";
import { Button, CheckList, cx, Heading, Section, TextLink } from "@/components/ui";
import { AgingDashboard, InvoiceRun, PhoneReminder } from "@/components/visuals";
import { BlogStrip, CtaBand, Faq, IntegrationsMarquee, PageHero, ReminderSchedule } from "@/components/sections";
import { Carousel } from "@/components/interactive";
import { faqs, insightBullets, ontimeBullets, site } from "@/lib/site";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "PayServe OnTime: invoicing, reminders and collections",
  description: "Send every invoice on time, follow up automatically, and choose whether PayServe collects for you.",
};

const tour = [
  { step: 1, title: "Send every invoice on the same day", text: "Upload or sync your customers, and PayServe issues every invoice through KRA eTIMS in one run.", visual: <InvoiceRun /> },
  { step: 2, title: "PayServe OnTime reminds for you", text: "Reminders go out by SMS, WhatsApp and email on your schedule.", visual: <div className="scale-[0.72]"><ReminderSchedule /></div> },
  { step: 3, title: "Your customer pays in one tap", text: "The Pay now link opens an M-Pesa prompt on their phone. Bank transfers work too.", visual: <div className="origin-top scale-[0.62]"><PhoneReminder /></div> },
  { step: 4, title: "Payment matched, receipt sent", text: "PayServe matches the payment to the invoice and stops the reminders.", visual: (
    <div className="w-72 rounded-2xl border border-line bg-white p-5 shadow-lift">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">INV-2048 · Unit B-1204</p>
      <p className="mt-2 font-display text-2xl font-extrabold">KES 45,000</p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-bold text-success"><Check className="size-4" /> Paid · matched</p>
      <p className="mt-3 text-sm text-muted">M-Pesa SJK4XY12AB · receipt sent by SMS</p>
    </div>
  ) },
  { step: 5, title: "See who is late, early", text: "Overdue by age, per customer, as payments arrive.", visual: <div className="origin-top scale-[0.8]"><AgingDashboard /></div> },
];

const parts = [
  { id: "invoicing", icon: FileText, tag: "Invoicing and Billing", title: "Send the right invoice, on time, every time", text: "Hundreds or thousands of recurring, scheduled or one-off invoices in one run, issued through KRA eTIMS." },
  { id: "ontime-part", icon: Bell, tag: "PayServe OnTime", title: "Every invoice, followed through", text: "Reminders by SMS, WhatsApp and email run on their own, each with a Pay now link, and every shilling billed is tracked until it is paid." },
  { id: "collections", icon: HandCoins, tag: "Payments and Collections · optional", title: "Every shilling, matched", text: "PayServe collects by M-Pesa and bank, matches each payment to its invoice and sends the receipt." },
  { id: "sync", icon: BarChart3, tag: "Reporting and Accounting Sync", title: "Your books, always current", text: "Invoices and payments post to your accounting system, with reports your finance team will use." },
];

export default function InvoicingPage() {
  return (
    <>
      <PageHero
        crumb="Products · for every business"
        title={<>Stop chasing invoices. <span className="text-accent">Start getting paid.</span></>}
        intro="Send every invoice on time, follow up automatically, and choose whether PayServe collects for you."
        actions={<>
          <Button href="/book-demo" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
          {/* TODO: add a "Watch a 2-minute tour" button here once the tour video exists. */}
        </>}
        stats={[{ value: "14 days", label: "to go live, with your customers imported for you" }, { value: site.unitsBilled, label: "units already billed on PayServe" }]}
        visual={<div className="flex justify-center"><PhoneReminder /></div>}
      />

      {/* Product tour */}
      <Section id="tour">
        <Heading eyebrow="Product tour" title="From invoice to paid, in five steps." />
        <Carousel label="Product tour" className="mt-2">
          {tour.map((t) => (
            <article key={t.step} className="w-[86%] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-white sm:w-[48%] lg:w-[36%]">
              <div className="flex h-72 items-start justify-center overflow-hidden bg-surface px-6 pt-8">{t.visual}</div>
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Step {t.step}</p>
                <h3 className="mt-2 text-xl font-extrabold">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{t.text}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </Section>

      {/* Two ways */}
      <Section tone="surface">
        <Heading center eyebrow="Two ways to use PayServe" title="Start with invoicing. Add collections when you are ready." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            { name: "Invoicing", who: "You already collect through your own Paybill or bank", items: ["Invoicing and Billing", "PayServe OnTime reminders", "Reporting and Accounting Sync"], featured: false },
            { name: "Invoicing and Collections", who: "You want every payment matched and receipted automatically", items: ["Everything in Invoicing", "Payments and Collections through M-Pesa and banks", "Automatic matching and receipts"], featured: true },
          ].map((p) => (
            <div key={p.name} className={cx("relative flex flex-col rounded-3xl p-9", p.featured ? "bg-navy-900 text-white shadow-lift" : "border border-line bg-white")}>
              {p.featured && <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-navy-950">Most complete</span>}
              <h3 className="text-2xl font-extrabold">{p.name}</h3>
              <p className={cx("mt-2", p.featured ? "text-white/70" : "text-body")}>{p.who}</p>
              <CheckList light={p.featured} items={p.items} className="mt-7 flex-1" />
              <Button href="/book-demo" variant={p.featured ? "accent" : "outline"} className="mt-8 self-start">Get a quote</Button>
            </div>
          ))}
        </div>
      </Section>

      {/* The four parts */}
      <Section>
        <Heading eyebrow="The four parts" title="Everything from invoice to cash" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {parts.map((p) => (
            <div id={p.id} key={p.id} className="flex scroll-mt-32 flex-col rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="grid size-14 place-items-center rounded-2xl bg-navy-900 text-white"><p.icon className="size-6" /></span>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{p.tag}</p>
              <h3 className="mt-2 text-xl font-extrabold">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-body">{p.text}</p>
              <TextLink href="/book-demo" className="mt-6 text-sm">Learn more</TextLink>
            </div>
          ))}
        </div>
      </Section>

      {/* OnTime */}
      <section id="ontime" className="border-y border-line bg-white scroll-mt-28 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Heading eyebrow="PayServe OnTime" title="Reminders your customers actually see." intro="PayServe OnTime reaches customers on the channels they read, and makes paying a single tap." />
            <CheckList items={ontimeBullets} className="mt-8" />
          </div>
          <ReminderSchedule />
        </div>
      </section>

      {/* Reporting */}
      <Section id="reporting">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Late-payer insights" title="Spot late payers before month-end." intro="Manual reconciliation tells you who didn't pay after the chance to act has passed. PayServe shows you as payments arrive." />
            <CheckList items={insightBullets} className="mt-8" />
          </div>
          <div className="flex justify-center rounded-[2rem] bg-surface p-8 sm:p-12"><AgingDashboard /></div>
        </div>
      </Section>

      {/* Built for volume */}
      <Section tone="surface">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Heading eyebrow="Built for volume" title="Made for businesses that send a lot of invoices" intro={`If you send hundreds or thousands of invoices a month, manual invoicing and follow-up cost you time and cash. PayServe already bills ${site.unitsBilled} units across East Africa. Your invoice run is in safe hands.`} />
            <TextLink href="/invoicing/industries" className="mt-6">Every business we work with</TextLink>
          </div>
          <div className="flex justify-center"><InvoiceRun /></div>
        </div>
        <div className="mt-14"><IntegrationsMarquee /></div>
      </Section>

      <Faq items={[faqs.billManager, faqs.collect, faqs.integrations, faqs.start, faqs.pricing, faqs.etims]} />
      <BlogStrip title="Read the guide" posts={[posts.paid, posts.water, posts.meters]} />
      <CtaBand
        title="See it with your own numbers."
        text="Bring a month of invoices to your demo, and we will show you what PayServe would do with them."
        secondary={<a href={site.whatsapp} className="inline-flex items-center gap-1 text-sm text-body hover:text-navy-800">Or WhatsApp us <ArrowRight className="size-4" /></a>}
      />
    </>
  );
}
