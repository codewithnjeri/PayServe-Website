import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/content/stories";
import { cx } from "./ui";

/* A client story card: the photo fills the card, with the text in white over a dark fade. */
export function StoryCard({ story, large, className }: { story: Story; large?: boolean; className?: string }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cx("group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl bg-navy-950 text-white focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent", className)}
    >
      <Image src={story.photo} alt="" fill sizes="(min-width: 1024px) 560px, (min-width: 640px) 60vw, 88vw" className={cx("object-cover transition-transform duration-700 group-hover:scale-105", story.focus)} />
      {/* Dark fade, strongest behind the text, so the words stay readable on any photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/25" />
      <figure className="relative flex flex-col p-9">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{story.org} · {story.type}</p>
        <blockquote className={cx("mt-5 font-display font-semibold leading-relaxed [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]", large ? "text-xl" : "text-lg")}>
          {story.isQuote ? <>&ldquo;{story.quote}&rdquo;</> : story.quote}
        </blockquote>
        {story.who && <figcaption className="mt-6 text-sm text-white/75">{story.who}</figcaption>}
        <span className={cx("inline-flex items-center gap-1.5 text-sm font-semibold text-accent", story.who ? "mt-4" : "mt-6")}>
          Read the {story.org} story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </figure>
    </Link>
  );
}
