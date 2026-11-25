import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ChatButton, Footer } from "@/components/layout/Footer";
import { OfferBar } from "@/components/interactive";
import { offer } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "PayServe: invoicing that gets you paid on time",
    template: "%s · PayServe",
  },
  description:
    "PayServe sends your invoices on time, reminds customers automatically, and collects and matches every payment through M-Pesa or your bank. Smart meters and access control for property.",
  metadataBase: new URL("https://payserve.co.ke"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        {offer.enabled && <OfferBar headline={offer.headline} detail={offer.detail} endsAt={offer.endsAt} href="/book-demo" />}
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
