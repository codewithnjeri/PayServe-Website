import type { Metadata } from "next";
import {
  Building, Building2, CalendarCheck, Check, ClipboardList, Home, KeyRound, Minus, Receipt, ShoppingBag, Smartphone,
  Sparkles, Store, UserRound, Users, Wrench, Zap, Factory, Layers,
} from "lucide-react";
import { Button, Confirm, Heading, Section, TextLink } from "@/components/ui";
import { ImageSlot, MeterTile, PhoneReminder, QrPass, RentRoll } from "@/components/visuals";
import { BlogStrip, CtaBand, Faq, PageHero } from "@/components/sections";
import { ProjectsWithFilter } from "@/components/projects-filter";
import { faqs, site } from "@/lib/site";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "PayServe for Real Estate",
  description: "Rent and service charge billing, smart water and power meters, gate access control and property operations on one platform.",
};

const compare: [string, string, string][] = [
  ["Rent and service charge invoicing", "yes", "yes"],
  ["Automatic reminders", "yes", "SMS, WhatsApp, email"],
  ["M-Pesa and bank matching", "yes", "yes"],
  ["KRA eTIMS invoices", "Some", "yes"],
  ["Smart water meters (prepaid or postpaid)", "no", "yes"],
  ["Smart power meters", "no", "yes"],
  ["Gate access control (QR, one-time PIN)", "no", "yes"],
  ["Maintenance, bookings, procurement", "Some", "yes"],
];

const audiences = [
  { icon: Building2, who: "Developers", title: "Hand over units without billing gaps", text: "Billing starts from each owner's own handover date, with deposits and prepayments handled from day one." },
  { icon: Users, who: "Property managers", title: "Run every property from one screen", text: "Bill, collect, reconcile and report across your whole portfolio, without spreadsheets." },
  { icon: Home, who: "Homeowners and landlords", title: "See what your property earns", text: "Track rent, service charge and arrears in real time from the owner portal." },
  { icon: UserRound, who: "Residents and tenants", title: "Pay in seconds, see every charge", text: "Pay by M-Pesa or bank, get instant receipts and view your bills and usage in the resident portal." },
];

const operations = [
  { icon: Receipt, title: "Lease and Levy Management", text: "Rent and service charge from the right start date" },
  { icon: Wrench, title: "Maintenance and Incidents", text: "Log, assign and track every request to closure" },
  { icon: CalendarCheck, title: "Booking Management", text: "Shared amenities booked and billed" },
  { icon: ClipboardList, title: "Expenses and Procurement", text: "Property spending and approvals under control" },
  { icon: Layers, title: "Landlord and Resident Portal", text: "Bills, payments and requests in one app" },
  { icon: KeyRound, title: "Hand-Over Management", text: "Unit-by-unit handover tracking" },
  { icon: Sparkles, title: "Commercial Services (VAS)", text: "Resident add-on services such as housekeeping, booked and managed" },
  { icon: Smartphone, title: "Mobile Access", text: "Residents check bills, payments and requests from their phone" },
];

const types = [
  { icon: Building, title: "Residential buildings", text: "Rent, service charge and utilities in one bill." },
  { icon: Home, title: "Gated communities", text: "Billing, prepaid water and QR visitor access for the whole estate." },
  { icon: Building2, title: "Commercial buildings", text: "Timely bills, reminders and meter controls that keep tenants paying." },
  { icon: Store, title: "Retail centres", text: "Rent, service charge and utilities for every shop, in one view." },
  { icon: ShoppingBag, title: "Mixed-use developments", text: "Residential and commercial billing on one platform." },
  { icon: Factory, title: "Utility service providers", text: "Accurate water and power billing from smart meter readings." },
];

