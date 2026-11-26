import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { RaiseTicket } from "./RaiseTicket";

export const metadata: Metadata = { title: "Raise a support ticket" };

const sla = [
  ["Urgent", "1 hour, 24/7", "bg-[#b42318]"],
  ["High", "4 business hours", "bg-accent"],
  ["Normal", "1 business day", "bg-navy-700"],
  ["Low", "3 business days", "bg-muted"],
];

export default function NewTicketPage() {
  return (
    <>
      <section className="border-b border-line bg-white ">
        <Container className="py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-body">
            Support <span className="mx-1.5">/</span> <Link href="/support-resources/tickets" className="hover:text-navy-800">Tickets</Link> <span className="mx-1.5">/</span> <span className="text-navy-700">New ticket</span>
          </nav>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Raise a support ticket</h1>
          <p className="mt-3 max-w-2xl text-body">Tell us what is wrong in your own words. One box, one question, and you are done. Urgent problems go straight to the on-call team.</p>
        </Container>
      </section>
      <Container className="grid gap-8 py-12 lg:grid-cols-[1.6fr_1fr]">
        <RaiseTicket />
        <aside className="space-y-6">
          <div className="rounded-3xl bg-navy-900 p-7 text-white">
            <p className="font-display text-lg font-bold">Need help right now?</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href={site.whatsapp} className="inline-flex items-center gap-2 hover:text-accent"><MessageCircle className="size-4 text-accent" /> Start online chat</a></li>
              <li><a href={site.whatsapp} className="inline-flex items-center gap-2 hover:text-accent"><MessageCircle className="size-4 text-accent" /> WhatsApp {site.phone}</a></li>
              {/* TODO: add the urgent phone line here once PayServe confirms the number. */}
            </ul>
          </div>
          <div className="rounded-3xl border border-line p-7">
            <p className="font-bold">How fast we reply</p>
            <dl className="mt-4 space-y-3 text-sm">
              {sla.map(([k, v, c]) => (
                <div key={k} className="flex items-center gap-3"><span className={`size-2.5 rounded-full ${c}`} /><dt className="w-16 font-semibold">{k}</dt><dd className="text-body">{v}</dd></div>
              ))}
            </dl>
            {/* TODO: add business hours here once PayServe confirms them. */}
          </div>
          <div className="rounded-3xl border border-line bg-surface p-7">
            <p className="font-bold">Already raised a ticket?</p>
            <p className="mt-1 text-sm text-body">Track it with your ticket number.</p>
            <Link href="/support-resources/tickets" className="mt-3 inline-block font-semibold text-navy-800">Track ticket →</Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
