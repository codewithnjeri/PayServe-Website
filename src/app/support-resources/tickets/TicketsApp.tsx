"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Paperclip, Plus, Star } from "lucide-react";
import { cx } from "@/components/ui";

// Sample data from the wireframe. TODO: load from the customer_obsession ticket API for the signed-in client.
type Status = "Open" | "In progress" | "Waiting on you" | "Resolved";
const tickets: { id: string; subject: string; area: string; priority: string; status: Status; updated: string }[] = [
  { id: "PS-10482", subject: "Tenant paid but invoice still shows a balance", area: "Payments and collections", priority: "Normal", status: "Waiting on you", updated: "Today, 10:12" },
  { id: "PS-10477", subject: "Meter 0042315 not reporting since Monday", area: "Smart water meters", priority: "High", status: "In progress", updated: "Yesterday" },
  { id: "PS-10460", subject: "Add two users from our finance team", area: "My account and users", priority: "Low", status: "Open", updated: "12 Oct" },
  { id: "PS-10431", subject: "Gate QR codes not scanning at Block C", area: "Access control", priority: "Urgent", status: "Resolved", updated: "8 Oct" },
  { id: "PS-10398", subject: "Change reminder schedule for retainers", area: "PayServe OnTime reminders", priority: "Low", status: "Resolved", updated: "2 Oct" },
];
const statusTone: Record<Status, string> = {
  Open: "bg-navy-100 text-navy-800",
  "In progress": "bg-sky/15 text-[#075985]",
  "Waiting on you": "bg-accent-50 text-[#8a4f00]",
  Resolved: "bg-success/10 text-[#14672f]",
};
const prioTone: Record<string, string> = { Urgent: "text-[#b42318] font-bold", High: "text-accent-600 font-semibold", Normal: "text-body", Low: "text-muted" };
const filters = ["All", "Open", "In progress", "Waiting on you", "Resolved"] as const;

