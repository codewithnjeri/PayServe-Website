export type Article = {
  slug: string;
  title: string;
  category: string;
  reviewer: string;
  readTime: string;
  updated: string;
  bodyHtml: string;
  toc: { id: string; label: string }[];
  cta: { title: string; text: string; href: string; label: string };
  faqs: { q: string; a: string }[];
  sources: string[];
  disclaimer: string | null;
};

export type PostCard = {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  meta: string;
  /** Product photo on a white background, shown whole on the card. */
  cover?: { src: string; alt: string };
  planned?: boolean;
};
