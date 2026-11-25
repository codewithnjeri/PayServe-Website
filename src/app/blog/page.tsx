import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { blogCategories, plannedPosts, posts } from "@/content/posts";
import { site } from "@/lib/site";
import { BlogGrid } from "./BlogGrid";

export const metadata: Metadata = {
  title: "Blog: guides to invoicing, getting paid and running property",
  description: "Practical guides to invoicing, getting paid and running property in East Africa.",
};

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-line bg-white relative overflow-hidden pb-40">
        <Container className="relative pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">Blog</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] sm:text-[3.4rem]">
            Practical guides to invoicing, getting paid and running property in East Africa.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-body">
            Written by the PayServe team, reviewed by the people who run billing for {site.unitsBilled} units, with every figure linked to its source.
          </p>
        </Container>
      </section>
      <Container className="relative -mt-32 pb-24">
        <BlogGrid posts={Object.values(posts)} planned={plannedPosts} categories={blogCategories} />
      </Container>
      <Section tone="surface" className="py-14">
        <form className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between" action="#">
          <div>
            <h2 className="text-2xl font-extrabold">Get new guides by email</h2>
            <p className="mt-1 text-body">One email a month. No spam.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="sr-only" htmlFor="nl-email">Work email</label>
            <input id="nl-email" type="email" required placeholder="Work email" className="min-h-12 min-w-72 rounded-full border border-[#c9cfdb] bg-white px-5 outline-none focus:border-navy-800" />
            <button type="submit" className="min-h-12 rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800">Subscribe</button>
          </div>
        </form>
      </Section>
    </>
  );
}
