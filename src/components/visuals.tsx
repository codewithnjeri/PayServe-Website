import {
  Building2, Camera, CheckCircle2, Droplets, Gauge, KeyRound, ShieldCheck, Smartphone, Wrench, Zap,
} from "lucide-react";
import { cx } from "./ui";

/* ------------------------------------------------------------------ */
/* Photo slot: a branded gradient panel until real photography lands. */
/* Pass `src` to show a real image instead.                            */
/* ------------------------------------------------------------------ */
const gradients = [
  "from-navy-800 via-navy-900 to-navy-950",
  "from-[#0e4c8a] via-navy-900 to-navy-950",
  "from-[#1d3b8f] via-[#13286b] to-[#0a1645]",
  "from-[#5a3a12] via-[#2b1d4a] to-navy-950",
];
const icons = { building: Building2, water: Droplets, power: Zap, gate: ShieldCheck, phone: Smartphone, repair: Wrench, camera: Camera };

export function ImageSlot({
  label, icon = "camera", tone = 0, className, src,
}: { label: string; icon?: keyof typeof icons; tone?: number; className?: string; src?: string }) {
  const Icon = icons[icon];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} loading="lazy" decoding="async" className={cx("w-full rounded-3xl object-cover", className)} />;
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={cx("relative isolate overflow-hidden rounded-3xl bg-gradient-to-br text-white", gradients[tone % gradients.length], className)}
    >
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-sky/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 -z-10 size-64 rounded-full bg-accent/25 blur-3xl" />
      <Icon className="absolute right-6 top-6 size-10 text-white/30" aria-hidden />
      <p className="absolute bottom-5 left-5 right-5 text-sm font-medium text-white/70">{label}</p>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("rounded-2xl border border-line bg-white p-5 text-ink shadow-lift", className)}>{children}</div>;
}

/* WhatsApp reminder with Pay now button, and the M-Pesa prompt it opens */
export function PhoneReminder({ className }: { className?: string }) {
  return (
    <div className={cx("relative mx-auto w-[290px] text-ink", className)} aria-label="A PayServe OnTime reminder on WhatsApp with a Pay now button" role="img">
      <div className="rounded-[2.6rem] border-[10px] border-navy-950 bg-[#efeae2] shadow-lift">
        <div className="flex items-center gap-3 rounded-t-[1.9rem] bg-[#075e54] px-4 pb-3 pt-5 text-white">
          <div className="grid size-9 place-items-center rounded-full bg-white/20 text-xs font-bold">PS</div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Altura Property</p>
            <p className="text-[11px] text-white/70">via PayServe OnTime</p>
          </div>
        </div>
        <div className="space-y-3 px-3 pb-6 pt-4">
          <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-white p-3 text-[13px] leading-snug shadow-sm">
            <p>Hi Wanjiru 👋 your invoice <b>INV-2048</b> for unit B-1204 is due on <b>5 Dec</b>.</p>
            <p className="mt-2 text-[22px] font-bold tracking-tight">KES 45,000</p>
            <div className="mt-3 rounded-lg bg-[#25d366] py-2 text-center text-[13px] font-bold text-white">Pay now</div>
            <p className="mt-1.5 text-right text-[10px] text-muted">09:00 ✓✓</p>
          </div>
          <div className="ml-auto max-w-[70%] rounded-xl rounded-tr-sm bg-[#d9fdd3] p-3 text-[13px] shadow-sm">
            Paid, thanks!
            <p className="mt-1 text-right text-[10px] text-muted">09:02 ✓✓</p>
          </div>
          <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-white p-3 text-[13px] shadow-sm">
            <p className="flex items-center gap-1.5 font-semibold text-success"><CheckCircle2 className="size-4" /> Payment received</p>
            <p className="mt-1 text-muted">Receipt SJK4XY12AB sent. Reminders stopped.</p>
          </div>
        </div>
      </div>
      <Card className="absolute -right-20 bottom-16 hidden w-48 p-4 lg:block">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">M-Pesa</p>
        <p className="mt-1 text-sm">Pay <b>KES 45,000</b> to PayServe acc. B1204?</p>
        <div className="mt-3 rounded-md bg-surface px-3 py-2 font-mono text-sm tracking-[0.4em] text-muted">••••</div>
      </Card>
    </div>
  );
}

