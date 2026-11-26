import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of service" };

// TODO: replace with PayServe's full terms of service.
export default function TermsPage() {
  return <LegalPage title="Terms of service" updated="26 November 2026" subject="terms of service" />;
}
