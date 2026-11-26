import type { Metadata } from "next";
import { BarChart3, Bell, FileText, HandCoins, RefreshCcw, ToggleRight } from "lucide-react";
import { Button, cx, Heading, Section, TextLink } from "@/components/ui";
import { ImageSlot, InvoiceRun } from "@/components/visuals";
import { CtaBand, Faq, PageHero, Testimonial } from "@/components/sections";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Built for businesses that send a lot of invoices",
  description: "PayServe automates invoicing, reminders and payment matching for real estate, distribution, logistics, security and professional services.",
};

const fits = [
  "Send more invoices each month than your team can follow up by hand",
  "Get paid by M-Pesa or bank transfer, often without a clear reference",
  "Spend days at month-end matching payments to customers",
  "Cannot say how much of what you billed has been collected",
];

const sectors = [
  { id: "real-estate", title: "Real Estate", head: "Rent, service charge and utilities, paid on time", text: "Lease and levy billing, smart water and power meters, and visitor access for every kind of property.", href: "/real-estate", photo: "Photo: apartment block", icon: "building" as const },
  { id: "distribution", title: "Distribution and Wholesale", head: "Get paid for what you deliver", text: "Invoice every order and retailer account, with automatic reminders on credit terms.", photo: "Photo: warehouse", icon: "building" as const },
  { id: "logistics", title: "Logistics and Freight", head: "Every shipment invoiced, every recharge recovered", text: "Invoice each shipment and recharge costs to importers, with automatic reminders and payments matched to the right job.", photo: "Photo: container yard or truck fleet", icon: "camera" as const },
  { id: "security", title: "Security Services", head: "Monthly contracts, billed on time", text: "Bill every client site each month, remind clients automatically and match each payment to the right contract.", photo: "Photo: guard at a client site", icon: "gate" as const },
  { id: "professional", title: "Professional and B2B Services", head: "Retainers and project fees, followed up", text: "Recurring invoices for retainers, milestone billing for projects and reminders that keep clients current.", photo: "Photo: office team", icon: "camera" as const },
];

const platform = [
  { icon: FileText, title: "Invoicing", text: "Bulk, recurring and one-off invoices with your branding" },
  { icon: Bell, title: "PayServe OnTime", text: "Automatic reminders and revenue assurance" },
  { icon: HandCoins, title: "Collections (optional)", text: "M-Pesa and bank collection, matched and receipted" },
  { icon: BarChart3, title: "Reporting", text: "Overdue accounts, collections and billed versus collected" },
  { icon: RefreshCcw, title: "Accounting sync", text: "Invoices and payments posted to your books" },
  { icon: ToggleRight, title: "Your choice", text: "Start with invoicing, add collections when you are ready" },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumb="Products · built for"
        title="Send hundreds of invoices. Spend far less time chasing payment."
        intro="PayServe automates invoicing, reminders and payment matching for any business that sends a lot of invoices every month."
        actions={<>
          <Button href="/book-demo" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
          <Button href="/#how" variant="outline" className="min-h-14 px-7 text-base">See how it works</Button>
        </>}
        visual={
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <p className="font-display text-xl font-bold">PayServe fits if you…</p>
            <ul className="mt-5 space-y-4">
              {fits.map((f) => (
                <li key={f} className="flex gap-3 text-body"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-navy-950">✓</span>{f}</li>
              ))}
            </ul>
          </div>
        }
      />

      <Section>
        <Heading eyebrow="Built for" title="One engine, five kinds of business" />
        <div className="mt-12 space-y-6">
          {sectors.map((s, i) => (
            <article id={s.id} key={s.id} className={cx("grid scroll-mt-32 items-stretch overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-2", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
              <ImageSlot label={s.photo} icon={s.icon} tone={i} className="min-h-64 rounded-none" />
              <div className="flex flex-col justify-center p-9 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{s.title}</p>
                <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{s.head}</h3>
                <p className="mt-4 text-lg leading-relaxed text-body">{s.text}</p>
                {s.href && <TextLink href={s.href} className="mt-6">Explore Real Estate</TextLink>}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Heading center eyebrow="The platform" title="One platform from invoice to cash" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platform.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-card">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-800"><p.icon className="size-6" /></span>
              <div><h3 className="font-bold">{p.title}</h3><p className="mt-1 text-body">{p.text}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Proven at scale" title="Proven at scale" intro={`PayServe already bills ${site.unitsBilled} units across East Africa. The same engine runs invoicing for your business, whatever you sell.`} />
            <div className="mt-8"><InvoiceRun /></div>
          </div>
          <Testimonial
            quote="Manual invoicing meant late payments and slow reconciliation. With PayServe we spot late payers early and act fast, and our collections now arrive on time month after month."
            who="Altura, Upper Hill"
            link={{ href: "/real-estate#case", label: "Read the Altura story" }}
          />
        </div>
      </Section>

      <Faq
        title="Questions"
        items={[
          faqs.billManager,
          { q: "Do I need to be in real estate to use PayServe?", a: "No. Invoicing, PayServe OnTime reminders, collections and reporting work for any business. Smart meters, access control and property operations are built for real estate and utility providers." },
          { q: "Can I use PayServe for invoicing only?", a: "Yes. Send invoices and automatic reminders through PayServe, and keep collecting through your own Paybill or bank. Add collections whenever you want." },
          { q: "Can my customers keep paying the way they do now?", a: "Yes. PayServe works with M-Pesa and Kenya's major banks, and matches payments automatically." },
          { ...faqs.integrations, q: "Will it work with my accounting system?" },
          { ...faqs.start, q: "How long does setup take?" },
          faqs.pricing,
          { q: "Are PayServe invoices eTIMS compliant?", a: "Yes. Every invoice is issued through KRA eTIMS, so your customers can claim it as an expense." },
        ]}
      />
      <CtaBand title="Show us your invoice run." text="Tell us how many invoices you send a month and how you get paid. We will show you how PayServe gets them paid on time." />
    </>
  );
}
