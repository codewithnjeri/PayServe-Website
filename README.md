# PayServe website (Next.js)

Marketing site and support pages for PayServe, built from the October 2026 wireframes. The visual style follows RealPage: a utility bar, mega-menu navigation, dark gradient heroes, image cards, stat bands, and a dark footer. It uses the PayServe navy (`#001858`) and orange (`#F09820`).

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Fonts are self-hosted through `@fontsource` (Plus Jakarta Sans for headings, Inter for body text)
- Icons from `lucide-react`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/invoicing` | Products / PayServe OnTime (anchors: `#invoicing`, `#ontime`, `#collections`, `#reporting`) |
| `/invoicing/industries` | Built for (sectors) |
| `/real-estate` | PayServe for Real Estate (anchors: `#billing`, `#operations`, `#types`, `#projects`, `#case`) |
| `/smart-meters` | Smart Meters (`#water`, `#power`) |
| `/access-control` | Access Control |
| `/book-demo` | Book a Demo (`?for=real-estate` pre-selects the property option) |
| `/blog`, `/blog/[slug]` | Blog index and the three articles |
| `/support-resources/tickets` | Support tickets list and ticket view |
| `/support-resources/tickets/new` | Raise a ticket |
| `/api/demo` | POST endpoint for demo requests (logs only for now) |

## Where to edit things

- **Navigation, footer, figures and shared lists:** `src/lib/site.ts`. This file also holds the offer end date (`offer.endsAt`), the phone numbers, banks, integrations and FAQs.
- **Blog articles:** `src/content/articles.ts`, which was generated from the wireframe HTML. Blog cards and planned posts live in `src/content/posts.ts`.
- **Shared UI:** `src/components/ui.tsx` (buttons, headings, sections), `sections.tsx` (hero, FAQ, CTA band, carousels and marquees) and `visuals.tsx` (product mock-ups and photo slots).
- **Header and mega menus:** `src/components/layout/Header.tsx`.

## Placeholders to replace before launch

- **Photos:** every `ImageSlot` renders a branded gradient. To show a real photo, pass `src="/images/....jpg"`.
- **Unconfirmed copy:** text the wireframes highlighted as unconfirmed renders in yellow through the `<Confirm>` component. This covers:
  - reviewer names, the Altura quote attribution, and the 4.8 ★ / PropTech award
  - the referral amount and terms, and the urgent support line
  - the "(est.)" business hours, and which integrations are live
- **Offer end date:** the wireframes disagreed on this. It is now one value, `offer.endsAt`, used by both the offer bar and the demo form.
- **Back ends still to connect:**
  - Demo requests: `/api/demo` only logs them. Connect it to the CRM or sales inbox.
  - Support tickets: the list and ticket view use sample data. Connect them to the ticket API.
  - Newsletter: the signup form is not wired up yet.
  - Links that still point to `#`: knowledge base and careers. The Login menu links to resident.payserve.co.ke (Resident) and app.payserve.co.ke (Property Manager), set in `loginLinks` in `src/lib/site.ts`.
