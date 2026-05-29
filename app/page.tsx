import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Database,
  LayoutDashboard,
  Search,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";

const features = [
  [UsersRound, "Lead Management", "Capture leads, assign follow-ups, and move opportunities through a practical service-business pipeline."],
  [Database, "Client Database", "Keep client contacts, projects, value, and status in one searchable workspace."],
  [CreditCard, "Invoice Tracking", "Track draft, sent, paid, and overdue invoices with clear outstanding totals."],
  [ClipboardCheck, "Task Pipeline", "Create and complete tasks tied to clients, invoices, and follow-up moments."],
  [BarChart3, "Revenue Analytics", "Use simple CSS charts and cards to see revenue, conversion, and pipeline value."],
  [BellRing, "Follow-Up Reminders", "Show what needs attention next before service teams miss a lead or invoice."],
] as const;

function MiniDashboard() {
  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-glow">
      <div className="grid lg:grid-cols-[190px_1fr]">
        <aside className="hidden bg-slate-950 p-5 text-white lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600"><Sparkles className="h-5 w-5" /></div>
            <div><p className="font-semibold">NovaCRM</p><p className="text-xs text-slate-400">Live demo</p></div>
          </div>
          <div className="mt-8 space-y-2 text-sm text-slate-300">
            {["Dashboard", "Leads", "Clients", "Invoices", "Tasks"].map((item, index) => (
              <div className={index === 0 ? "rounded-2xl bg-white px-3 py-2.5 text-slate-950" : "rounded-2xl px-3 py-2.5"} key={item}>{item}</div>
            ))}
          </div>
        </aside>
        <div className="bg-slate-50 p-5">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-medium text-slate-500">Functional CRM demo</p><h2 className="text-2xl font-semibold tracking-tight">Service business command center</h2></div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500"><Search className="h-4 w-4" /> Search leads</div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[["Total leads", "6"], ["Active clients", "4"], ["Open invoices", "4"], ["Revenue", "EUR 8k"]].map(([label, value]) => (
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={label}><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-semibold">Lead pipeline</p>
              <div className="mt-4 space-y-3">
                {["Cleanova Wien", "UrbanDent Clinic", "Prime Move Wien"].map((item, index) => <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm" key={item}><span className="font-semibold">{item}</span><span className={index === 0 ? "text-blue-600" : index === 1 ? "text-amber-600" : "text-violet-600"}>{["New", "Proposal", "Contacted"][index]}</span></div>)}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-semibold">Revenue chart</p>
              <div className="mt-5 flex h-36 items-end gap-2 rounded-2xl bg-slate-50 p-3">
                {[42, 58, 49, 72, 66, 88, 81, 96].map((height, index) => <div className="flex flex-1 items-end" key={`${height}-${index}`}><div className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-violet-500" style={{ height: `${height}%` }} /></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-cloud text-slate-950">
      <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link className="flex items-center gap-3" href="/" aria-label="NovaCRM home"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles className="h-5 w-5" /></span><span className="text-lg font-semibold tracking-tight">NovaCRM</span></Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"><a href="#features">Features</a><a href="#demo">Demo</a><a href="#automation">Automation</a><a href="#faq">FAQ</a></nav>
          <Link className="hidden rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm md:inline-flex" href="/dashboard">Open Dashboard</Link>
        </div>
      </header>

      <section className="px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Simple CRM for Growing Service Businesses</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">NovaCRM helps small teams manage leads, clients, invoices, and follow-ups in one clean dashboard.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700" href="/dashboard">View Dashboard <ArrowRight className="h-4 w-4" /></Link>
              <a className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-slate-300" href="#features">Explore Features</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {["Lead Tracking", "Invoice Overview", "Task Management", "Automation Ready"].map((item) => <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 font-semibold text-slate-700 shadow-sm" key={item}>{item}</div>)}
            </div>
          </div>
          <MiniDashboard />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["missed leads", "messy spreadsheets", "forgotten follow-ups", "unclear revenue", "manual client management"].map((problem) => <div className="rounded-3xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-700" key={problem}>{problem}</div>)}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-7xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Functional CRM features</p><h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">A portfolio landing page with a real frontend SaaS demo behind it.</h2><p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">The demo includes interactive lead, invoice, client, and task management powered by local React state and realistic mock data.</p></div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, description]) => <article className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" key={title}><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3><p className="mt-3 leading-7 text-slate-600">{description}</p></article>)}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8" id="demo">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Dashboard route</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Open the SaaS-style CRM workspace.</h2><p className="mt-4 text-lg leading-8 text-slate-300">Use /dashboard to search leads and clients, add new leads, update statuses, mark invoices paid, add tasks, and view revenue and pipeline analytics.</p><Link className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="/dashboard">Launch CRM demo <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Lead status updates", "Client detail modals", "Invoice paid actions", "Task completion toggles"].map((item) => <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur" key={item}><CheckCircle2 className="h-5 w-5 text-blue-300" /><p className="mt-4 font-semibold">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="automation">
        <div className="mx-auto max-w-7xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Automation ready</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built to preview real business workflows.</h2><p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">NovaCRM models how website leads, reminders, invoice generation, client status updates, and email notifications could connect to a backend later.</p></div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 lg:grid-cols-5">{["Website lead", "Reminder", "Invoice", "Status update", "Notification"].map((item) => <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm" key={item}><Workflow className="h-5 w-5 text-violet-600" /><h3 className="mt-5 font-semibold">{item}</h3><p className="mt-2 text-sm leading-6 text-slate-600">A frontend preview of how this step fits into the future CRM automation flow.</p></div>)}</div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Case study</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From presentation site to usable SaaS prototype.</h2><p className="mt-4 text-lg leading-8 text-slate-600">NovaCRM now demonstrates marketing design, dashboard information architecture, and working local-state CRM operations.</p></div><div className="grid gap-4 sm:grid-cols-2">{["fewer missed leads", "faster follow-ups", "clearer revenue overview", "better client organization"].map((impact) => <div className="rounded-3xl bg-slate-50 p-5 font-semibold" key={impact}>{impact}</div>)}</div></div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="faq">
        <div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">FAQ</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions about the demo</h2></div><div className="mt-10 divide-y divide-slate-200 rounded-[26px] border border-slate-200 bg-white shadow-sm">{[["Who is NovaCRM for?", "Small service businesses that need better lead, client, invoice, and task visibility."], ["Is the dashboard functional?", "Yes. It uses local React state for adding, filtering, updating, and deleting mock CRM records."], ["Does it have a backend?", "Not yet. The README lists Supabase, auth, roles, invoices, reminders, and Stripe as future backend steps."], ["Is it responsive?", "Yes. The landing page and dashboard are designed for mobile and desktop layouts."]].map(([question, answer]) => <details className="group p-6" key={question}><summary className="cursor-pointer list-none font-semibold">{question}</summary><p className="mt-4 leading-7 text-slate-600">{answer}</p></details>)}</div></div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl rounded-[32px] bg-slate-950 p-8 text-center text-white shadow-2xl sm:p-12"><LayoutDashboard className="mx-auto h-10 w-10 text-blue-300" /><h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Need a custom CRM for your business?</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">We design and build simple dashboards, CRM systems, and automation tools for modern service companies.</p><Link className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="/dashboard">Try the demo <ArrowRight className="h-4 w-4" /></Link></div></section>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles className="h-5 w-5" /></span><span className="text-lg font-semibold">NovaCRM</span></div><p className="text-sm text-slate-500">© 2026 NovaCRM. Portfolio CRM demo.</p></div></footer>
    </main>
  );
}
