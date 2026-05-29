"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Database,
  FileText,
  Filter,
  LayoutDashboard,
  MailCheck,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";

type DashboardTab = "Leads" | "Invoices" | "Tasks";

type Lead = {
  company: string;
  owner: string;
  service: string;
  stage: string;
  value: string;
  nextStep: string;
};

type Task = {
  title: string;
  due: string;
  status: "Today" | "In progress" | "Scheduled";
};

const leads: Lead[] = [
  {
    company: "Vienna Clean Services",
    owner: "Marta H.",
    service: "Commercial cleaning",
    stage: "New Lead",
    value: "EUR 4,800",
    nextStep: "Qualify request",
  },
  {
    company: "UrbanDent Clinic",
    owner: "Dr. Weiss",
    service: "Patient follow-up system",
    stage: "Contacted",
    value: "EUR 7,200",
    nextStep: "Send proposal",
  },
  {
    company: "Prime Move Wien",
    owner: "Jonas K.",
    service: "Moving quote flow",
    stage: "Proposal Sent",
    value: "EUR 3,900",
    nextStep: "Call Friday",
  },
  {
    company: "Studio Luna",
    owner: "Elena R.",
    service: "Booking pipeline",
    stage: "Won",
    value: "EUR 5,600",
    nextStep: "Create invoice",
  },
];

const featureCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: UsersRound,
    title: "Lead Management",
    description: "Capture every enquiry, assign next steps, and keep the most valuable opportunities visible.",
  },
  {
    icon: Database,
    title: "Client Database",
    description: "Organize contact details, notes, projects, and communication history in one searchable view.",
  },
  {
    icon: FileText,
    title: "Invoice Tracking",
    description: "See draft, sent, overdue, and paid invoices without chasing separate spreadsheets.",
  },
  {
    icon: ClipboardCheck,
    title: "Task Pipeline",
    description: "Turn sales and client work into practical task lists with clear ownership and deadlines.",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Understand monthly revenue, open pipeline value, and the health of your client base.",
  },
  {
    icon: BellRing,
    title: "Follow-Up Reminders",
    description: "Surface timely reminders so new leads, proposals, and invoices do not get forgotten.",
  },
];

const pipelineColumns = [
  { title: "New Lead", cards: ["Vienna Clean Services"], accent: "bg-blue-500" },
  { title: "Contacted", cards: ["UrbanDent Clinic"], accent: "bg-violet-500" },
  { title: "Proposal Sent", cards: ["Prime Move Wien"], accent: "bg-amber-500" },
  { title: "Won", cards: ["Studio Luna"], accent: "bg-emerald-500" },
];

const revenue = [42, 58, 49, 72, 66, 88, 81, 96];

