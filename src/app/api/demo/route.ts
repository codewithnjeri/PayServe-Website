import { NextResponse } from "next/server";

// Demo requests. TODO: forward to the sales inbox / CRM (e.g. Zoho CRM or HubSpot) and send a WhatsApp confirmation.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false }, { status: 400 });
  const { name, phone, email, need } = body as Record<string, string>;
  if (!name || !phone || !email) return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 422 });
  console.log("[demo request]", { name, phone, email, need });
  return NextResponse.json({ ok: true });
}
