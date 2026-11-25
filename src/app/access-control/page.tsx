import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, QrCode, ScanLine, UserPlus } from "lucide-react";
import { Button, Heading, Pill, Section, TextLink } from "@/components/ui";
import { ImageSlot, QrPass } from "@/components/visuals";
import { CtaBand, PageHero } from "@/components/sections";

export const metadata: Metadata = {
  title: "Access Control: secure gate access for properties",
  description: "Residents invite guests from their phone, guards verify them in seconds, and every entry is logged.",
};

const steps = [
  { icon: UserPlus, title: "Invite", text: "A resident pre-registers a guest in the app." },
  { icon: QrCode, title: "Share", text: "The guest receives a QR code or one-time PIN." },
  { icon: ScanLine, title: "Verify", text: "The guard scans or enters it at the gate, and the resident is notified on arrival." },
  { icon: ClipboardList, title: "Log", text: "The pass expires after the visit, and every entry is recorded." },
];

const roles = [
  { who: "Residents", text: "Invite guests in seconds and know when they arrive.", shot: "Screenshot: resident inviting a guest" },
  { who: "Guards", text: "Know who is expected and verify visitors in seconds.", shot: "Screenshot: guard's expected-visitor list" },
  { who: "Management", text: "A full gate history for audits and incident follow-up.", shot: "Screenshot: gate log by date" },
];

export default function AccessControlPage() {
  return (
    <>
      <PageHero
        crumb={<><Link href="/real-estate" className="hover:underline">Real Estate</Link> / Security</>}
        title="Secure gate access for properties."
        intro="Residents invite guests from their phone, guards verify them in seconds, and every entry is logged."
        actions={<>
          <Button href="/book-demo?for=real-estate" variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
          <Button href="#how" variant="outline" className="min-h-14 px-7 text-base">See how it works</Button>
        </>}
        visual={<div className="flex justify-center"><QrPass className="scale-110" /></div>}
      />

      <Section id="how" tone="surface">
        <Heading center eyebrow="How it works" title="Four steps at the gate" />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-white p-7 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-navy-900 text-white"><s.icon className="size-6" /></span>
                <span className="font-display text-4xl font-extrabold text-navy-100">{i + 1}</span>
              </div>
              <h2 className="mt-6 text-xl font-extrabold">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-body">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Heading eyebrow="Everyone at the gate" title="For everyone at the gate" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => (
            <div key={r.who} className="overflow-hidden rounded-3xl border border-line">
              <ImageSlot label={r.shot} icon={i === 0 ? "phone" : "gate"} tone={i} className="h-48 rounded-none" />
              <div className="p-7">
                <h3 className="text-xl font-extrabold">{r.who}</h3>
                <p className="mt-2 leading-relaxed text-body">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-navy-900 p-10 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Proof</p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug">QR visitor access runs at Northlands Heights Apartments, a community of more than 1,000 homes.</p>
            <TextLink light href="/real-estate#case" className="mt-6">Read the Northlands story</TextLink>
          </div>
          <div className="flex flex-col justify-center">
            <Heading eyebrow="Who it is for" title="Built for properties with a gate" />
            <div className="mt-6 flex flex-wrap gap-3">
              {["Gated communities", "Residential buildings", "Offices and commercial buildings", "Mixed-use developments"].map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand demoHref="/book-demo?for=real-estate" title="Talk to us about your gate." text="Tell us how many units and entry points you have, and we will show you the right setup." />
    </>
  );
}