const initialTasks: Task[] = [
  { title: "Call UrbanDent about proposal", due: "Today", status: "Today" },
  { title: "Prepare invoice for Studio Luna", due: "Tomorrow", status: "In progress" },
  { title: "Review website lead automation", due: "May 31", status: "Scheduled" },
  { title: "Update client status for Prime Move", due: "Jun 2", status: "Scheduled" },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function stageClass(stage: string) {
  if (stage === "Won") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (stage === "Proposal Sent") return "bg-amber-50 text-amber-700 ring-amber-200";
  if (stage === "Contacted") return "bg-violet-50 text-violet-700 ring-violet-200";
  return "bg-blue-50 text-blue-700 ring-blue-200";
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cx("overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-glow", compact ? "" : "lg:translate-y-6")}>
      <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[210px_1fr]">
        <aside className="hidden bg-slate-950 p-5 text-white lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">NovaCRM</p>
              <p className="text-xs text-slate-400">Service workspace</p>
            </div>
          </div>
          <nav className="mt-8 space-y-2 text-sm text-slate-300">
            {["Dashboard", "Leads", "Clients", "Invoices", "Tasks", "Automation"].map((item, index) => (
              <div
                className={cx(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5",
                  index === 0 ? "bg-white text-slate-950" : "hover:bg-white/10",
                )}
                key={item}
              >
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                {item}
              </div>
            ))}
          </nav>
        </aside>
        <div className="bg-slate-50 p-4 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Monday overview</p>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Client growth dashboard</h3>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              <Search className="h-4 w-4" />
              Search clients
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Open leads", "28", "+12%"],
              ["Pipeline", "EUR 42k", "+8%"],
              ["Invoices", "17", "5 due"],
              ["Tasks", "36", "9 today"],
            ].map(([label, value, meta]) => (
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={label}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold text-slate-950">{value}</p>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{meta}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-950">Recent leads</p>
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-4 space-y-3">
                {leads.slice(0, compact ? 3 : 4).map((lead) => (
                  <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 text-sm sm:grid-cols-[1fr_auto]" key={lead.company}>
                    <div>
                      <p className="font-semibold text-slate-900">{lead.company}</p>
                      <p className="text-slate-500">{lead.service}</p>
                    </div>
                    <span className={cx("w-fit rounded-full px-2.5 py-1 text-xs font-semibold ring-1", stageClass(lead.stage))}>{lead.stage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-950">Revenue trend</p>
              <div className="mt-5 flex h-36 items-end gap-2 rounded-2xl bg-slate-50 p-3">
                {revenue.map((height, index) => (
                  <div className="flex flex-1 items-end" key={`${height}-${index}`}>
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-violet-500"
                      style={{ height: `${height}%` }}
                      aria-label={`Month ${index + 1} revenue ${height}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <p className="font-semibold">EUR 18.4k</p>
                  <p>paid this month</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <p className="font-semibold">EUR 6.2k</p>
                  <p>awaiting payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Leads");
  const [query, setQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState<string[]>(["Prepare invoice for Studio Luna"]);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return leads;
    return leads.filter((lead) => `${lead.company} ${lead.owner} ${lead.service} ${lead.stage}`.toLowerCase().includes(normalized));
  }, [query]);

  const toggleTask = (title: string) => {
    setCompletedTasks((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
  };

  return (
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8" id="dashboard">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Interactive demo</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A practical CRM dashboard for daily service work.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Switch between leads, invoices, and tasks. Search the lead list and mark tasks complete to see how a lightweight CRM can support real follow-up habits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {(["Leads", "Invoices", "Tasks"] as DashboardTab[]).map((tabName) => (
                <button
                  className={cx(
                    "rounded-2xl px-4 py-2.5 text-sm font-semibold transition",
                    activeTab === tabName ? "bg-white text-slate-950" : "bg-white/10 text-slate-200 hover:bg-white/15",
                  )}
                  key={tabName}
                  onClick={() => setActiveTab(tabName)}
                  type="button"
                >
                  {tabName}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white text-slate-950 shadow-2xl">
            <div className="grid lg:grid-cols-[190px_1fr]">
              <aside className="hidden bg-slate-900 p-5 text-white lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">NovaCRM</p>
                    <p className="text-xs text-slate-400">Operations</p>
                  </div>
                </div>
                <div className="mt-8 space-y-1.5 text-sm">
                  {[LayoutDashboard, UsersRound, FileText, ClipboardCheck, Workflow].map((Icon, index) => (
                    <div className={cx("flex items-center gap-3 rounded-2xl px-3 py-2.5", index === 0 ? "bg-white text-slate-950" : "text-slate-300")} key={index}>
                      <Icon className="h-4 w-4" />
                      {["Overview", "Leads", "Invoices", "Tasks", "Flows"][index]}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="bg-slate-50 p-4 sm:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{activeTab} workspace</p>
                    <h3 className="text-2xl font-semibold tracking-tight">Service business command center</h3>
                  </div>
                  <label className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm md:w-72">
                    <Search className="h-4 w-4 shrink-0" />
                    <input
                      aria-label="Search leads"
                      className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search leads"
                      value={query}
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["New leads", "28", "12 waiting"],
                    ["Won revenue", "EUR 18.4k", "this month"],
                    ["Open invoices", "17", "5 due soon"],
                    ["Follow-ups", "9", "today"],
                  ].map(([label, value, meta]) => (
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" key={label}>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                      <p className="mt-3 text-2xl font-semibold">{value}</p>
                      <p className="mt-1 text-sm text-slate-500">{meta}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">Recent leads</p>
                      <span className="text-sm text-slate-500">{filteredLeads.length} shown</span>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[620px] text-left text-sm">
                        <thead className="text-xs uppercase tracking-[0.12em] text-slate-400">
                          <tr>
                            <th className="pb-3 font-semibold">Company</th>
                            <th className="pb-3 font-semibold">Owner</th>
                            <th className="pb-3 font-semibold">Stage</th>
                            <th className="pb-3 font-semibold">Value</th>
                            <th className="pb-3 font-semibold">Next step</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredLeads.map((lead) => (
                            <tr key={lead.company}>
                              <td className="py-3 font-semibold text-slate-900">{lead.company}</td>
                              <td className="py-3 text-slate-500">{lead.owner}</td>
                              <td className="py-3">
                                <span className={cx("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", stageClass(lead.stage))}>{lead.stage}</span>
                              </td>
                              <td className="py-3 font-medium text-slate-700">{lead.value}</td>
                              <td className="py-3 text-slate-500">{lead.nextStep}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {activeTab === "Leads" && (
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="font-semibold">Sales pipeline</p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {pipelineColumns.map((column) => (
                            <div className="rounded-2xl bg-slate-50 p-3" key={column.title}>
                              <span className={cx("mb-3 block h-1.5 rounded-full", column.accent)} />
                              <p className="text-sm font-semibold">{column.title}</p>
                              <p className="mt-2 text-xs text-slate-500">{column.cards[0]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "Invoices" && (
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="font-semibold">Invoice status</p>
                        <div className="mt-4 space-y-3">
                          {[
                            ["Paid", "EUR 18.4k", "bg-emerald-50 text-emerald-700"],
                            ["Sent", "EUR 9.8k", "bg-blue-50 text-blue-700"],
                            ["Overdue", "EUR 2.1k", "bg-rose-50 text-rose-700"],
                          ].map(([label, value, color]) => (
                            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3" key={label}>
                              <span className={cx("rounded-full px-2.5 py-1 text-xs font-semibold", color)}>{label}</span>
                              <span className="font-semibold">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "Tasks" && (
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="font-semibold">Task list</p>
                        <div className="mt-4 space-y-3">
                          {initialTasks.map((task) => {
                            const completed = completedTasks.includes(task.title);
                            return (
                              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-3" key={task.title}>
                                <input
                                  checked={completed}
                                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                                  onChange={() => toggleTask(task.title)}
                                  type="checkbox"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className={cx("block text-sm font-semibold", completed && "text-slate-400 line-through")}>{task.title}</span>
                                  <span className="text-xs text-slate-500">{completed ? "Completed" : `${task.status} · ${task.due}`}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold">Monthly revenue</p>
                      <div className="mt-4 flex h-32 items-end gap-2 rounded-2xl bg-slate-50 p-3">
                        {revenue.map((height, index) => (
                          <div className="flex flex-1 items-end" key={`${index}-${height}`}>
                            <div className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-violet-500" style={{ height: `${height}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NovaCRMPage() {
  return (
    <main className="overflow-hidden bg-cloud">
      <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="flex items-center gap-3" href="#top" aria-label="NovaCRM home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">NovaCRM</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#features">Features</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#automation">Automation</a>
            <a href="#case-study">Case Study</a>
          </nav>
          <a className="hidden rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm md:inline-flex" href="#contact">
            Start Your Project
          </a>
          <button className="rounded-2xl border border-slate-200 p-2 md:hidden" type="button" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20" id="top">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Simple CRM for Growing Service Businesses</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              NovaCRM helps small teams manage leads, clients, invoices, and follow-ups in one clean dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700" href="#dashboard">
                View Dashboard <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300" href="#features">
                Explore Features <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {["Lead Tracking", "Invoice Overview", "Task Management", "Automation Ready"].map((item) => (
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 font-semibold text-slate-700 shadow-sm" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["missed leads", "messy spreadsheets", "forgotten follow-ups", "unclear revenue", "manual client management"].map((problem) => (
            <div className="rounded-3xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-700" key={problem}>
              {problem}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Feature system"
            title="Everything a small service team needs to stay organized."
            description="NovaCRM turns everyday sales, service, invoice, and follow-up work into one calm operating system."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <article className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" key={title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InteractiveDashboard />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Lead pipeline"
            title="Move every opportunity from first enquiry to won client."
            description="A visual pipeline gives service teams a shared view of what needs attention next."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {pipelineColumns.map((column) => (
              <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5" key={column.title}>
                <span className={cx("block h-1.5 rounded-full", column.accent)} />
                <h3 className="mt-4 font-semibold text-slate-950">{column.title}</h3>
                <div className="mt-5 space-y-3">
                  {column.cards.map((card) => (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={card}>
                      <p className="font-semibold text-slate-950">{card}</p>
                      <p className="mt-2 text-sm text-slate-500">Next action scheduled</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="automation">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Automation ready"
            title="Workflow thinking built into the dashboard experience."
            description="NovaCRM is designed around repeatable business flows that reduce admin work without hiding the details."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {[
              [MailCheck, "Website lead", "New website enquiries are saved into CRM instantly."],
              [Clock3, "Reminder", "A follow-up task is created automatically."],
              [FileText, "Invoice", "Won deals can trigger invoice preparation."],
              [ShieldCheck, "Status update", "Client records reflect the latest project stage."],
              [BellRing, "Notification", "Email alerts keep owners aware of priority work."],
            ].map(([Icon, title, copy], index) => {
              const WorkflowIcon = Icon as LucideIcon;
              return (
                <div className="relative rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm" key={title as string}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <WorkflowIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-semibold text-slate-950">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy as string}</p>
                  {index < 4 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 text-slate-300 lg:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8" id="case-study">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Portfolio case study</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Built as a focused CRM concept for a service company.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              NovaCRM presents the strategy, interface, and automation logic behind a custom dashboard for a small team that needs less spreadsheet friction.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Project overview", "A fictional SaaS case showing how a lightweight CRM can centralize leads, invoices, tasks, and clients."],
              ["Business challenge", "Small teams miss leads, lose context in spreadsheets, and struggle to see revenue clearly."],
              ["Solution", "A modern dashboard with searchable leads, pipeline status, invoice visibility, and follow-up tasks."],
              ["Key features", "Lead management, client records, invoice tracking, task pipeline, revenue analytics, and reminders."],
            ].map(([title, copy]) => (
              <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6" key={title}>
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-4">
          {["fewer missed leads", "faster follow-ups", "clearer revenue overview", "better client organization"].map((impact) => (
            <div className="rounded-3xl bg-slate-950 p-5 text-white" key={impact}>
              <CheckCircle2 className="h-5 w-5 text-blue-300" />
              <p className="mt-4 font-semibold">{impact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Client voices"
            title="Designed for owners who need clarity without complexity."
            description="Fictional testimonials show how the CRM concept maps to practical service business needs."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              ["NovaCRM gives our team one place to see new requests, open quotes, and overdue invoices.", "Anna Berger", "Cleaning company owner"],
              ["The pipeline view makes follow-ups feel obvious. We know exactly which client needs a call.", "Markus Stein", "Moving service founder"],
              ["It feels like a dashboard built for real daily work, not a bloated enterprise system.", "Laura Novak", "Studio operator"],
            ].map(([quote, name, role]) => (
              <figure className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm" key={name}>
                <blockquote className="leading-7 text-slate-700">“{quote}”</blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-950">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions small teams ask before building a CRM."
            description="NovaCRM is fictional, but the workflow model is designed around real custom dashboard projects."
          />
          <div className="mt-12 divide-y divide-slate-200 rounded-[26px] border border-slate-200 bg-white shadow-sm">
            {[
              ["Who is NovaCRM for?", "Small service businesses that need a simpler way to manage leads, clients, invoices, tasks, projects, revenue, and follow-ups."],
              ["Can it connect to a website form?", "Yes. A future backend could save new website leads into a database and trigger follow-up reminders."],
              ["Can it track invoices?", "Yes. The concept includes invoice states for draft, sent, overdue, and paid work."],
              ["Is it mobile responsive?", "Yes. The interface is planned to collapse cleanly for phones, tablets, and desktops."],
              ["Can it be customized for different businesses?", "Yes. The same CRM structure can adapt to cleaning, clinics, studios, moving companies, agencies, and other service teams."],
            ].map(([question, answer]) => (
              <details className="group p-6" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
                  {question}
                  <span className="rounded-full bg-slate-100 p-1 text-slate-500 transition group-open:rotate-90">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-slate-950 p-8 text-center text-white shadow-2xl sm:p-12">
          <CircleDollarSign className="mx-auto h-10 w-10 text-blue-300" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Need a custom CRM for your business?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            We design and build simple dashboards, CRM systems, and automation tools for modern service companies.
          </p>
          <a className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="mailto:hello@example.com">
            Start Your Project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold">NovaCRM</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">A fictional CRM portfolio project for small service business dashboards and automation workflows.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-950">Product</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <p>Dashboard</p>
              <p>Pipeline</p>
              <p>Automation</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-950">Features</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <p>Leads</p>
              <p>Invoices</p>
              <p>Tasks</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-950">Contact</p>
            <p className="mt-4 text-sm text-slate-500">hello@example.com</p>
            <p className="mt-6 text-xs text-slate-400">© 2026 NovaCRM. Portfolio concept.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
