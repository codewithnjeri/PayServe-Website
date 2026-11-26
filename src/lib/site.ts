// Central site data: navigation, footer, shared lists and figures.
// Values marked TODO were highlighted in the wireframes as guesses to confirm.

export const site = {
  name: "PayServe",
  tagline: "Smart, easy, guarantee",
  phone: "+254 733 902 550",
  whatsapp: "https://wa.me/254733902550",
  urgentLine: "+254 7XX XXX XXX", // TODO: confirm urgent support line
  email: "hello@payserve.co.ke", // TODO: confirm
  address: ["6th Floor, Northern Tower", "Kenrail Towers, Ring Road", "Westlands, Nairobi"],
  unitsBilled: "5,878",
};

// One source of truth for the offer bar and the Book a Demo confirmation.
// TODO: confirm the real end date (wireframes disagreed: 30-day countdown vs 12 Nov 2026).
export const offer = {
  enabled: true,
  headline: "15% off all PayServe services.",
  detail: "Sign up within 30 days.",
  endsAt: "2026-12-05T23:59:59+03:00",
};

export type NavLink = { label: string; href: string; description?: string; badge?: string };

export const productsMenu = {
  groups: [
    {
      title: "What you get",
      links: [
        { label: "Invoicing and Billing", href: "/invoicing#invoicing", description: "Bulk, recurring and one-off invoices" },
        { label: "PayServe OnTime", href: "/invoicing#ontime", description: "Automatic reminders" },
        { label: "Payments and Collections", href: "/invoicing#collections", description: "M-Pesa and bank, matched and receipted", badge: "optional" },
        { label: "Reporting and Accounting Sync", href: "/invoicing#reporting", description: "Your books, always current" },
      ],
    },
    {
      title: "Built for",
      links: [
        { label: "Real Estate", href: "/real-estate", description: "Rent, service charge, meters and gate" },
        { label: "Distribution and Wholesale", href: "/invoicing/industries#distribution", description: "Every order and retailer account" },
        { label: "Logistics and Freight", href: "/invoicing/industries#logistics", description: "Every shipment and recharge" },
        { label: "Security Services", href: "/invoicing/industries#security", description: "Monthly invoices for every client site" },
        { label: "Professional and B2B Services", href: "/invoicing/industries#professional", description: "Retainers and project fees" },
      ],
    },
  ],
  feature: {
    eyebrow: "Featured",
    title: "Reminders your customers actually see",
    href: "/invoicing#ontime",
    cta: "See PayServe OnTime",
  },
  footerLinks: [
    { label: "Every business we work with", href: "/invoicing/industries" },
    { label: "Plans", href: "/book-demo" },
    { label: "All products", href: "/invoicing" },
  ],
};

export const realEstateMenu = {
  groups: [
    {
      title: "Metering and billing",
      links: [
        { label: "Smart Water Meters", href: "/smart-meters#water", description: "Prepaid or postpaid, read remotely" },
        { label: "Smart Power Meters", href: "/smart-meters#power", description: "Every unit on the right account" },
        { label: "Rent Collection", href: "/real-estate#billing", description: "Rent and service charge, matched per unit" },
      ],
    },
    {
      title: "Security",
      links: [{ label: "Access Control", href: "/access-control", description: "Secure gate entry by QR or one-time PIN" }],
    },
    {
      title: "Property operations",
      links: [
        { label: "Maintenance", href: "/real-estate#operations", description: "Every repair tracked to closure" },
        { label: "Booking Management", href: "/real-estate#operations" },
        { label: "Expenses and Procurement", href: "/real-estate#operations" },
        { label: "Commercial Services (VAS)", href: "/real-estate#operations" },
        { label: "Hand-Over Management", href: "/real-estate#operations" },
        { label: "Resident Portal and Mobile Access", href: "/real-estate#operations" },
      ],
    },
    {
      title: "By property type",
      links: [
        { label: "Residential Buildings", href: "/real-estate#types" },
        { label: "Gated Communities", href: "/real-estate#types" },
        { label: "Commercial Buildings", href: "/real-estate#types" },
        { label: "Retail Centres", href: "/real-estate#types" },
        { label: "Mixed-Use Developments", href: "/real-estate#types" },
        { label: "Utility Service Providers", href: "/real-estate#types" },
      ],
    },
  ],
  feature: {
    eyebrow: "Case study",
    title: "How Altura gets paid on time, every month",
    href: "/real-estate#case",
    cta: "Read the story",
  },
  footerLinks: [
    { label: "PayServe for Real Estate", href: "/real-estate" },
    { label: "Smart Meters overview", href: "/smart-meters" },
    { label: "All projects", href: "/real-estate#projects" },
  ],
};

