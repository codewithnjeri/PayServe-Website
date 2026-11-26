import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { footerColumns, site } from "@/lib/site";
import { PhoneAppIcon, WhatsAppIcon } from "../app-icons";
import { AddressMenu } from "./AddressMenu";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-body">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Invoicing, reminders and collections for businesses that send a lot of invoices, plus smart meters and access control for property.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li><AddressMenu /></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label={`Call PayServe on ${site.phone}`} className="flex items-center gap-3 hover:text-navy-800"><PhoneAppIcon />{site.phone}</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with PayServe on WhatsApp" className="flex items-center gap-3 hover:text-navy-800"><WhatsAppIcon />WhatsApp us</a></li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-bold text-ink">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="hover:text-navy-800">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© PayServe. All rights reserved.</p>
          <p>Invoices issued through KRA eTIMS · Connected to M-Pesa and Kenya&apos;s major banks</p>
        </div>
      </div>
    </footer>
  );
}

export function ChatButton() {
  return (
    <a
      href={site.whatsapp}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-navy-900 text-[15px] font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5 sm:size-auto sm:min-h-12 sm:px-5"
    >
      <MessageCircle className="size-6 text-accent sm:size-5" /> <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
