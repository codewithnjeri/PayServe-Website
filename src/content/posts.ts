import type { PostCard } from "./types";
import { articles } from "./articles";

export { articles };

export const posts: Record<string, PostCard> = {
  paid: {
    slug: "get-paid-on-time-kenya",
    category: "Getting paid on time",
    title: "How to get paid on time in Kenya: 7 habits of businesses that send hundreds of invoices",
    excerpt: "eTIMS-ready invoices, reminders on WhatsApp and SMS, and M-Pesa payments matched as they arrive.",
    meta: "PayServe team · 9 min read",
  },
  meters: {
    slug: "smart-water-meters-apartments-kenya",
    category: "Smart meters",
    title: "Smart water meters for apartments in Kenya: a practical guide for property managers",
    excerpt: "Prepaid or postpaid, what to check before you install, and how residents pay by M-Pesa.",
    meta: "PayServe team · 8 min read",
  },
  water: {
    slug: "reduce-non-revenue-water",
    category: "Water loss",
    title: "What Phnom Penh, Manila and Casablanca teach us about lost water",
    excerpt:
      "Phnom Penh cut losses from 72% to 6% and Casablanca saved water for 100,000 people. The same playbook works in your building.",
    meta: "PayServe team · 9 min read",
  },
};

export const plannedPosts: PostCard[] = [
  {
    category: "Getting paid on time",
    title: "PayServe or M-Pesa Bill Manager: which fits your business?",
    excerpt: "What each does, and when you need more than M-Pesa bills.",
    meta: "Coming soon",
    planned: true,
  },
  {
    category: "eTIMS and tax",
    title: "eTIMS and invoicing explained for businesses",
    excerpt: "Who must issue eTIMS invoices, and why it affects when you get paid.",
    meta: "Coming soon",
    planned: true,
  },
  {
    category: "Real estate",
    title: "How to collect rent with M-Pesa",
    excerpt: "Paybill references, reminders and matching rent to the right unit.",
    meta: "Coming soon",
    planned: true,
  },
  {
    category: "Customer stories",
    title: "How Altura gets paid on time, every month",
    excerpt: "From manual invoicing to payment status per unit as payments arrive.",
    meta: "Coming soon",
    planned: true,
  },
];

export const blogCategories = [
  "All", "Getting paid on time", "eTIMS and tax", "Real estate", "Smart meters", "Water loss", "Customer stories",
];
