import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/content/stories";
import { Heading, Section, TextLink } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { StoryCard } from "@/components/story-card";
import { Carousel } from "@/components/interactive";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.org} · Client story`, description: s.quote };
}

// The four story pages are prerendered from generateStaticParams, so this route waits for its params
// instead of streaming. That keeps a real 404 for unknown slugs (dynamicParams isn't available with Cache Components).
export const instant = false;

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const i = stories.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const s = stories[i];
  const others = stories.filter((x) => x.slug !== slug);

  return (
    <>
      {/* Photo on the left, the story on the right (photo above the words on phones) */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Image
              src={s.photo}
              alt={s.org}
              width={s.photoSize[0]}
              height={s.photoSize[1]}
              loading="eager"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="mx-auto h-auto max-h-[75vh] w-auto max-w-full rounded-3xl shadow-lift"
            />
          </div>

          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-body">
              <Link href="/" className="hover:text-navy-800">Home</Link> <span className="mx-1.5">/</span>
              <Link href="/#stories" className="hover:text-navy-800">Client stories</Link> <span className="mx-1.5">/</span>
              <span className="text-navy-700">{s.org}</span>
            </nav>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-accent-600">{s.type}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-5xl">{s.org}</h1>

            <blockquote className="mt-8 border-l-4 border-accent pl-6 font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
              {s.isQuote ? <>&ldquo;{s.quote}&rdquo;</> : s.quote}
            </blockquote>
            {s.who && <p className="mt-4 pl-7 text-sm text-muted">{s.who}</p>}
            {s.detail && <p className="mt-8 text-lg leading-relaxed text-body">{s.detail}</p>}
            {s.link && <TextLink href={s.link.href} className="mt-6">{s.link.label}</TextLink>}
          </div>
        </div>
      </Section>

      {/* Other stories */}
      <Section tone="surface">
        <Heading eyebrow="Client stories" title="More client stories" />
        <Carousel label="More client stories" className="mt-4">
          {others.map((o) => (
            <StoryCard key={o.slug} story={o} className="w-[88%] shrink-0 snap-start sm:w-[60%] lg:w-[46%]" />
          ))}
        </Carousel>
      </Section>

      <CtaBand title="See PayServe with your own invoices." text="Three quick details and we will set up a demo around your business." />
    </>
  );
}
