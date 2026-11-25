"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, ChevronDown, Home, LogIn, Menu, X } from "lucide-react";
import { contactMenu, loginLinks, productsMenu, realEstateMenu, resourcesMenu, type NavLink } from "@/lib/site";
import { cx } from "../ui";
import { Logo } from "./Logo";

type Menu = {
  groups: { title?: string; links: NavLink[] }[];
  feature?: { eyebrow: string; title: string; href: string; cta: string };
  footerLinks?: NavLink[];
};

const menus: { key: string; label: string; menu: Menu; match: string[]; width: string; compact?: boolean }[] = [
  { key: "products", label: "Products", menu: productsMenu, match: ["/invoicing"], width: "lg:w-[860px]" },
  { key: "realestate", label: "Real Estate", menu: realEstateMenu, match: ["/real-estate", "/smart-meters", "/access-control"], width: "lg:w-[1040px]" },
  { key: "resources", label: "Resources", menu: resourcesMenu, match: ["/blog", "/support-resources"], width: "lg:w-[640px]" },
  { key: "contact", label: "Contact", menu: contactMenu, match: [], width: "lg:w-80", compact: true },
];

function MenuPanel({ menu, onNavigate }: { menu: Menu; onNavigate: () => void }) {
  const cols = menu.groups.length;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
      <div className={cx("grid gap-2 p-4 lg:p-6", !menu.feature ? "" : cols >= 4 ? "lg:grid-cols-[1fr_1fr_1fr_1fr_1.15fr]" : cols === 2 ? "lg:grid-cols-[1fr_1fr_1.1fr]" : "lg:grid-cols-3")}>
        {menu.groups.map((g, i) => (
          <div key={g.title ?? i} className="min-w-0">
            {g.title && <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{g.title}</p>}
            <ul>
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={onNavigate} className="block rounded-xl px-3 py-2 hover:bg-navy-50">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      {l.label}
                      {l.badge && <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{l.badge}</span>}
                    </span>
                    {l.description && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{l.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {menu.feature && (
          <Link href={menu.feature.href} onClick={onNavigate} className="bg-hero group relative mt-2 flex min-h-48 flex-col justify-end overflow-hidden rounded-xl p-5 text-white lg:mt-0">
            <div className="bg-grid absolute inset-0 opacity-50" />
            <span className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{menu.feature.eyebrow}</span>
            <span className="relative mt-2 font-display text-lg font-bold leading-snug">{menu.feature.title}</span>
            <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-semibold">
              {menu.feature.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
      {menu.footerLinks && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line bg-surface px-7 py-3.5 text-sm font-semibold">
          {menu.footerLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={onNavigate} className="text-navy-800 hover:text-navy-700">{l.label} →</Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  const close = () => { setOpen(null); setMobile(false); };
  const enter = (k: string) => { if (timer.current) clearTimeout(timer.current); setOpen(k); };
  const leave = () => { timer.current = setTimeout(() => setOpen(null), 120); };

  return (
    <>
      <header className={cx("sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow", scrolled ? "border-line shadow-card" : "border-transparent")}>
        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center gap-5 px-5 sm:px-8">
          <Link href="/" aria-label="PayServe home" onClick={close}><Logo eager /></Link>

          <nav aria-label="Main" className="hidden flex-1 items-center xl:flex">
            {menus.map((m) => {
              const active = m.match.some((p) => pathname.startsWith(p));
              return (
                <div key={m.key} className={m.compact ? "relative" : "static"} onMouseEnter={() => enter(m.key)} onMouseLeave={leave}>
                  <button
                    type="button"
                    aria-expanded={open === m.key}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === m.key ? null : m.key)}
                    className={cx(
                      "relative inline-flex h-[72px] items-center gap-1 whitespace-nowrap px-2 text-sm font-semibold transition-colors",
                      open === m.key || active ? "text-navy-900" : "text-ink/80 hover:text-navy-900",
                    )}
                  >
                    {m.label}
                    <ChevronDown className={cx("size-4 transition-transform", open === m.key && "rotate-180")} />
                    <span className={cx("absolute inset-x-2 bottom-0 h-[3px] rounded-t bg-accent transition-opacity", open === m.key || active ? "opacity-100" : "opacity-0")} />
                  </button>
                  {open === m.key && (
                    <div className={cx("absolute top-full pt-2", m.compact ? "left-0" : "left-1/2 w-[min(100vw-2rem,1040px)] -translate-x-1/2", m.width)}>
                      <MenuPanel menu={m.menu} onNavigate={close} />
                    </div>
                  )}
                </div>
              );
            })}
            <Link href="/#how" className="whitespace-nowrap px-2 text-sm font-semibold text-ink/80 hover:text-navy-900">How It Works</Link>
            <Link href="/#stories" className="whitespace-nowrap px-2 text-sm font-semibold text-ink/80 hover:text-navy-900">Success Stories</Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/book-demo" className="hidden min-h-11 items-center whitespace-nowrap rounded-full bg-accent px-4 text-sm font-bold text-navy-950 transition-colors hover:bg-accent-600 sm:inline-flex">
              Book a Demo
            </Link>
            <div className="relative hidden xl:block" onMouseEnter={() => enter("login")} onMouseLeave={leave}>
              <button
                type="button"
                aria-expanded={open === "login"}
                aria-haspopup="true"
                onClick={() => setOpen(open === "login" ? null : "login")}
                className={cx(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-navy-900 px-4 text-sm font-bold transition-colors",
                  open === "login" ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-navy-900 hover:text-white",
                )}
              >
                <LogIn className="size-4" aria-hidden /> Login
                <ChevronDown className={cx("size-4 transition-transform", open === "login" && "rotate-180")} />
              </button>
              {open === "login" && (
                <div className="absolute right-0 top-full w-72 pt-2">
                  <ul className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                    {loginLinks.map((l) => {
                      const Icon = l.key === "resident" ? Home : Building2;
                      return (
                        <li key={l.key}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={close} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-navy-50">
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-800"><Icon className="size-[18px]" aria-hidden /></span>
                            <span>
                              <span className="block text-[15px] font-semibold text-ink">{l.label}</span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-muted">{l.description}</span>
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <button type="button" className="grid size-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50 xl:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-8 xl:hidden">
            {menus.map((m) => (
              <details key={m.key} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-semibold">
                  {m.label} <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-4"><MenuPanel menu={m.menu} onNavigate={close} /></div>
              </details>
            ))}
            <Link href="/#how" onClick={close} className="block border-b border-line py-4 font-semibold">How It Works</Link>
            <Link href="/#stories" onClick={close} className="block border-b border-line py-4 font-semibold">Success Stories</Link>
            <Link href="/book-demo" onClick={close} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-accent font-bold text-navy-950">Book a Demo</Link>
            <p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted"><LogIn className="size-4" aria-hidden /> Login</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {loginLinks.map((l) => (
                <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" onClick={close} className="flex min-h-12 items-center justify-center rounded-full border-2 border-navy-900 px-3 text-center text-sm font-bold text-navy-900">{l.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
