import Link from "next/link";
import {
  ArrowRight, BarChart3, Bell, Building2, CheckCircle2, FileText, HandCoins, Headphones, Layers, MessageSquare,
  Receipt, ShieldCheck, Sparkles, Truck, Wallet, Warehouse, Briefcase,
} from "lucide-react";
import { Button, CheckList, Container, cx, Heading, Section, TextLink } from "@/components/ui";
import { AgingDashboard, ImageSlot, MeterTile, PhoneReminder, QrPass, RentRoll } from "@/components/visuals";
import {
  BankMarquee, BlogStrip, BrandMark, CtaBand, Faq, IntegrationsMarquee, ProjectsCarousel, ReminderSchedule,
} from "@/components/sections";
import { Carousel } from "@/components/interactive";
import { banks, faqs, insightBullets, ontimeBullets, site } from "@/lib/site";
import { posts } from "@/content/posts";

const realEstateSolutions = [
  { group: "Metering and billing", title: "Smart Water Meters", head: "Bill every drop.", text: "Prepaid or postpaid water meters, read remotely and billed automatically. Common areas and irrigation are metered separately, and bulk supply is checked against metered use, so losses show up.", proof: "1,074 meters at Northlands Heights Apartments", href: "/smart-meters#water", cta: "Smart water meters", icon: "water" as const },
  { group: "Metering and billing", title: "Smart Power Meters", head: "Bill every watt.", text: "Smart power meters with remote readings and a controlled meter-to-account register. Residents pay by phone and get clear bills.", proof: "500 meters at Altura, Upper Hill", href: "/smart-meters#power", cta: "Smart power meters", icon: "power" as const },
  { group: "Metering and billing", title: "Rent Collection", head: "Bill every tenant.", text: "Bill rent and service charge from each tenant's start date, remind tenants automatically with PayServe OnTime, and match every M-Pesa and bank payment to the right unit.", proof: "Service charge billed from each owner's handover date at Northlands Heights", href: "/real-estate#billing", cta: "Rent and service charge billing", icon: "building" as const },
  { group: "Security", title: "Access Control", head: "Secure every gate.", text: "Residents pre-register guests from their phone, guests enter with a QR code or one-time PIN, passes expire after the visit, and every entry is logged.", proof: "QR visitor access at Northlands Heights", href: "/access-control", cta: "Access control", icon: "gate" as const },
  { group: "Property operations", title: "Maintenance", head: "Track every repair.", text: "Residents log requests from the resident portal. Your team assigns, tracks and closes each one, with every incident on record.", proof: "Every incident on record", href: "/real-estate#operations", cta: "Maintenance", icon: "repair" as const },
];

const stats = [
  { value: site.unitsBilled, label: "units billed on PayServe across East Africa" },
  { value: "KES 60M", label: "collected using PayServe every month" },
  { value: "7,500", label: "invoices sent every month" },
  { value: "92%", label: "of invoices paid on time, up from 70% before PayServe" },
];

const stories = [
  { org: "Altura", type: "Mixed-use, Upper Hill", quote: "Before PayServe, we invoiced by hand and only knew who had paid once our accountant finished reconciling. By then it was too late to chase anyone. Now invoices go out on time every month, payments reach our account almost without effort, we spot late payers early, and we can see every unit's payment status as it happens.", who: "Altura, Upper Hill" },
  { org: "Northlands Heights", type: "1,000+ homes", quote: "1,074 smart water meters on prepaid billing, service charge billed from each owner's handover date, and every transaction posted to Zoho.", who: "Results story" },
  { org: "Sarit Center", type: "Commercial", quote: "Rent, service charge and utilities billed to every shop on the same day each month, with payments matched to each tenant.", who: "Results story" },
  { org: "Mumwe Gardens", type: "Gated community", quote: "Prepaid water and service charge for every home, plus QR visitor access at the gate.", who: "Results story" },
];

const problems = [
  "Invoices go out late, because month-end never leaves you enough time.",
  "You make the same awkward call to the same customer, every month.",
  "Money lands with no reference, and you spend days working out who paid.",
  "By the time you know who hasn't paid, it's too late to ask nicely.",
];

