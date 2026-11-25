import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Smartphone, Gauge, Zap } from "lucide-react";
import { Button, CheckList, Heading, Pill, Section, TextLink } from "@/components/ui";
import { MeterTile, QrPass } from "@/components/visuals";
import { BlogStrip, CtaBand, PageHero } from "@/components/sections";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Smart water and power meters",
  description: "Water and power read remotely, billed automatically and paid by M-Pesa. Plus smart access control that keeps your gate secure.",
};

const meterModels = [
  { kind: "Water", name: "LoRa smart water meter", photo: "/images/meters/lora-water-meter.jpg", text: "PayServe-branded meter that sends readings over LoRa radio, so nobody has to walk the building to read it." },
  { kind: "Water", name: "Ultrasonic water meter", photo: "/images/meters/ultrasonic-water-meter.jpg", text: "Measures flow with ultrasound and shows usage on a digital display, with LoRa connectivity built in." },
  { kind: "Power", name: "Single-phase prepaid power meter", photo: "/images/meters/single-phase-power-meter.jpg", text: "For apartments and individual units. Residents buy credit by M-Pesa and it loads to the meter." },
  { kind: "Power", name: "Three-phase prepaid power meter", photo: "/images/meters/three-phase-power-meter.jpg", text: "For shops, offices and other larger loads, with the same prepaid billing as single-phase units." },
];

export default function SmartMetersPage() {
  return (
    <>
      <PageHero
        crumb="Smart Meters · real estate and utilities"
        title={<>Smart meters that <span className="text-accent">bill themselves.</span></>}
        intro="Water and power read remotely, billed automatically and paid by M-Pesa. Plus smart access control that keeps your gate secure."
        actions={<>
          <Button href="/book-demo?for=real-estate" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
          <Button href="/real-estate#case" variant="outline" className="min-h-14 px-7 text-base">See customer stories</Button>
        </>}
        stats={[{ value: "1,074", label: "smart water meters at Northlands Heights Apartments" }, { value: "500", label: "smart power meters at Altura, Upper Hill" }]}
        visual={<div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"><MeterTile kind="water" /><MeterTile kind="power" className="sm:mt-24" /></div>}
      />

      <Section>
        <Heading eyebrow="Metering" title="Water and power, billed automatically" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            { id: "water", title: "Smart Water Meters", head: "Bill every drop", items: ["Prepaid or postpaid", "Common areas and irrigation metered separately", "Bulk supply compared against metered use", "Unbilled consumption shown as a list"], photo: "/images/meters/lora-water-meter.jpg", alt: "PayServe LoRa smart water meter", guide: "/blog/smart-water-meters-apartments-kenya" },
            { id: "power", title: "Smart Power Meters", head: "Bill every watt", items: ["Remote readings", "Controlled meter-to-account register", "Residents pay by phone", "Clear billing periods and tariffs"], photo: "/images/meters/single-phase-power-meter.jpg", alt: "Single-phase prepaid power meter", guide: "/book-demo" },
          ].map((m) => (
            <article id={m.id} key={m.id} className="scroll-mt-32 overflow-hidden rounded-3xl border border-line bg-white">
              <div className="h-72 border-b border-line bg-white p-6">
                <Image src={m.photo} alt={m.alt} width={900} height={900} className="size-full object-contain" />
              </div>
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{m.title}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{m.head}</h3>
                <CheckList items={m.items} className="mt-6" />
                <TextLink href={m.guide} className="mt-7">{m.id === "water" ? "Read the water meter guide" : "Talk to us about power meters"}</TextLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="meters" tone="surface">
        <Heading eyebrow="Our meters" title="The meters we install" intro="Water and power meters that send readings to PayServe, so every unit is billed from real usage." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {meterModels.map((m) => (
            <article key={m.name} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
              <div className="h-56 border-b border-line p-5">
                <Image src={m.photo} alt={m.name} width={900} height={900} className="size-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">{m.kind}</p>
                <h3 className="mt-2 text-lg font-bold">{m.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{m.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-line bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="flex justify-center"><QrPass /></div>
          <div>
            <Heading eyebrow="Security · Access Control" title="Secure every gate." intro="Smart access control keeps your property secure and makes visits easy for residents and guests." />
            <CheckList items={["Residents pre-register guests", "Entry by QR code or one-time PIN", "Passes expire after the visit", "Every entry logged for audits"]} className="mt-8" />
            <Button href="/access-control" variant="accent" className="mt-9">Access control <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </section>

      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Heading eyebrow="Why prepaid works" title="Collect before consumption" intro="With prepaid water and power, residents pay before they use, so there are no utility arrears to chase." />
          <ol className="grid gap-4 sm:grid-cols-3" aria-label="How prepaid works">
            {[
              { icon: Smartphone, t: "Pay by M-Pesa", d: "Resident buys credit from any phone" },
              { icon: Zap, t: "Tokens load", d: "Credit reaches the meter automatically" },
              { icon: Gauge, t: "Use and track", d: "Usage is debited and low balance warned" },
            ].map((s, i) => (
              <li key={s.t} className="rounded-2xl bg-white p-6 text-center shadow-card">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-50 text-accent-600"><s.icon className="size-6" /></span>
                <p className="mt-4 text-xs font-bold text-muted">STEP {i + 1}</p>
                <p className="mt-1 font-bold">{s.t}</p>
                <p className="mt-1 text-sm text-body">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Heading eyebrow="Who it is for" title="Built for buildings and utility providers" />
            <div className="mt-8 flex flex-wrap gap-3">
              {["Residential buildings", "Gated communities", "Commercial buildings", "Retail centres", "Mixed-use developments", "Utility service providers"].map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-dashed border-navy-100 bg-navy-50 p-9">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-700">Planning a project?</p>
            <p className="mt-3 font-display text-2xl font-bold">Read our smart water meter buying and installation checklist before you compare quotes.</p>
            <TextLink href="/blog/smart-water-meters-apartments-kenya#what-to-check-before-you-install" className="mt-6">Smart water meter checklist</TextLink>
          </div>
        </div>
      </Section>

      <BlogStrip tone="surface" title="Read the guides" posts={[posts.water, posts.meters]} />
      <CtaBand demoHref="/book-demo?for=real-estate" title="Tell us your meter count." text="Share the number of units, the location and how you bill utilities today. We will scope the right setup for your property." />
    </>
  );
}
