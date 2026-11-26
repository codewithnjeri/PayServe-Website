import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy policy" };

// TODO: replace with PayServe's full privacy policy.
export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" updated="26 November 2026" subject="privacy policy" />;
}
