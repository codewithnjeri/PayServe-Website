"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cx } from "@/components/ui";
import { OfferDaysLeft } from "@/components/interactive";
import { offer } from "@/lib/site";

const needs = [
  { value: "invoicing", title: "Invoicing for my business", sub: "PayServe OnTime" },
  { value: "real-estate", title: "Billing, meters or gate for a property", sub: "PayServe for Real Estate" },
];
const slots = ["Tue 10:00", "Tue 14:30", "Wed 09:00", "Wed 11:30", "Thu 15:00", "Fri 10:00"];

const initialNeed = "invoicing";
const input = "min-h-12 w-full rounded-xl border border-[#c9cfdb] bg-white px-4 text-base font-normal text-ink outline-none transition focus:border-navy-800 focus:ring-4 focus:ring-navy-100";

export function DemoForm() {
  const [need, setNeed] = useState(initialNeed);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [slot, setSlot] = useState<string | null>(null);

  // Pre-select from ?for=real-estate, or from the page the visitor came from.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("for");
    const fromProperty = p === "real-estate" || (!p && /real-estate|smart-meters|access-control/.test(document.referrer));
    if (fromProperty) queueMicrotask(() => setNeed("real-estate"));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/demo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 shadow-lift sm:p-10" aria-live="polite">
        <CheckCircle2 className="size-12 text-success" />
        <h2 className="mt-4 text-2xl font-extrabold">Thanks. Want to pick a time now?</h2>
        <p className="mt-2 text-body">We will call or WhatsApp you within one working day. Or choose a slot below.</p>
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {slots.map((s) => (
            <button key={s} type="button" onClick={() => setSlot(s)} aria-pressed={slot === s}
              className={cx("min-h-12 rounded-xl border text-sm font-semibold transition-colors", slot === s ? "border-navy-900 bg-navy-900 text-white" : "border-line hover:border-navy-800")}>
              {s}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">{slot ? <>Booked for <b className="text-ink">{slot}</b>. A calendar invite is on its way.</> : "Or skip, and we will call you."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-7 shadow-lift sm:p-10">
      <fieldset>
        <legend className="text-sm font-semibold">What do you need?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {needs.map((n) => (
            <label key={n.value} className={cx("flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition-colors", need === n.value ? "border-navy-900 bg-navy-50" : "border-line hover:border-navy-100")}>
              <input type="radio" name="need" value={n.value} checked={need === n.value} onChange={() => setNeed(n.value)} className="mt-1 accent-[#001858]" />
              <span><b className="block leading-snug">{n.title}</b><span className="text-sm text-muted">{n.sub}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-6 space-y-5">
        <label className="block text-sm font-semibold">Your name<input required name="name" autoComplete="name" className={cx(input, "mt-2")} /></label>
        <label className="block text-sm font-semibold">Phone or WhatsApp<input required name="phone" type="tel" autoComplete="tel" placeholder="+254" className={cx(input, "mt-2")} /></label>
        <label className="block text-sm font-semibold">Work email<input required name="email" type="email" autoComplete="email" className={cx(input, "mt-2")} /></label>
      </div>
      {offer.enabled && (
        <p className="mt-6 flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-[15px] font-semibold text-[#14672f]">
          <CheckCircle2 className="size-5" /> 15% special offer applied
          <span className="font-normal"><OfferDaysLeft endsAt={offer.endsAt} /></span>
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-lg font-bold text-navy-950 transition-colors hover:bg-accent-600 disabled:opacity-70">
        {state === "sending" && <Loader2 className="size-5 animate-spin" />} Book my demo
      </button>
      {state === "error" && <p className="mt-3 text-sm font-semibold text-[#b42318]" role="alert">Something went wrong. Please try again or WhatsApp us.</p>}
      <p className="mt-4 text-sm leading-relaxed text-muted">Takes 30 seconds. We call or WhatsApp you within one working day. Invoice volumes, payment methods and the rest, we cover on the call.</p>
    </form>
  );
}
