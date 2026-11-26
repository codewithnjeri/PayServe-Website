// Client stories: shown in the home page carousel and on /stories/[slug].
// Only copy that PayServe has already published on the site. Photos live in public/images/projects.

export type Story = {
  slug: string;
  org: string;
  type: string;
  /** A client quote (shown in quotation marks) or a results summary. */
  quote: string;
  isQuote?: boolean;
  /** Who said it, when the story is a client quote. */
  who?: string;
  photo: string;
  /** Photo width and height in pixels, so the story page can show it uncropped. */
  photoSize: [number, number];
  /** Tailwind object-position class when the photo needs framing. */
  focus?: string;
  /** Extra published detail, shown on the story page. */
  detail?: string;
  link?: { href: string; label: string };
};

export const stories: Story[] = [
  {
    slug: "altura",
    org: "Altura",
    type: "Mixed-use, Upper Hill",
    quote:
      "Before PayServe, we invoiced by hand and only knew who had paid once our accountant finished reconciling. By then it was too late to chase anyone. Now invoices go out on time every month, payments reach our account almost without effort, we spot late payers early, and we can see every unit's payment status as it happens.",
    isQuote: true,
    who: "Altura, Upper Hill",
    photo: "/images/projects/altura-day.jpg",
    photoSize: [494, 619],
    focus: "object-[center_15%]",
    detail: "500 smart power meters billed every month, invoices out on time, every payment matched to its unit, and late payers spotted early.",
    link: { href: "/real-estate#case", label: "Read the Altura case study" },
  },
  {
    slug: "northlands-heights",
    org: "Northlands Heights",
    type: "1,000+ homes",
    quote: "1,074 smart water meters on prepaid billing, service charge billed from each owner's handover date, and every transaction posted to Zoho.",
    photo: "/images/projects/northlands-heights.jpg",
    photoSize: [1200, 900],
  },
  {
    slug: "sarit-center",
    org: "Sarit Center",
    type: "Commercial",
    quote: "Rent, service charge and utilities billed to every shop on the same day each month, with payments matched to each tenant.",
    photo: "/images/projects/sarit-centre.jpg",
    photoSize: [1200, 800],
  },
  {
    slug: "mumwe-gardens",
    org: "Mumwe Gardens",
    type: "Gated community",
    quote: "Prepaid water and service charge for every home, plus QR visitor access at the gate.",
    photo: "/images/projects/mumwe-gardens.jpg",
    photoSize: [678, 452],
  },
];
