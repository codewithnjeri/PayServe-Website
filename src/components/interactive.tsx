"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "./ui";

/* Horizontal scroll-snap carousel with arrow buttons. No auto-advance. */
export function Carousel({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <div className={cx("relative", className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous" className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy-900 hover:bg-navy-50">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next" className="grid size-11 place-items-center rounded-full border border-line bg-white text-navy-900 hover:bg-navy-50">
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div ref={ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8">
        {children}
      </div>
    </div>
  );
}

/* Countdown to an ISO date. Renders nothing until mounted so server and client agree. */
function useCountdown(endsAt: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(endsAt).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  return left;
}

export function OfferBar({ headline, detail, endsAt, href }: { headline: string; detail: string; endsAt: string; href: string }) {
  const [open, setOpen] = useState(true);
  const left = useCountdown(endsAt);
  if (!open || left === 0) return null;
  const parts = left === null ? null : [
    [Math.floor(left / 86400000), "Days"],
    [Math.floor((left / 3600000) % 24), "Hrs"],
    [Math.floor((left / 60000) % 60), "Min"],
    [Math.floor((left / 1000) % 60), "Sec"],
  ] as const;
  return (
    <div role="region" aria-label="Special offer" className="relative border-b border-line text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-12 py-2 text-sm">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider text-navy-950">SPECIAL OFFER</span>
        <span><strong>{headline}</strong> {detail}</span>
        {parts && (
          <span className="hidden items-center gap-1 sm:inline-flex" aria-label={`Offer ends in ${parts[0][0]} days`}>
            {parts.map(([v, l]) => (
              <span key={l} className="inline-flex min-w-10 flex-col items-center rounded-md bg-navy-50 px-1.5 py-0.5 leading-none">
                <b className="font-mono text-sm tabular-nums">{String(v).padStart(2, "0")}</b>
                <span className="text-[9px] uppercase tracking-wider text-muted">{l}</span>
              </span>
            ))}
          </span>
        )}
        <a href={href} className="font-bold text-navy-800 underline-offset-4 hover:underline">Claim the offer →</a>
      </div>
      <button type="button" onClick={() => setOpen(false)} aria-label="Close offer bar" className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center text-body hover:text-navy-800">
        <X className="size-4" />
      </button>
    </div>
  );
}

/* Days left label for the demo form */
export function OfferDaysLeft({ endsAt }: { endsAt: string }) {
  const left = useCountdown(endsAt);
  if (left === null) return null;
  const d = Math.ceil(left / 86400000);
  return <> · {d} {d === 1 ? "day" : "days"} left</>;
}
