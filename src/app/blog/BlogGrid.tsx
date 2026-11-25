"use client";

import { useState } from "react";
import { PostCardView } from "@/components/sections";
import { cx } from "@/components/ui";
import type { PostCard } from "@/content/types";

export function BlogGrid({ posts, planned, categories }: { posts: PostCard[]; planned: PostCard[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const match = (p: PostCard) => cat === "All" || p.category === cat || (cat === "Smart meters" && p.category === "Smart meters");
  const live = posts.filter(match);
  const next = planned.filter(match);
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cx("min-h-10 rounded-full px-4 text-sm font-semibold transition-colors", cat === c ? "bg-navy-900 text-white" : "border border-line text-ink hover:bg-navy-50")}>
            {c}
          </button>
        ))}
      </div>
      <div className="relative z-10 mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {live.map((p) => <PostCardView key={p.title} post={p} size="lg" />)}
        {live.length === 0 && <p className="rounded-2xl border border-line bg-white p-8 text-body md:col-span-3">No published guides in this topic yet. See what is coming next below.</p>}
      </div>
      {next.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-extrabold text-ink">Coming next</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {next.map((p) => <PostCardView key={p.title} post={p} />)}
          </div>
        </div>
      )}
    </>
  );
}