function Cell({ v }: { v: string }) {
  if (v === "yes") return <Check className="mx-auto size-5 text-success" aria-label="Yes" />;
  if (v === "no") return <Minus className="mx-auto size-5 text-muted" aria-label="No" />;
  return <span className="text-sm">{v}</span>;
}

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        crumb="Products / Real Estate"
        title={<>Collect rent without <span className="text-accent">chasing tenants.</span></>}
        intro="PayServe bills every unit on the right day, reminds residents automatically with PayServe OnTime, collects through M-Pesa and your bank, and runs your meters, gate and maintenance on the same platform."
        actions={<>
          <Button href="/book-demo?for=real-estate" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
          <Button href="#case" variant="outline" className="min-h-14 px-7 text-base">See customer stories</Button>
        </>}
        stats={[{ value: site.unitsBilled, label: "units on one platform across East Africa" }, { value: "500", label: "smart power meters at Altura, Upper Hill" }]}
        visual={
          <div className="relative mx-auto max-w-md">
            <RentRoll />
            <MeterTile kind="water" className="absolute -bottom-12 -left-6 hidden sm:block" />
          </div>
        }
      />

      {/* Why */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Heading eyebrow="Why PayServe for property" title="Most property platforms stop at rent." intro="PayServe bills your tenants, reads your meters and runs your gate on one platform, so you don't juggle three suppliers and three sets of records." />
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            <table className="w-full text-left">
              <thead className="bg-surface text-sm">
                <tr><th className="px-5 py-4 font-semibold">Feature</th><th className="px-4 py-4 text-center font-semibold text-muted">Typical property platform</th><th className="bg-navy-900 px-4 py-4 text-center font-bold text-white">PayServe</th></tr>
              </thead>
              <tbody>
                {compare.map(([f, a, b]) => (
                  <tr key={f} className="border-t border-line">
                    <td className="px-5 py-3.5 text-[15px]">{f}</td>
                    <td className="px-4 py-3.5 text-center text-muted"><Cell v={a} /></td>
                    <td className="bg-navy-50 px-4 py-3.5 text-center font-semibold text-navy-900"><Cell v={b} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Who it is for */}
      <Section tone="surface">
        <Heading eyebrow="Who it is for" title="One platform for everyone in the building" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.who} className="rounded-3xl bg-white p-7 shadow-card">
              <a.icon className="size-9 text-accent" aria-hidden />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{a.who}</p>
              <h3 className="mt-2 text-lg font-extrabold">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-body">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Billing */}
      <Section id="billing">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Billing and collections" title="Rent and service charge that pay on time" intro="Lease and levy billing from each owner's start date, automatic PayServe OnTime reminders for every unit, and M-Pesa and bank payments matched to the right account. See each unit's payment status as payments arrive, and spot late payers while there is still time to act." />
            <TextLink href="/invoicing#ontime" className="mt-7">Rent and service charge billing</TextLink>
          </div>
          <div className="relative flex justify-center rounded-[2rem] bg-surface p-8 sm:p-12">
            <div className="origin-top scale-90"><PhoneReminder /></div>
          </div>
        </div>
      </Section>

      {/* Meters and security */}
      <section className="border-y border-line bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Smart Meters and Security" title="Meters that bill themselves, and a secure gate" intro="Smart water and power meters, read remotely and billed automatically. Separately, access control secures the gate with QR and one-time PIN entry and a log of every visit." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/smart-meters" variant="accent">Explore Smart Meters</Button>
              <Button href="/access-control" variant="outline">Access control</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="space-y-6"><MeterTile kind="water" /><MeterTile kind="power" /></div>
            <QrPass />
          </div>
        </div>
      </section>

      {/* Operations */}
      <Section id="operations">
        <Heading eyebrow="Property operations" title="The day-to-day running of your property" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {operations.map((o) => (
            <div key={o.title} className="rounded-2xl border border-line p-6 transition-all hover:-translate-y-1 hover:border-navy-800 hover:shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-navy-50 text-navy-800"><o.icon className="size-5" /></span>
              <h3 className="mt-4 font-bold">{o.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* By property type */}
      <Section id="types" tone="surface">
        <Heading eyebrow="By property type" title="Built for every kind of property" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t, i) => (
            <div key={t.title} className="group overflow-hidden rounded-3xl bg-white shadow-card">
              <ImageSlot label={`Photo: ${t.title}`} icon="building" tone={i} className="h-40 rounded-none" />
              <div className="flex gap-4 p-6">
                <t.icon className="size-7 shrink-0 text-accent" aria-hidden />
                <div><h3 className="font-bold">{t.title}</h3><p className="mt-1 text-body">{t.text}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <Heading eyebrow="Latest projects" title="See our latest projects" />
        <div className="mt-8"><ProjectsWithFilter /></div>
      </Section>

      {/* Case study */}
      <Section id="case" tone="surface">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid-cols-2">
          <ImageSlot label="Altura, Upper Hill" src="/images/projects/altura.jpg" icon="power" className="min-h-80 rounded-none" />
          <div className="p-9 sm:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-600">Case study</p>
            <h2 className="mt-3 text-3xl font-extrabold">How Altura gets paid on time, every month</h2>
            <p className="mt-4 text-lg leading-relaxed text-body">500 smart power meters billed every month, invoices out on time, every payment matched to its unit, and late payers spotted early.</p>
            <blockquote className="mt-7 border-l-4 border-accent pl-5 font-display text-lg font-semibold leading-relaxed text-ink">
              &ldquo;Before PayServe, we only knew who had paid once our accountant finished reconciling. Now invoices go out on time, payments reach our account almost without effort, and we can see every unit&apos;s payment status as it happens.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted"><Confirm>[Name], [Title], Altura · draft, pending client approval</Confirm></p>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-navy-800"><Zap className="size-4 text-accent" /> Full story coming soon</p>
          </div>
        </div>
      </Section>

      <Faq
        title="Questions property managers ask us"
        items={[
          faqs.billManager,
          { q: "Can tenants pay the way they do now?", a: "Yes. Tenants pay by M-Pesa or bank as usual, and every payment is matched to the right unit." },
          { q: "Do you install the meters?", a: "Yes. We supply and install smart water and power meters, and connect them to billing." },
          faqs.start,
          faqs.pricing,
        ]}
      />
      <BlogStrip title="Read the guide" posts={[posts.meters, posts.water]} />
      <CtaBand demoHref="/book-demo?for=real-estate" title="Tell us about your property." text="Share your number of units and how you bill today. We will show you what PayServe would look like for your property." />
    </>
  );
}