/* Late-payer dashboard */
export function AgingDashboard({ className }: { className?: string }) {
  const buckets = [
    { label: "0–30", value: 62, amt: "KES 1.8M" },
    { label: "31–60", value: 24, amt: "KES 690K" },
    { label: "61–90", value: 9, amt: "KES 260K" },
    { label: "90+", value: 5, amt: "KES 140K" },
  ];
  const late = [
    { name: "Unit C-07", days: 41, tag: "Repeat" },
    { name: "Kamau Distributors", days: 18, tag: "" },
    { name: "Unit A-1102", days: 9, tag: "" },
  ];
  return (
    <Card className={cx("w-full max-w-md", className)}>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold">Overdue by age</p>
        <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">92% on time</span>
      </div>
      <div className="mt-5 flex h-36 items-end gap-3" aria-hidden>
        {buckets.map((b, i) => (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[11px] font-semibold text-muted">{b.amt}</span>
            <div className={cx("w-full rounded-t-lg", i === 0 ? "bg-navy-700" : i === 1 ? "bg-navy-800/70" : i === 2 ? "bg-accent" : "bg-[#d64545]")} style={{ height: `${Math.max(b.value, 6) * 1.4}px` }} />
            <span className="text-xs font-medium">{b.label}d</span>
          </div>
        ))}
      </div>
      <div className="mt-5 divide-y divide-line border-t border-line">
        {late.map((l) => (
          <div key={l.name} className="flex items-center justify-between py-2.5 text-sm">
            <span className="font-medium">{l.name}</span>
            <span className="flex items-center gap-2">
              {l.tag && <span className="rounded bg-accent-50 px-1.5 py-0.5 text-[11px] font-bold text-accent-600">{l.tag}</span>}
              <span className="text-muted">{l.days} days</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* Invoice run */
export function InvoiceRun({ className }: { className?: string }) {
  return (
    <Card className={cx("w-full max-w-sm", className)}>
      <p className="text-xs font-bold uppercase tracking-wider text-muted">Invoice run · 1 Dec</p>
      <p className="mt-2 font-display text-3xl font-extrabold">7,500 <span className="text-base font-semibold text-muted">invoices</span></p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface"><div className="h-full w-[86%] rounded-full bg-navy-700" /></div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-surface p-2"><p className="font-bold text-ink">6,450</p><p className="text-muted">Sent</p></div>
        <div className="rounded-lg bg-surface p-2"><p className="font-bold text-ink">eTIMS</p><p className="text-muted">Issued</p></div>
        <div className="rounded-lg bg-surface p-2"><p className="font-bold text-ink">1,050</p><p className="text-muted">Queued</p></div>
      </div>
    </Card>
  );
}

/* Rent roll */
export function RentRoll({ className, rows: count = 5 }: { className?: string; rows?: number }) {
  const rows = [
    ["A-0101", "Paid", "KES 38,000"],
    ["A-0102", "Paid", "KES 38,000"],
    ["B-1204", "Due", "KES 45,000"],
    ["B-1206", "Overdue", "KES 45,000"],
    ["C-0007", "Paid", "KES 52,000"],
  ];
  const tone: Record<string, string> = { Paid: "bg-success/10 text-success", Due: "bg-navy-100 text-navy-800", Overdue: "bg-[#fde8e8] text-[#b42318]" };
  return (
    <Card className={cx("w-full max-w-md p-0", className)}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <p className="font-display text-sm font-bold">Rent roll · December</p>
        <p className="text-xs text-muted">Live</p>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.slice(0, count).map(([u, s, a]) => (
            <tr key={u} className="border-b border-line last:border-0">
              <td className="px-5 py-3 font-medium">{u}</td>
              <td className="px-2 py-3"><span className={cx("rounded-full px-2.5 py-1 text-xs font-bold", tone[s])}>{s}</span></td>
              <td className="px-5 py-3 text-right text-muted">{a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* Water meter tile */
export function MeterTile({ kind = "water", className }: { kind?: "water" | "power"; className?: string }) {
  const water = kind === "water";
  return (
    <Card className={cx("w-64", className)}>
      <div className="flex items-center gap-3">
        <span className={cx("grid size-10 place-items-center rounded-xl", water ? "bg-sky/15 text-[#0b78b8]" : "bg-accent-50 text-accent-600")}>
          {water ? <Droplets className="size-5" /> : <Zap className="size-5" />}
        </span>
        <div>
          <p className="text-xs text-muted">{water ? "Water meter 0042315" : "Power meter AWT-0188"}</p>
          <p className="font-display text-lg font-bold">{water ? "12.48 m³" : "318.6 kWh"}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-sm">
        <span className="text-muted">Prepaid balance</span>
        <span className="font-bold">KES {water ? "1,240" : "860"}</span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-success"><Gauge className="size-3.5" /> Reading received 2 min ago</p>
    </Card>
  );
}

/* Guest QR pass */
function qrBits(seed = 7) {
  const bits: boolean[] = [];
  let x = seed;
  for (let i = 0; i < 21 * 21; i++) { x = (x * 1103515245 + 12345) % 2147483648; bits.push(x % 3 === 0); }
  return bits;
}
export function QrPass({ className }: { className?: string }) {
  const bits = qrBits();
  const finder = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
  return (
    <Card className={cx("w-60 text-center", className)}>
      <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted"><KeyRound className="size-3.5" /> Guest pass</p>
      <svg viewBox="0 0 21 21" className="mx-auto mt-3 size-36" aria-hidden shapeRendering="crispEdges">
        {bits.map((b, i) => {
          const r = Math.floor(i / 21), c = i % 21;
          const f = finder(r, c);
          const ring = f && (r % 14 === 0 || r % 14 === 6 || c % 14 === 0 || c % 14 === 6 || (r % 14 >= 2 && r % 14 <= 4 && c % 14 >= 2 && c % 14 <= 4));
          const on = f ? ring : b;
          return on ? <rect key={i} x={c} y={r} width="1" height="1" fill="#001858" /> : null;
        })}
      </svg>
      <p className="mt-3 font-display font-bold">Brian Otieno</p>
      <p className="text-xs text-muted">Visiting B-1204 · Today until 22:00</p>
      <p className="mt-3 rounded-lg bg-surface py-2 font-mono text-sm tracking-[0.3em]">PIN 4827</p>
    </Card>
  );
}