export const resourcesMenu = {
  groups: [
    {
      title: "Learn",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/#stories" },
      ],
    },
    {
      title: "Support",
      links: [
        // TODO: add Knowledge Base and White Papers links once those pages exist.
        { label: "FAQs", href: "/#faq" },
        { label: "Support Tickets", href: "/support-resources/tickets" },
        { label: "Online Chat", href: site.whatsapp },
      ],
    },
  ],
  feature: {
    eyebrow: "Latest guide",
    title: "How to get paid on time in Kenya: 7 habits",
    href: "/blog/get-paid-on-time-kenya",
    cta: "Read the guide",
  },
};

export const loginLinks = [
  { key: "resident", label: "Resident", description: "Pay bills and view your statements", href: "https://resident.payserve.co.ke" },
  { key: "manager", label: "Property Manager", description: "Manage properties, invoices and collections", href: "https://app.payserve.co.ke" },
] as const;

export const contactMenu = {
  groups: [
    {
      links: [
        { label: "Support", href: "/support-resources/tickets", description: "Raise or track a ticket" },
        { label: "Blog", href: "/blog", description: "Guides on invoicing and property" },
        { label: "Contact Sales", href: "/book-demo", description: "Talk to our team" },
        { label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, description: "Call us" },
      ],
    },
  ],
};

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Invoicing and Billing", href: "/invoicing#invoicing" },
      { label: "PayServe OnTime", href: "/invoicing#ontime" },
      { label: "Payments and Collections", href: "/invoicing#collections" },
      { label: "Reporting and Accounting Sync", href: "/invoicing#reporting" },
      { label: "Plans", href: "/book-demo" },
    ],
  },
  {
    title: "Smart Meters",
    links: [
      { label: "Smart Water Meters", href: "/smart-meters#water" },
      { label: "Smart Power Meters", href: "/smart-meters#power" },
      { label: "Access Control", href: "/access-control" },
    ],
  },
  {
    title: "Built for",
    links: [
      { label: "Real Estate", href: "/real-estate" },
      { label: "Distribution and Wholesale", href: "/invoicing/industries#distribution" },
      { label: "Logistics and Freight", href: "/invoicing/industries#logistics" },
      { label: "Security Services", href: "/invoicing/industries#security" },
      { label: "Professional and B2B Services", href: "/invoicing/industries#professional" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/#stories" },
      { label: "FAQs", href: "/#faq" },
      { label: "Support Tickets", href: "/support-resources/tickets" },
      { label: "Raise a ticket", href: "/support-resources/tickets/new" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About PayServe", href: "/about" },
      { label: "Contact Us", href: "/book-demo" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export type Brand = { name: string; logo?: string; width?: number; height?: number; wordmark?: boolean };

export const banks: Brand[] = [
  { name: "M-Pesa", logo: "mpesa", width: 240, height: 89, wordmark: true },
  { name: "Equity", logo: "equity", width: 148, height: 96, wordmark: true },
  { name: "KCB", logo: "kcb", width: 48, height: 48 },
  { name: "Co-op Bank", logo: "coop", width: 64, height: 94 },
  { name: "NCBA", logo: "ncba", width: 40, height: 42 },
  { name: "Absa", logo: "absa", width: 96, height: 96, wordmark: true },
  { name: "Standard Chartered", logo: "stanchart", width: 62, height: 96 },
  { name: "Stanbic", logo: "stanbic", width: 82, height: 96 },
  { name: "I&M Bank", logo: "im", width: 96, height: 96 },
  { name: "DTB", logo: "dtb", width: 240, height: 43, wordmark: true },
  { name: "Family Bank", logo: "family", width: 78, height: 96 },
  { name: "National Bank", logo: "national", width: 97, height: 96 },
  { name: "Citibank", logo: "citi", width: 43, height: 26, wordmark: true },
  { name: "Prime Bank", logo: "prime", width: 240, height: 52, wordmark: true },
  { name: "Bank of Africa", logo: "boa", width: 54, height: 54 },
  { name: "HFC" },
];
export const integrations: Brand[] = [
  { name: "QuickBooks", logo: "quickbooks", width: 96, height: 96 },
  { name: "Sage", logo: "sage", width: 171, height: 96, wordmark: true },
  { name: "Xero", logo: "xero", width: 96, height: 96 },
  { name: "Zoho Books", logo: "zoho", width: 226, height: 96 },
  { name: "Odoo", logo: "odoo", width: 240, height: 77, wordmark: true },
  { name: "Microsoft Dynamics 365", logo: "microsoft", width: 96, height: 96 },
  { name: "SAP", logo: "sap", width: 193, height: 96, wordmark: true },
  { name: "Oracle NetSuite", logo: "oracle", width: 32, height: 22 },
  { name: "Salesforce", logo: "salesforce", width: 31, height: 24 },
  { name: "HubSpot", logo: "hubspot", width: 92, height: 96 },
  { name: "Zoho CRM", logo: "zoho", width: 226, height: 96 },
  { name: "Dynamics 365 Sales", logo: "microsoft", width: 96, height: 96 },
  { name: "Open API + CSV import" },
];

/** Photos live in public/images/projects. Projects without a photo show a placeholder. */
export const projects: { name: string; tags: string[]; image?: string }[] = [
  { name: "Mwalimu Kisaju", tags: ["Gated Communities", "Residential Buildings", "Utility Service Providers"], image: "/images/projects/mwalimu-kisaju.jpg" },
  { name: "Altura", tags: ["Mixed-use Developments", "Utility Service Providers"], image: "/images/projects/altura.jpg" },
  { name: "Northlands Heights", tags: ["Gated Communities", "Residential Buildings", "Utility Service Providers"], image: "/images/projects/northlands-heights.jpg" },
  { name: "Yaya Center", tags: ["Commercial Buildings"], image: "/images/projects/yaya-center.jpg" },
  { name: "Nauras Towers", tags: ["Residential Buildings", "Utility Service Providers"], image: "/images/projects/nauras-towers.jpg" },
  { name: "Enkaang Apartments", tags: ["Residential Buildings"], image: "/images/projects/enkaang-apartments.jpg" },
  { name: "Amani Luxury Apartments", tags: ["Residential Buildings"], image: "/images/projects/amani-luxury-apartments.jpg" },
  { name: "Volaire", tags: ["Residential Buildings"], image: "/images/projects/volaire.jpg" },
  { name: "Sarit Center", tags: ["Commercial Buildings"], image: "/images/projects/sarit-centre.jpg" },
  { name: "Knights Bridge Apartments", tags: ["Residential Buildings", "Utility Service Providers"], image: "/images/projects/knights-bridge-apartments.jpg" },
  { name: "Amani Beach Front Apartments", tags: ["Residential Buildings"], image: "/images/projects/amani-beach-front-apartments.jpg" },
  { name: "Kitengela Plains", tags: ["Gated Communities", "Residential Buildings"], image: "/images/projects/kitengela-plains.jpg" },
  { name: "Escada Apartments", tags: ["Residential Buildings"], image: "/images/projects/escada-apartments.jpg" },
  { name: "JJ Tower Nairobi", tags: ["Mixed-use Developments", "Utility Service Providers"], image: "/images/projects/jj-tower.jpg" },
  { name: "Mumwe Gardens Runda Estate", tags: ["Gated Communities", "Residential Buildings", "Utility Service Providers"], image: "/images/projects/mumwe-gardens.jpg" },
];

export const projectCategories = [
  "Commercial Buildings", "Gated Communities", "Mixed-use Developments", "Residential Buildings", "Utility Service Providers",
];

export const reminderSchedule = [
  { when: "3 days before", channel: "SMS + email", tone: "Friendly heads-up" },
  { when: "Due date", channel: "WhatsApp + Pay now link", tone: "Clear and polite" },
  { when: "3 days late", channel: "SMS + WhatsApp", tone: "Firmer" },
  { when: "7 days late", channel: "Email + call task for your team", tone: "Final notice" },
];

export const ontimeBullets = [
  "Reminders by SMS, WhatsApp and email, before, on and after every due date",
  "Tone moves from friendly to firm, and stops the moment a customer pays",
  "A Pay now link in every invoice and reminder: one tap opens an M-Pesa prompt",
  "Every invoice issued through KRA eTIMS",
  "A full history of every reminder sent",
];

export const insightBullets = [
  "Who owes what, and for how long, per customer or unit",
  "Repeat late payers highlighted, so you can call before it becomes a habit",
  "Collection rate and days-to-pay, month by month",
  "Reports ready for your finance team, no spreadsheet needed",
];

const integrationsAnswer =
  "Yes. PayServe connects to QuickBooks, Sage, Xero, Zoho Books, Odoo, Microsoft Dynamics, SAP Business One, Oracle NetSuite and leading CRMs such as Salesforce, HubSpot and Zoho CRM, or to your own system through our API. Invoices and payments post automatically.";

export const faqs = {
  billManager: {
    q: "We already use M-Pesa Bill Manager. Why PayServe?",
    a: "Bill Manager is a good start for M-Pesa bills. PayServe adds bank payments alongside M-Pesa, reminders by WhatsApp and email as well as SMS, eTIMS invoices, a live view of who is late and by how long, and sync to your finance system or CRM. For property, it also runs your smart meters and your gate.",
  },
  collect: {
    q: "Do we have to let PayServe collect our payments?",
    a: "No. Use it for invoicing and reminders only and keep your own Paybill or bank. Add collections whenever you are ready.",
  },
  integrations: { q: "Will it work with our accounting system or CRM?", a: integrationsAnswer },
  start: {
    q: "How long does it take to get started?",
    a: "Most businesses are live in 14 days. We import your customers and open invoices for you, and train your team.",
  },
  pricing: {
    q: "How is PayServe priced?",
    a: "By the number of units or invoices you bill each month. Book a demo and we will quote for your volume.",
  },
  etims: {
    q: "Are invoices eTIMS compliant?",
    a: "Yes. Every invoice is issued through KRA eTIMS, so your customers can claim the expense.",
  },
};
