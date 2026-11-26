"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Paperclip, Search } from "lucide-react";
import { cx } from "@/components/ui";

const articles = [
  { title: "How to buy water tokens by M-Pesa", area: "Smart water meters", words: ["water", "token", "credit", "meter", "prepaid"] },
  { title: "Why is my invoice showing a balance after I paid?", area: "Payments", words: ["paid", "balance", "invoice", "mpesa", "m-pesa", "payment"] },
  { title: "Resetting a resident's gate access PIN", area: "Access control", words: ["gate", "pin", "qr", "access", "guest"] },
  { title: "Changing your reminder schedule", area: "PayServe OnTime", words: ["reminder", "schedule", "sms", "whatsapp"] },
];

export function RaiseTicket() {
  const [text, setText] = useState("");
  const [urgent, setUrgent] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const suggestions = useMemo(() => {
    const q = text.toLowerCase();
    if (q.trim().length < 3) return [];
    return articles.filter((a) => a.words.some((w) => q.includes(w)));
  }, [text]);

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 shadow-lift sm:p-10" aria-live="polite">
        <CheckCircle2 className="size-12 text-success" />
        <h2 className="mt-4 text-2xl font-extrabold">Ticket PS-10483 received</h2>
        <p className="mt-2 text-body">We will reply within {urgent ? "1 hour" : "1 business day"}. A copy is on its way to your email and WhatsApp.</p>
        <ol className="mt-6 space-y-3 text-body">
          {["A support agent picks up your ticket", "We may ask for more detail. Reply by email, WhatsApp or here", "We fix it and confirm with you before closing"].map((s, i) => (
            <li key={s} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy-100 text-sm font-bold text-navy-800">{i + 1}</span>{s}</li>
          ))}
        </ol>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/support-resources/tickets" className="inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 font-semibold text-white">View my ticket</Link>
          {/* TODO: add a "Browse the knowledge base" button here once the knowledge base exists. */}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="rounded-3xl border border-line bg-white p-7 shadow-lift sm:p-10">
      <label htmlFor="issue" className="text-lg font-bold">What is wrong?</label>
      <p id="issue-hint" className="mt-1 text-sm text-muted">Include a unit, meter or M-Pesa reference if you have one. We work out the rest.</p>
      <textarea id="issue" aria-describedby="issue-hint" required rows={5} value={text} onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Unit B-1204 paid by M-Pesa but the invoice still shows a balance"
        className="mt-4 w-full rounded-2xl border border-[#c9cfdb] p-4 text-base outline-none focus:border-navy-800 focus:ring-4 focus:ring-navy-100" />

      {suggestions.length > 0 && (
        <div className="mt-4 rounded-2xl bg-surface p-5" aria-live="polite">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted"><Search className="size-4" /> These might answer it right away</p>
          <ul className="mt-3 space-y-2">
            {suggestions.map((s) => (
              <li key={s.title}><a href="#" className="font-semibold text-navy-800 hover:underline">{s.title}</a> <span className="text-sm text-muted">· {s.area}</span></li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="mt-6">
        <legend className="font-bold">Is something down right now?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[{ v: true, t: "Yes, it is urgent", d: "Water or power off, gate not opening, or invoices not going out" }, { v: false, t: "No", d: "It can wait for a normal reply" }].map((o) => (
            <label key={o.t} className={cx("flex cursor-pointer gap-3 rounded-2xl border-2 p-4", urgent === o.v ? (o.v ? "border-[#b42318] bg-[#fdf2f2]" : "border-navy-900 bg-navy-50") : "border-line")}>
              <input type="radio" name="urgent" required checked={urgent === o.v} onChange={() => setUrgent(o.v)} className="mt-1" />
              <span><b className="block">{o.t}</b><span className="text-sm text-muted">{o.d}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line px-4 py-3 text-sm">
        <span className="grid size-8 place-items-center rounded-full bg-navy-100 font-bold text-navy-800">W</span>
        <span className="flex-1">Replies go to <b>Wanjiru · Altura</b> on WhatsApp and email</span>
        <button type="button" className="font-semibold text-navy-800">Change</button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="min-h-12 rounded-full bg-accent px-8 text-base font-bold text-navy-950 hover:bg-accent-600">Send</button>
        <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-navy-800">
          <Paperclip className="size-4" /> Add a screenshot (optional)
          <input type="file" accept="image/*" className="sr-only" />
        </label>
      </div>
      <p className="mt-4 text-sm text-muted">We sort the product area and priority for you. You get a ticket number on WhatsApp straight away.</p>
    </form>
  );
}
