import type { Metadata } from "next";
import { Gift, MessageCircle, PlayCircle } from "lucide-react";
import { Confirm, Container } from "@/components/ui";
import { DemoForm } from "./DemoForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "See PayServe with your own invoices. Three quick details and we will set up a demo around your business.",
};

export default function BookDemoPage() {
  return (
    <section className="border-b border-line bg-white relative overflow-hidden">
      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
        <div className="text-ink">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">Book a Demo</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl">See PayServe with your own invoices.</h1>
          <p className="mt-5 text-lg text-body">Three quick details and we will set up a demo around your business. No long forms.</p>
          <div className="mt-10 space-y-4">
            <a href={site.whatsapp} className="flex gap-4 rounded-2xl border border-line bg-white p-5 hover:bg-navy-50">
              <MessageCircle className="size-6 shrink-0 text-accent" />
              <span><b className="block">Prefer to talk now?</b><span className="text-body">WhatsApp us on {site.phone}</span></span>
            </a>
            <a href="#" className="flex gap-4 rounded-2xl border border-line bg-white p-5 hover:bg-navy-50">
              <PlayCircle className="size-6 shrink-0 text-accent" />
              <span><b className="block">Want to look first?</b><span className="text-body">Watch a 2-minute tour</span></span>
            </a>
            <div className="flex gap-4 rounded-2xl border border-dashed border-line p-5">
              <Gift className="size-6 shrink-0 text-accent" />
              <span>
                <b className="block">Refer a business, earn <Confirm>KES 10,000</Confirm></b>
                <span className="text-body">Know a business that sends a lot of invoices? Introduce them, and earn <Confirm>KES 10,000</Confirm> when they sign up. <Confirm>Paid once they complete their first month.</Confirm></span>
              </span>
            </div>
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm text-body">Trusted by property companies billing {site.unitsBilled} units across East Africa</p>
            <div className="mt-4 flex gap-8 font-display text-xl font-extrabold text-body"><span>Northlands</span><span>Altura</span><span>Sarit Center</span></div>
          </div>
        </div>
        <DemoForm />
      </Container>
    </section>
  );
}
