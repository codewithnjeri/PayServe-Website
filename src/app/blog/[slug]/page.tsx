import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, Link2, Share2, MessageCircle } from "lucide-react";
import { articles, posts } from "@/content/posts";
import { Button, Confirm, Container } from "@/components/ui";
import { ImageSlot } from "@/components/visuals";
import { PostCardView } from "@/components/sections";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  const card = Object.values(posts).find((p) => p.slug === slug);
  return { title: a.title, description: card?.excerpt };
}

const route = (href: string) => (href.endsWith(".html") ? `/${href.replace(".html", "")}` : href);

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const related = Object.values(posts).filter((p) => p.slug !== slug);
  const url = `https://payserve.co.ke/blog/${a.slug}/`;

  return (
    <>
      <section className="border-b border-line bg-white relative overflow-hidden">
        <Container className="relative max-w-4xl py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-body">
            <Link href="/blog" className="hover:text-navy-800">Blog</Link> <span className="mx-1.5">/</span> <span className="text-navy-700">{a.category}</span>
          </nav>
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] sm:text-5xl">{a.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6 text-sm">
            <div className="grid size-11 place-items-center rounded-full bg-navy-100 font-bold text-navy-800">PS</div>
            <div>
              <p className="font-semibold">PayServe team</p>
              <p className="text-body">Reviewed by <Confirm>{a.reviewer}</Confirm> · Updated {a.updated} · {a.readTime}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-body">
              <span>Share:</span>
              <a aria-label="Share on WhatsApp" href={`https://wa.me/?text=${encodeURIComponent(a.title + " " + url)}`} className="grid size-9 place-items-center rounded-full border border-line hover:bg-navy-50"><MessageCircle className="size-4" /></a>
              <a aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} className="grid size-9 place-items-center rounded-full border border-line hover:bg-navy-50"><Share2 className="size-4" /></a>
              <a aria-label="Copy link" href={url} className="grid size-9 place-items-center rounded-full border border-line hover:bg-navy-50"><Link2 className="size-4" /></a>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0 max-w-3xl">
          <ImageSlot label="Cover image" icon={a.category.includes("paid") ? "building" : "water"} className="aspect-[16/8]" />
          <div className="prose-ps mt-10" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

          <div className="border border-line bg-white mt-12 rounded-3xl p-9">
            <h2 className="text-2xl font-extrabold">{a.cta.title}</h2>
            <p className="mt-2 text-body">{a.cta.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-demo" variant="accent">Book a Demo</Button>
              <Button href={route(a.cta.href)} variant="outline">{a.cta.label}</Button>
            </div>
          </div>

          <h2 className="mt-14 text-2xl font-extrabold">Frequently asked questions</h2>
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {a.faqs.map((f, i) => (
              <details key={f.q} className="group px-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold">
                  {f.q}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="-mt-1 pb-5 leading-relaxed text-body">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-6 text-sm text-body">
            <p className="font-bold text-ink">Sources</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">{a.sources.map((s) => <li key={s}>{s}</li>)}</ol>
            {a.disclaimer && <p className="mt-5 text-muted">{a.disclaimer}</p>}
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <nav aria-label="In this guide" className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">In this guide</p>
              <ol className="mt-4 space-y-2.5 text-sm">
                {a.toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-body hover:text-navy-800">{t.label}</a></li>)}
              </ol>
            </nav>
            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <p className="font-display text-lg font-bold">See PayServe with your own numbers.</p>
              <Button href="/book-demo" variant="accent" className="mt-4 w-full">Book a Demo</Button>
            </div>
          </div>
        </aside>
      </Container>

      <section className="bg-surface py-16">
        <Container>
          <h2 className="text-2xl font-extrabold">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">{related.map((p) => <PostCardView key={p.title} post={p} />)}</div>
        </Container>
      </section>
    </>
  );
}