const steps = [
  { n: 1, title: "Bill", text: "Create invoices in bulk or on a schedule and send them out on the same day, every time.", icon: FileText },
  { n: 2, title: "Remind", text: "PayServe OnTime sends reminders by SMS, WhatsApp and email before and after the due date, each with a Pay now link, so nobody has to chase.", icon: Bell },
  { n: 3, title: "Collect", tag: "optional", text: "Let PayServe collect by M-Pesa and bank, with every payment matched and receipted. Or keep your own Paybill.", icon: HandCoins },
  { n: 4, title: "Track", text: "See what you billed against what was paid, and which accounts are overdue.", icon: BarChart3 },
];

const builtFor = [
  { title: "Real Estate", text: "Rent, service charge, utilities and property operations, plus smart meters", href: "/real-estate", icon: Building2 },
  { title: "Distribution and Wholesale", text: "Every order and retailer account invoiced and followed up", href: "/invoicing/industries#distribution", icon: Warehouse },
  { title: "Logistics and Freight", text: "Every shipment invoiced and every recharge followed up", href: "/invoicing/industries#logistics", icon: Truck },
  { title: "Security Services", text: "Monthly contract invoices for every client site", href: "/invoicing/industries#security", icon: ShieldCheck },
  { title: "Professional and B2B Services", text: "Retainers and project fees, billed and followed up", href: "/invoicing/industries#professional", icon: Briefcase },
];

const why = [
  { title: "Built for Kenyan payments", text: "M-Pesa and bank integrations come standard.", icon: Wallet },
  { title: "Nothing slips through", text: "Every invoice is tracked until it is paid.", icon: CheckCircle2 },
  { title: "Start small", text: "Begin with invoicing; add collections when you are ready.", icon: Layers },
  { title: "Your books stay current", text: "Invoices and payments post to your accounting system, such as Zoho.", icon: Receipt },
  { title: "Local support", text: "Talk to a real team on WhatsApp, phone or ticket.", icon: Headphones },
  { title: "eTIMS compliant", text: "Every invoice goes through KRA eTIMS.", icon: ShieldCheck },
];

function SolutionVisual({ i }: { i: number }) {
  if (i === 0) return <MeterTile kind="water" />;
  if (i === 1) return <MeterTile kind="power" />;
  if (i === 2) return <RentRoll rows={3} className="w-80" />;
  if (i === 3) return <QrPass />;
  return null;
}

