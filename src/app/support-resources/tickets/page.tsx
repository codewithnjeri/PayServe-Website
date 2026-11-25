import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { TicketsApp } from "./TicketsApp";

export const metadata: Metadata = { title: "Support tickets" };

export default function TicketsPage() {
  return (
    <>
      <section className="border-b border-line bg-white ">
        <Container className="py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-body">Support <span className="mx-1.5">/</span> <span className="text-navy-700">Tickets</span></nav>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Support tickets</h1>
          <p className="mt-3 text-body">Signed-in clients see their company&apos;s tickets. Anyone can track one ticket by number and email.</p>
        </Container>
      </section>
      <Container className="py-12">
        <TicketsApp />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <form className="rounded-3xl border border-line bg-surface p-7" action="#">
            <p className="font-bold">Not signed in?</p>
            <p className="mt-1 text-sm text-body">Track a ticket with its number and the email you used.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <input aria-label="Ticket number" placeholder="PS-10482" className="min-h-11 w-36 rounded-full border border-[#c9cfdb] bg-white px-4" />
              <input aria-label="Email" type="email" placeholder="Email" className="min-h-11 flex-1 rounded-full border border-[#c9cfdb] bg-white px-4" />
              <button className="min-h-11 rounded-full bg-navy-900 px-5 font-semibold text-white">Track ticket</button>
            </div>
          </form>
          <div className="rounded-3xl border border-line p-7">
            <p className="font-bold">Try these first</p>
            <ul className="mt-4 space-y-3 font-semibold text-navy-800">
              <li><a href="#" className="inline-flex items-center gap-2"><BookOpen className="size-4" /> Knowledge base</a></li>
              <li><Link href="/#faq" className="inline-flex items-center gap-2"><HelpCircle className="size-4" /> FAQs</Link></li>
              <li><a href={site.whatsapp} className="inline-flex items-center gap-2"><MessageCircle className="size-4" /> Start online chat</a></li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