export function TicketsApp() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState("PS-10482");
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const list = tickets.filter((t) => filter === "All" || t.status === filter);
  const t = tickets.find((x) => x.id === selected)!;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-body">Altura · signed in as <b className="text-ink">Wanjiru</b></p>
        <Link href="/support-resources/tickets/new" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-5 font-semibold text-white hover:bg-navy-800"><Plus className="size-4" /> Raise a ticket</Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 pt-3" role="tablist" aria-label="Filter tickets">
          {filters.map((f) => {
            const n = f === "All" ? tickets.length : tickets.filter((x) => x.status === f).length;
            return (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className={cx("whitespace-nowrap border-b-[3px] px-4 pb-3 text-sm font-semibold", filter === f ? "border-accent text-navy-900" : "border-transparent text-muted hover:text-ink")}>
                {f} ({n})
              </button>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>{["Ticket", "Subject", "Area", "Priority", "Status", "Last update"].map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.id} onClick={() => setSelected(x.id)} className={cx("cursor-pointer border-t border-line hover:bg-navy-50", selected === x.id && "bg-navy-50")}>
                  <td className="px-5 py-4 font-mono font-semibold text-navy-800"><button type="button" onClick={() => setSelected(x.id)} className="hover:underline">{x.id}</button></td>
                  <td className="px-5 py-4 font-medium text-ink">{x.subject}</td>
                  <td className="px-5 py-4 text-body">{x.area}</td>
                  <td className={cx("px-5 py-4", prioTone[x.priority])}>{x.priority}</td>
                  <td className="px-5 py-4"><span className={cx("rounded-full px-2.5 py-1 text-xs font-bold", statusTone[x.status])}>{x.status}</span></td>
                  <td className="px-5 py-4 text-muted">{x.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket view */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold text-navy-800">{t.id}</span>
            <span className={cx("rounded-full px-2.5 py-1 text-xs font-bold", statusTone[t.status])}>{t.status}</span>
            <span className="text-sm text-muted">{t.area} · {t.priority}</span>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold">{t.subject}</h2>
          {t.id === "PS-10482" ? (
            <>
              <p className="mt-4 rounded-xl bg-accent-50 px-4 py-3 text-sm font-semibold text-[#8a4f00]">We need a reply from you to continue.</p>
              <ol className="mt-6 space-y-5">
                <li className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-100 font-bold text-navy-800">W</span>
                  <div className="rounded-2xl rounded-tl-sm bg-surface p-4">
                    <p className="text-xs text-muted"><b className="text-ink">Wanjiru (you)</b> · Altura property team · Today, 09:40</p>
                    <p className="mt-2 leading-relaxed">Unit B-1204 paid KES 45,000 by M-Pesa on 1 October (code SJK4XY12AB) but the invoice still shows the full balance.</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-sm text-navy-800"><Paperclip className="size-4" /> mpesa-receipt.jpg</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-white">B</span>
                  <div className="rounded-2xl rounded-tl-sm border border-line p-4">
                    <p className="text-xs text-muted"><b className="text-ink">Brian</b> · PayServe Support · Today, 10:12</p>
                    <p className="mt-2 leading-relaxed">Thanks, Wanjiru. The payment came in with account number B1240 instead of B-1204, so it did not match. Can you confirm the tenant&apos;s name so we can move it to the right unit?</p>
                  </div>
                </li>
                {sent.map((m, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-100 font-bold text-navy-800">W</span>
                    <div className="rounded-2xl rounded-tl-sm bg-surface p-4"><p className="text-xs text-muted"><b className="text-ink">Wanjiru (you)</b> · Just now</p><p className="mt-2">{m}</p></div>
                  </li>
                ))}
              </ol>
              <form className="mt-6" onSubmit={(e) => { e.preventDefault(); if (reply.trim()) { setSent([...sent, reply.trim()]); setReply(""); } }}>
                <label htmlFor="reply" className="sr-only">Reply</label>
                <textarea id="reply" value={reply} onChange={(e) => setReply(e.target.value)} rows={3} placeholder="Write a reply…" className="w-full rounded-2xl border border-[#c9cfdb] p-4 outline-none focus:border-navy-800 focus:ring-4 focus:ring-navy-100" />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="submit" className="min-h-11 rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800">Send reply</button>
                  <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800"><Paperclip className="size-4" /> Attach file</button>
                  <button type="button" className="ml-auto text-sm font-semibold text-muted hover:text-ink">My issue is solved, close ticket</button>
                </div>
              </form>
            </>
          ) : (
            <p className="mt-5 text-body">Open the full conversation for {t.id} here. {t.status === "Resolved" && "This ticket is resolved."}</p>
          )}
          {t.status === "Resolved" && (
            <div className="mt-6 rounded-2xl bg-surface p-5">
              <p className="font-semibold">How did we do?</p>
              <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Rate the support">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} stars`} onClick={() => setRating(n)}>
                    <Star className={cx("size-7", n <= rating ? "fill-accent text-accent" : "text-line")} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-line bg-white p-7">
            <p className="font-bold">Progress</p>
            <ol className="mt-4 space-y-4">
              {[["Received", "Today, 09:40", true], ["Assigned to Brian", "Today, 09:52", true], ["Waiting on you", "Today, 10:12", true], ["Resolved", "", false]].map(([l, d, done]) => (
                <li key={l as string} className="flex gap-3">
                  <span className={cx("grid size-6 shrink-0 place-items-center rounded-full", done ? "bg-success text-white" : "border-2 border-line")}>{done && <Check className="size-3.5" strokeWidth={3} />}</span>
                  <span><b className={done ? "text-ink" : "text-muted"}>{l}</b>{d && <span className="block text-sm text-muted">{d}</span>}</span>
                </li>
              ))}
            </ol>
          </div>
          <dl className="rounded-3xl border border-line bg-white p-7 text-sm">
            <p className="mb-4 font-bold">Details</p>
            {[["Property", "Altura"], ["Unit", "B-1204"], ["Reference", "SJK4XY12AB"], ["Raised by", "Wanjiru, Altura"], ["Reply expected", "within 1 business day"]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-line py-2.5"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
