"use client";

import { useEffect, useRef, useState } from "react";
import { Car, Check, Map as MapIcon, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { cx } from "../ui";

const { lat, lng, name } = site.location;
const address = site.address.join(", ");

// Search the building and street ("Kenrail Towers, Ring Road, Westlands, Nairobi"), not the floor.
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.slice(1).join(", "))}`;
const uberUrl =
  "https://m.uber.com/ul/?action=setPickup&pickup=my_location" +
  `&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}` +
  `&dropoff[nickname]=${encodeURIComponent(`PayServe, ${name}`)}` +
  `&dropoff[formatted_address]=${encodeURIComponent(address)}`;
// Bolt has no public link that pre-fills a destination, so we copy the address and open Bolt.
const boltUrl = "https://bolt.eu/en-ke/";

export function AddressMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const openBolt = async () => {
    try { await navigator.clipboard.writeText(address); setCopied(true); } catch { /* clipboard blocked: still open Bolt */ }
    window.open(boltUrl, "_blank", "noopener,noreferrer");
  };

  const item = "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-navy-50";
  const icon = "grid size-8 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800";

  return (
    <div ref={ref} className={cx("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => { setOpen(!open); setCopied(false); }}
        className="flex gap-3 text-left hover:text-navy-800"
      >
        <span className="grid h-5 w-7 shrink-0 place-items-center"><MapPin className="size-5 text-accent" aria-hidden /></span>
        <span className="underline decoration-line decoration-dotted underline-offset-4">{address}</span>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-30 mb-2 w-72 rounded-2xl border border-line bg-white p-2 shadow-lift">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Get directions</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={item} onClick={() => setOpen(false)}>
            <span className={icon}><MapIcon className="size-4" aria-hidden /></span>
            <span><span className="block font-semibold text-ink">Google Maps</span><span className="block text-[13px] text-muted">See the route and directions</span></span>
          </a>
          <a href={uberUrl} target="_blank" rel="noopener noreferrer" className={item} onClick={() => setOpen(false)}>
            <span className={icon}><Car className="size-4" aria-hidden /></span>
            <span><span className="block font-semibold text-ink">Uber</span><span className="block text-[13px] text-muted">Ride here, destination filled in</span></span>
          </a>
          <button type="button" className={item} onClick={openBolt}>
            <span className={icon}>{copied ? <Check className="size-4 text-success" aria-hidden /> : <Car className="size-4" aria-hidden />}</span>
            <span><span className="block font-semibold text-ink">Bolt</span><span className="block text-[13px] text-muted">{copied ? "Address copied. Paste it as your destination" : "Opens Bolt and copies the address"}</span></span>
          </button>
        </div>
      )}
    </div>
  );
}
