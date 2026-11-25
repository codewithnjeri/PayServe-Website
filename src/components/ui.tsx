import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

type Tone = "white" | "surface";
const toneClass: Record<Tone, string> = {
  white: "bg-white",
  surface: "border-y border-line bg-white",
};

export function Section({
  id, tone = "white", className, children,
}: { id?: string; tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cx(toneClass[tone], "scroll-mt-28 py-20 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className={"mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-700"}>
      <span className="h-0.5 w-6 rounded bg-accent" />
      {children}
    </p>
  );
}

export function Heading({
  eyebrow, title, intro, center, className,
}: { eyebrow?: ReactNode; title: ReactNode; intro?: ReactNode; center?: boolean; className?: string }) {
  return (
    <div className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-body">{intro}</p>}
    </div>
  );
}

type BtnVariant = "primary" | "accent" | "outline";
const btn: Record<BtnVariant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800",
  accent: "bg-accent text-navy-950 hover:bg-accent-600",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
};

export function Button({
  href, variant = "primary", className, children, ...rest
}: { href: string; variant?: BtnVariant } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors",
        btn[variant], className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children, light, className }: { href: string; children: ReactNode; light?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-1.5 font-semibold",
        light ? "text-white hover:text-accent" : "text-navy-800 hover:text-navy-700",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function CheckList({ items, light, className }: { items: ReactNode[]; light?: boolean; className?: string }) {
  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((it, i) => (
        <li key={i} className={cx("flex gap-3 leading-relaxed", light ? "text-white/85" : "text-body")}>
          <span className={cx("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", light ? "bg-accent/20 text-accent" : "bg-navy-100 text-navy-800")}>
            <Check className="size-3.5" strokeWidth={3} aria-hidden />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink", className)}>{children}</span>;
}

/** Marks copy that was flagged in the wireframes as a placeholder to confirm. */
export function Confirm({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-[#ffe45c] px-1 text-ink" title="To confirm before launch">{children}</mark>;
}
