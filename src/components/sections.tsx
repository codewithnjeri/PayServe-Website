import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Code2, Landmark, Quote } from "lucide-react";
import type { ReactNode } from "react";
import { banks, integrations, projects, reminderSchedule, site, type Brand } from "@/lib/site";
import type { PostCard } from "@/content/types";
import { Button, Confirm, Container, cx, Heading, Section } from "./ui";
import { ImageSlot } from "./visuals";
import { Carousel } from "./interactive";

/* Interior page hero, RealPage-style: dark gradient band with breadcrumb, headline, CTAs, visual. */
export function PageHero({
  crumb, title, intro, actions, visual, stats,
}: { crumb: ReactNode; title: ReactNode; intro: ReactNode; actions?: ReactNode; visual?: ReactNode; stats?: { value: string; label: string }[] }) {
  return (
    <section className="border-b border-line bg-white relative overflow-hidden">
      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="animate-rise">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-navy-700">{crumb}</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{intro}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          {stats && (
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-extrabold text-ink">{s.value}</dd>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </Container>
    </section>
  );
}

export function Faq({ items, title = "Questions businesses ask us", id = "faq" }: { items: { q: string; a: ReactNode }[]; title?: string; id?: string }) {
  return (
    <Section id={id} tone="surface">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Heading eyebrow="Questions" title={title} intro={<>Can&apos;t find your answer? <Link className="font-semibold text-navy-800 underline underline-offset-4" href="/book-demo">Talk to our team</Link>.</>} />
        <div className="divide-y divide-line rounded-2xl border border-line bg-white">
          {items.map((f, i) => (
            <details key={f.q} className="group px-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[17px] font-bold">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-navy-800 transition-transform group-open:rotate-180" />
              </summary>
              <p className="-mt-1 pb-6 leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function CtaBand({ title, text, secondary, demoHref = "/book-demo" }: { title: string; text: string; secondary?: ReactNode; demoHref?: string }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-14">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-body">{text}</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3">
              <Button href={demoHref} variant="accent" className="min-h-14 px-8 text-base">Book a Demo</Button>
              {secondary ?? <a href={site.whatsapp} className="text-sm text-body hover:text-navy-800">Or WhatsApp us on {site.phone}</a>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PostCardView({ post, size = "md" }: { post: PostCard; size?: "md" | "lg" }) {
  const inner = (
    <>
      <ImageSlot label="Cover image" tone={post.category.length} icon={post.category.includes("meter") || post.category.includes("Water") ? "water" : "building"} className={cx("rounded-none", size === "lg" ? "h-56" : "h-44")} />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-700">{post.category}</p>
        <h3 className={cx("mt-2 font-bold leading-snug text-ink", size === "lg" ? "text-xl" : "text-lg")}>{post.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{post.excerpt}</p>
        <p className="mt-5 text-[13px] text-muted">{post.meta}</p>
      </div>
    </>
  );
  const cls = "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all";
  if (post.planned || !post.slug) return <div className={cx(cls, "border-dashed opacity-80")}>{inner}</div>;
  return <Link href={`/blog/${post.slug}`} className={cx(cls, "hover:-translate-y-1 hover:shadow-lift")}>{inner}</Link>;
}

export function BlogStrip({ title, posts, tone = "white" }: { title: string; posts: PostCard[]; tone?: "white" | "surface" }) {
  return (
    <Section tone={tone}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading eyebrow="From the blog" title={title} />
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold text-navy-800">Visit the blog <ArrowRight className="size-4" /></Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => <PostCardView key={p.title} post={p} />)}
      </div>
    </Section>
  );
}

export function ProjectsCarousel({ filter = "All" }: { filter?: string }) {
  const list = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));
  return (
    <Carousel label="Latest projects">
      {list.map((p, i) => (
        <article key={p.name} className="group w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31%]">
          <ImageSlot label={p.image ? p.name : `Photo: ${p.name}`} src={p.image} icon="building" tone={i} className="aspect-[4/3]" />
          <h3 className="mt-4 text-lg font-bold">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{p.tags.join(" · ")}</p>
          <Link href="/real-estate#projects" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">View project <ArrowRight className="size-4" /></Link>
        </article>
      ))}
    </Carousel>
  );
}

export function ReminderSchedule() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <p className="border-b px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] border-line text-muted">
        A typical reminder schedule (you set your own)
      </p>
      <ol>
        {reminderSchedule.map((r, i) => (
          <li key={r.when} className="grid grid-cols-[auto_1fr] items-center gap-4 border-b px-5 py-3.5 last:border-0 sm:grid-cols-[auto_1fr_auto] border-line">
            <span className={cx("grid size-8 place-items-center rounded-full text-sm font-bold", i === 3 ? "bg-accent text-navy-950" : "bg-navy-100 text-navy-800")}>{i + 1}</span>
            <span>
              <b className="text-ink">{r.when}</b>
              <span className="block text-sm text-muted">{r.channel}</span>
            </span>
            <span className="col-start-2 text-sm font-semibold sm:col-start-auto text-navy-700">{r.tone}</span>
          </li>
        ))}
      </ol>
      <p className="px-5 py-3 text-sm bg-surface text-body">Reminders stop the moment the customer pays.</p>
    </div>
  );
}

export function BrandMark({ brand }: { brand: Brand }) {
  const { name, logo, width, height, wordmark } = brand;
  const Fallback = name.startsWith("Open API") ? Code2 : Landmark;
  return (
    <>
      {logo ? (
        <Image
          src={`/logos/${logo}.png`}
          alt={wordmark ? name : ""}
          width={width}
          height={height}
          unoptimized
          className={cx("w-auto rounded-md", wordmark ? "h-8" : "h-7")}
        />
      ) : (
        <Fallback className="size-6 text-navy-700" aria-hidden />
      )}
      {!wordmark && name}
    </>
  );
}

function BrandChip({ brand }: { brand: Brand }) {
  return (
    <span className="inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-xl border border-line bg-white px-5 font-display text-[15px] font-bold text-navy-900">
      <BrandMark brand={brand} />
    </span>
  );
}

function Marquee({ items, reverse, label }: { items: Brand[]; reverse?: boolean; label: string }) {
  return (
    <div className="marquee marquee-mask overflow-hidden" aria-label={label}>
      <div className="marquee-track flex w-max animate-marquee gap-3" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-3" aria-hidden={k === 1 ? true : undefined}>
            {items.map((b) => <BrandChip key={b.name} brand={b} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BankMarquee() {
  return <Marquee items={banks} label="M-Pesa and Kenya's major banks" />;
}

export function IntegrationsMarquee() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">Works with your finance system and CRM · <Confirm>live integrations to confirm</Confirm> · anything else connects through our open API or CSV</p>
      <Marquee items={integrations} reverse label="Finance and CRM integrations" />
    </div>
  );
}

export function Testimonial({ quote, who, link }: { quote: string; who: ReactNode; link?: { href: string; label: string } }) {
  return (
    <figure className="relative rounded-3xl bg-navy-900 p-10 text-white sm:p-12">
      <Quote className="size-10 text-accent" aria-hidden />
      <blockquote className="mt-6 font-display text-xl font-semibold leading-relaxed sm:text-2xl">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-8 text-white/70">{who}</figcaption>
      {link && <Link href={link.href} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent">{link.label} <ArrowRight className="size-4" /></Link>}
    </figure>
  );
}

export function FeatureCard({ icon, title, text, href, linkLabel = "Learn more" }: { icon?: ReactNode; title: string; text: ReactNode; href?: string; linkLabel?: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lift">
      {icon && <span className="grid size-12 place-items-center rounded-xl bg-navy-50 text-navy-800">{icon}</span>}
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-body">{text}</p>
      {href && <Link href={href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">{linkLabel} <ArrowRight className="size-4" /></Link>}
    </div>
  );
}