export default function Home() {
  return (
    <>
      {/* 01 · Hero */}
      <section className="border-b border-line bg-white relative overflow-hidden">
        <Container className="relative grid items-center gap-14 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-20">
          <div className="animate-rise">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-body">
              <Sparkles className="size-4 text-accent" /> Stop chasing. Start getting paid.
            </p>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.03] sm:text-[4.1rem]">
              Invoicing that gets you <span className="text-accent-600">paid on time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              PayServe sends your invoices on time, reminds customers automatically, and collects and matches every payment through M-Pesa or your bank. Property companies rely on it every month to bill rent, service charge and utilities. Put the same platform to work on your invoices.
            </p>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-muted">What do you need?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { tag: "For property", title: "PayServe for Real Estate", text: "Rent, service charge, smart meters and access control.", href: "/real-estate", cta: "Explore Real Estate" },
                { tag: "Business", title: "PayServe OnTime", text: "Invoices out on time, automatic reminders, payments matched.", href: "/invoicing", cta: "Explore PayServe OnTime" },
              ].map((c) => (
                <Link key={c.title} href={c.href} className="group rounded-2xl border border-line bg-white p-5 backdrop-blur transition-colors hover:border-accent hover:bg-navy-50">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-700">{c.tag}</span>
                  <span className="mt-1.5 block font-display text-lg font-bold">{c.title}</span>
                  <span className="mt-1 block text-sm text-body">{c.text}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">{c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/book-demo" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
              <Button href="#how" variant="outline" className="min-h-14 px-7 text-base">See How It Works</Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-body">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-accent" /> Live in 14 days</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-accent" /> We import your customers for you</li>
              {/* TODO: add a "Watch a 2-minute tour" link here once the tour video exists. */}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative sm:ml-auto sm:w-fit sm:pr-6 lg:pr-16"><PhoneReminder /></div>
            <div className="absolute -bottom-14 left-0 z-10 hidden w-80 rotate-[-3deg] sm:block lg:-left-12"><AgingDashboard className="p-4" /></div>
          </div>
        </Container>

        <div className="relative border-t border-line bg-white">
          <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
            <p className="text-sm text-body">Connected to M-Pesa and Kenya&apos;s major banks · Invoices issued through KRA eTIMS</p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 font-display text-[15px] font-bold text-navy-900">
              {banks.slice(0, 5).map((b) => <li key={b.name} className="inline-flex items-center gap-2 whitespace-nowrap"><BrandMark brand={b} /></li>)}
              <li className="text-sm font-semibold text-muted">+ 10 more banks</li>
            </ul>
          </Container>
        </div>
      </section>

      {/* 02 · Real estate solutions: RealPage-style pillar cards */}
      <Section id="real-estate">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading
            eyebrow="Real estate solutions"
            title="Collect rent without the awkward conversations."
            intro="Smart meters and rent collection, plus gate security and maintenance, for developers, property managers and estates. Most property platforms stop at rent. PayServe also runs your meters and your gate."
          />
          <Button href="/real-estate" variant="outline">Explore real estate solutions</Button>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {realEstateSolutions.map((s, i) => (
            <article key={s.title} className={cx("group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lift", i < 2 ? "lg:col-span-3" : "lg:col-span-2")}>
              <div className="relative">
                <ImageSlot label={`Photo: ${s.title}`} icon={s.icon} tone={i} className={cx("rounded-none", i < 2 ? "h-64" : "h-52")} />
                <div className={cx("absolute inset-0 flex items-center justify-center p-6 [&>*]:transition-transform", i < 2 ? "[&>*]:scale-[0.85] group-hover:[&>*]:scale-90" : "[&>*]:scale-[0.62] group-hover:[&>*]:scale-[0.66]")}>
                  <SolutionVisual i={i} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{s.group} · {s.title}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{s.head}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-body">{s.text}</p>
                <p className="mt-5 rounded-xl bg-accent-50 px-4 py-3 text-sm font-semibold text-[#8a4f00]">{s.proof}</p>
                <TextLink href={s.href} className="mt-5">{s.cta}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Latest projects */}
      <Section tone="surface" id="projects" className="pt-16">
        <Heading eyebrow="Latest projects" title="See our latest projects" />
        <div className="mt-2"><ProjectsCarousel /></div>
        <p className="mt-6 text-body">
          {site.unitsBilled} units across East Africa, including Sarit Center, Yaya Center and Northlands Heights.{" "}
          <TextLink href="/real-estate">Explore real estate solutions</TextLink>
        </p>
      </Section>

      {/* 03 · Proof */}
      <section className="border-y border-line bg-white relative overflow-hidden py-20 sm:py-24">
        <Container className="relative">
          <Heading center eyebrow="Proof" title="Trusted where billing is hardest" />
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-5xl font-extrabold text-ink">{s.value}</dd>
                <dd className="mt-3 text-body">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted">
            {["Altura", "Sarit Center", "Yaya Center", "JJ Tower", "Mumwe Gardens"].map((l) => (
              <span key={l} className="font-display text-xl font-extrabold tracking-tight">{l}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Client stories */}
      <Section id="stories">
        <Heading eyebrow="Client stories" title="The engine that bills 5,878 units runs invoicing for any business." />
        <Carousel label="Client stories" className="mt-4">
          {stories.map((s, i) => (
            <figure key={s.org} className={cx("flex w-[88%] shrink-0 snap-start flex-col rounded-3xl p-9 sm:w-[60%] lg:w-[46%]", i === 0 ? "bg-navy-900 text-white" : "border border-line bg-surface")}>
              <p className={cx("text-xs font-bold uppercase tracking-[0.14em]", i === 0 ? "text-accent" : "text-navy-700")}>{s.org} · {s.type}</p>
              <blockquote className={cx("mt-5 flex-1 font-display font-semibold leading-relaxed", i === 0 ? "text-xl" : "text-lg text-ink")}>
                {i === 0 ? <>&ldquo;{s.quote}&rdquo;</> : s.quote}
              </blockquote>
              <figcaption className={cx("mt-6 text-sm", i === 0 ? "text-white/65" : "text-muted")}>{s.who}</figcaption>
              {i === 0 && (
                <Link href="/real-estate#case" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read the Altura story <ArrowRight className="size-4" />
                </Link>
              )}
            </figure>
          ))}
        </Carousel>
      </Section>

      {/* 04 · The problem */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Heading eyebrow="The problem" title="You sent the reminder. You made the call. You waited. Again." />
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => (
                <li key={p} className="rounded-2xl border border-line bg-white p-6 leading-relaxed text-body">
                  <MessageSquare className="mb-3 size-6 text-accent" aria-hidden />{p}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-xl font-bold text-navy-900">PayServe does the chasing, so you don&apos;t have to.</p>
          </div>
        </div>
      </Section>

      {/* 05 · How it works */}
      <Section id="how">
        <Heading center eyebrow="How it works" title="From invoice to paid" intro="Start with invoicing. Add collections when you are ready." />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-navy-100 via-accent/60 to-navy-100 lg:block" aria-hidden />
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-line bg-white p-7 shadow-card">
              <span className="relative grid size-16 place-items-center rounded-2xl bg-navy-900 text-white"><s.icon className="size-7" /></span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted">Step {s.n}</p>
              <h3 className="mt-1 text-xl font-extrabold">{s.title} {s.tag && <span className="ml-1 rounded-full bg-surface px-2 py-0.5 align-middle text-[11px] font-semibold uppercase text-muted">{s.tag}</span>}</h3>
              <p className="mt-3 leading-relaxed text-body">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center"><TextLink href="/invoicing">See how it works</TextLink></div>
      </Section>

      {/* 06 · PayServe OnTime */}
      <section className="border-y border-line bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Heading eyebrow="PayServe OnTime" title="PayServe OnTime does the chasing for you." intro="Most late payments come from invoices nobody followed up. PayServe OnTime sends reminders on the schedule you set, flags overdue accounts and tracks every shilling you billed until it is paid." />
            <CheckList items={ontimeBullets} className="mt-8" />
            <Button href="/invoicing#ontime" variant="accent" className="mt-9">Explore PayServe OnTime <ArrowRight className="size-4" /></Button>
          </div>
          <ReminderSchedule />
        </Container>
      </section>

      {/* 07 · Late-payer insights */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 flex justify-center rounded-[2rem] bg-surface p-8 sm:p-12 lg:order-1"><AgingDashboard /></div>
          <div className="order-1 lg:order-2">
            <Heading eyebrow="Late-payer insights" title="Spot late payers before month-end." intro="Manual reconciliation tells you who didn't pay after the chance to act has passed. PayServe shows you as payments arrive." />
            <CheckList items={insightBullets} className="mt-8" />
            <TextLink href="/invoicing#reporting" className="mt-8">See reporting</TextLink>
          </div>
        </div>
      </Section>

      {/* 08 · Built for */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Built for" title="Built for high-volume billing." />
          <TextLink href="/invoicing/industries">Every business we work with</TextLink>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {builtFor.map((b) => (
            <Link key={b.title} href={b.href} className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-navy-800 hover:shadow-lift">
              <b.icon className="size-8 text-navy-800" aria-hidden />
              <h3 className="mt-5 font-bold">{b.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{b.text}</p>
              <ArrowRight className="mt-4 size-5 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </Section>

      {/* 09 · Payments */}
      <Section>
        <Heading eyebrow="Payments" title="Every shilling, matched." intro="Choose Invoicing and Collections, and PayServe connects to M-Pesa and Kenya's major banks. Payments are matched to the right account, receipts go out automatically, and your finance team reviews instead of retyping." />
        <div className="mt-12 space-y-8">
          <BankMarquee />
          <IntegrationsMarquee />
        </div>
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center">
          <ShieldCheck className="size-10 shrink-0 text-navy-800" aria-hidden />
          <p className="text-body"><b className="text-ink">KRA eTIMS, built in.</b> Every invoice is issued through eTIMS, so your customers can claim the expense and your business stays compliant.</p>
        </div>
      </Section>

      {/* 10 · Why PayServe */}
      <Section tone="surface">
        <Heading center eyebrow="Why PayServe" title="Why businesses switch to PayServe" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-card">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600"><w.icon className="size-6" /></span>
              <div><h3 className="font-bold">{w.title}</h3><p className="mt-1 text-body">{w.text}</p></div>
            </div>
          ))}
        </div>
      </Section>

      {/* 11 · Blog */}
      <BlogStrip title="Guides for getting paid on time" posts={[posts.paid, posts.meters, posts.water]} />

      {/* 12 · Questions */}
      <Faq items={[faqs.billManager, faqs.collect, faqs.integrations, faqs.start, faqs.pricing, faqs.etims]} />

      {/* 13 · Closing CTA */}
      <CtaBand title="Stop chasing. Start getting paid." text="Book a demo. Tell us how many invoices you send each month, and we will show you how PayServe gets them paid on time." />
    </>
  );
}
