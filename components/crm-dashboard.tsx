"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import {
  Client,
  Invoice,
  InvoiceStatus,
  Lead,
  LeadStatus,
  Task,
  invoiceStatuses,
  initialClients,
  initialInvoices,
  initialLeads,
  initialTasks,
  leadStatuses,
  monthlyRevenue,
} from "@/data/mock-crm";

type View = "Dashboard" | "Leads" | "Clients" | "Invoices" | "Tasks" | "Settings";
type TaskFilter = "Active" | "Completed" | "All";

const navItems: Array<{ label: View; icon: typeof LayoutDashboard }> = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads", icon: UsersRound },
  { label: "Clients", icon: Building2 },
  { label: "Invoices", icon: CreditCard },
  { label: "Tasks", icon: ClipboardCheck },
  { label: "Settings", icon: Settings },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

const nextId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({ label, tone = "slate" }: { label: string; tone?: "blue" | "violet" | "green" | "amber" | "rose" | "slate" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  };

  return <span className={classNames("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tones[tone])}>{label}</span>;
}

function leadTone(status: LeadStatus) {
  if (status === "Won") return "green";
  if (status === "Lost") return "rose";
  if (status === "Proposal Sent") return "amber";
  if (status === "Contacted") return "violet";
  return "blue";
}

function invoiceTone(status: InvoiceStatus) {
  if (status === "Paid") return "green";
  if (status === "Overdue") return "rose";
  if (status === "Sent") return "blue";
  return "slate";
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">NovaCRM</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
          </div>
          <button className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50" onClick={onClose} type="button" aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder, label }: { value: string; onChange: (value: string) => void; placeholder: string; label: string }) {
  return (
    <label className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500 shadow-sm">
      <Search className="h-4 w-4 shrink-0" />
      <span className="sr-only">{label}</span>
      <input className="min-w-0 flex-1 bg-transparent text-slate-950 outline-none placeholder:text-slate-400" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function FilterTabs({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className={classNames(
            "rounded-2xl px-3.5 py-2 text-sm font-semibold transition",
            value === option ? "bg-slate-950 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300",
          )}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function StatCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: typeof LayoutDashboard }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

export function RevenueChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-950">Monthly revenue</h3>
          <p className="text-sm text-slate-500">CSS bar chart from mock CRM data</p>
        </div>
        <Badge label="2026" tone="blue" />
      </div>
      <div className="mt-6 flex h-56 items-end gap-2 rounded-3xl bg-slate-50 p-4">
        {values.map((value, index) => (
          <div className="flex flex-1 flex-col items-center gap-2" key={`${value}-${index}`}>
            <div className="flex h-44 w-full items-end">
              <div className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-violet-500 transition-all" style={{ height: `${Math.max(12, (value / max) * 100)}%` }} />
            </div>
            <span className="text-[10px] font-semibold text-slate-400">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sidebar({ currentView, onViewChange, mobileOpen, onClose }: { currentView: View; onViewChange: (view: View) => void; mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      <div className={classNames("fixed inset-0 z-30 bg-slate-950/40 transition lg:hidden", mobileOpen ? "opacity-100" : "pointer-events-none opacity-0")} onClick={onClose} />
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 p-5 text-white shadow-2xl transition-transform lg:static lg:min-h-screen lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">NovaCRM</p>
              <p className="text-xs text-slate-400">Service OS</p>
            </div>
          </div>
          <button className="rounded-xl p-2 text-slate-300 lg:hidden" onClick={onClose} type="button" aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 space-y-2" aria-label="Dashboard navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={classNames(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition",
                currentView === label ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white",
              )}
              key={label}
              onClick={() => {
                onViewChange(label);
                onClose();
              }}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Cleanova Wien</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Demo company workspace with local mock data.</p>
        </div>
      </aside>
    </>
  );
}

export function DashboardShell({ currentView, onViewChange, children }: { currentView: View; onViewChange: (view: View) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[288px_1fr]">
      <Sidebar currentView={currentView} onViewChange={onViewChange} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)} type="button" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-medium text-slate-500">NovaCRM demo</p>
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{currentView}</h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">CW</div>
              <div>
                <p className="text-sm font-semibold">Marta Huber</p>
                <p className="text-xs text-slate-500">Cleanova Wien</p>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="font-semibold text-slate-950">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{copy}</p>
    </div>
  );
}

export function LeadsTable({ leads, onAddLead, onUpdateStatus, onDeleteLead }: { leads: Lead[]; onAddLead: (lead: Lead) => void; onUpdateStatus: (id: string, status: LeadStatus) => void; onDeleteLead: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", status: "New" as LeadStatus, value: "", assignedTask: "", lastContact: new Date().toISOString().slice(0, 10) });

  const filtered = leads.filter((lead) => {
    const matchesSearch = `${lead.name} ${lead.company} ${lead.email}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "All" || lead.status === status;
    return matchesSearch && matchesStatus;
  });

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddLead({ id: nextId("lead"), name: form.name, company: form.company, email: form.email, status: form.status, value: Number(form.value || 0), lastContact: form.lastContact, assignedTask: form.assignedTask || "Schedule follow-up" });
    setForm({ name: "", company: "", email: "", status: "New", value: "", assignedTask: "", lastContact: new Date().toISOString().slice(0, 10) });
    setModalOpen(false);
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <SearchInput label="Search leads" placeholder="Search leads" value={query} onChange={setQuery} />
        <div className="flex flex-wrap gap-3">
          <FilterTabs options={["All", ...leadStatuses]} value={status} onChange={setStatus} />
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700" onClick={() => setModalOpen(true)} type="button">
            <Plus className="h-4 w-4" /> Add lead
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                {['Name', 'Company', 'Email', 'Status', 'Value', 'Last contact', 'Assigned task', 'Actions'].map((heading) => (
                  <th className="px-4 py-3 font-semibold" key={heading}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((lead) => (
                <tr className="transition hover:bg-slate-50" key={lead.id}>
                  <td className="px-4 py-4 font-semibold text-slate-950">{lead.name}</td>
                  <td className="px-4 py-4 text-slate-600">{lead.company}</td>
                  <td className="px-4 py-4 text-slate-600">{lead.email}</td>
                  <td className="px-4 py-4">
                    <select className="rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500" value={lead.status} onChange={(event) => onUpdateStatus(lead.id, event.target.value as LeadStatus)} aria-label={`Update ${lead.company} status`}>
                      {leadStatuses.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-4 font-semibold">{formatCurrency(lead.value)}</td>
                  <td className="px-4 py-4 text-slate-600">{lead.lastContact}</td>
                  <td className="px-4 py-4 text-slate-600">{lead.assignedTask}</td>
                  <td className="px-4 py-4">
                    <button className="rounded-xl p-2 text-rose-600 transition hover:bg-rose-50" onClick={() => window.confirm(`Delete ${lead.company}?`) && onDeleteLead(lead.id)} type="button" aria-label={`Delete ${lead.company}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filtered.length === 0 && <EmptyState title="No leads found" copy="Try another search or status filter." />}
      {modalOpen && (
        <Modal title="Add new lead" onClose={() => setModalOpen(false)}>
          <form className="grid gap-4" onSubmit={submitLead}>
            <label className="grid gap-1 text-sm font-medium">Name<input required className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Company<input required className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>
            <label className="grid gap-1 text-sm font-medium">Email<input required type="email" className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium">Status<select className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as LeadStatus })}>{leadStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="grid gap-1 text-sm font-medium">Value<input required type="number" min="0" className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.value} onChange={(event) => setForm({ ...form, value: event.target.value })} /></label>
            </div>
            <label className="grid gap-1 text-sm font-medium">Assigned task<input className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={form.assignedTask} onChange={(event) => setForm({ ...form, assignedTask: event.target.value })} /></label>
            <button className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700" type="submit">Save lead</button>
          </form>
        </Modal>
      )}
    </section>
  );
}

export function ClientsTable({ clients }: { clients: Client[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);
  const filtered = clients.filter((client) => `${client.clientName} ${client.company} ${client.email}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="space-y-5">
      <SearchInput label="Search clients" placeholder="Search clients" value={query} onChange={setQuery} />
      <div className="grid gap-4 xl:grid-cols-3">
        {filtered.map((client) => (
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" key={client.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-950">{client.company}</h3>
                <p className="mt-1 text-sm text-slate-500">{client.clientName}</p>
              </div>
              <Badge label={client.status} tone={client.status === "Active" ? "green" : client.status === "Onboarding" ? "blue" : "amber"} />
            </div>
            <p className="mt-4 text-sm text-slate-600">{client.activeProject}</p>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="text-slate-500">Total value</span>
              <span className="font-semibold">{formatCurrency(client.totalValue)}</span>
            </div>
            <button className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:border-blue-300 hover:text-blue-700" onClick={() => setSelected(client)} type="button">View details</button>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState title="No clients found" copy="Try a different company, contact, or email." />}
      {selected && (
        <Modal title={selected.company} onClose={() => setSelected(null)}>
          <div className="space-y-4 text-sm text-slate-600">
            <p><strong className="text-slate-950">Contact:</strong> {selected.clientName}</p>
            <p><strong className="text-slate-950">Email:</strong> {selected.email}</p>
            <p><strong className="text-slate-950">Active project:</strong> {selected.activeProject}</p>
            <p><strong className="text-slate-950">Total value:</strong> {formatCurrency(selected.totalValue)}</p>
            <p><strong className="text-slate-950">Notes:</strong> {selected.notes}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}

export function InvoicesTable({ invoices, onMarkPaid }: { invoices: Invoice[]; onMarkPaid: (id: string) => void }) {
  const [status, setStatus] = useState("All");
  const filtered = invoices.filter((invoice) => status === "All" || invoice.status === status);
  const totalPaid = invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const outstanding = invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard label="Total paid" value={formatCurrency(totalPaid)} helper="Collected invoices" icon={CheckCircle2} />
        <StatCard label="Outstanding" value={formatCurrency(outstanding)} helper="Draft, sent, and overdue" icon={CreditCard} />
      </div>
      <FilterTabs options={["All", ...invoiceStatuses]} value={status} onChange={setStatus} />
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>{['Invoice', 'Client', 'Amount', 'Due date', 'Status', 'Action'].map((heading) => <th className="px-4 py-3 font-semibold" key={heading}>{heading}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((invoice) => (
                <tr className="transition hover:bg-slate-50" key={invoice.id}>
                  <td className="px-4 py-4 font-semibold">{invoice.invoiceNumber}</td>
                  <td className="px-4 py-4 text-slate-600">{invoice.client}</td>
                  <td className="px-4 py-4 font-semibold">{formatCurrency(invoice.amount)}</td>
                  <td className="px-4 py-4 text-slate-600">{invoice.dueDate}</td>
                  <td className="px-4 py-4"><Badge label={invoice.status} tone={invoiceTone(invoice.status)} /></td>
                  <td className="px-4 py-4">
                    <button className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-45" disabled={invoice.status === "Paid"} onClick={() => onMarkPaid(invoice.id)} type="button">Mark paid</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filtered.length === 0 && <EmptyState title="No invoices found" copy="Try another invoice status filter." />}
    </section>
  );
}

export function TasksBoard({ tasks, onAddTask, onToggleTask, onDeleteTask }: { tasks: Task[]; onAddTask: (task: Task) => void; onToggleTask: (id: string) => void; onDeleteTask: (id: string) => void }) {
  const [filter, setFilter] = useState<TaskFilter>("Active");
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("Cleanova Wien");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState("Medium" as Task['priority']);
  const filtered = tasks.filter((task) => filter === "All" || (filter === "Completed" ? task.completed : !task.completed));

  const submitTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTask({ id: nextId("task"), title, relatedClient: client, dueDate, priority, completed: false });
    setTitle("");
    setClient("Cleanova Wien");
    setPriority("Medium");
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <form className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={submitTask}>
        <h2 className="text-lg font-semibold">Add task</h2>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-1 text-sm font-medium">Task title<input required className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={title} onChange={(event) => setTitle(event.target.value)} /></label>
          <label className="grid gap-1 text-sm font-medium">Related client<input required className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={client} onChange={(event) => setClient(event.target.value)} /></label>
          <label className="grid gap-1 text-sm font-medium">Due date<input required type="date" className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
          <label className="grid gap-1 text-sm font-medium">Priority<select className="rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500" value={priority} onChange={(event) => setPriority(event.target.value as Task['priority'])}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <button className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700" type="submit">Add task</button>
        </div>
      </form>
      <div className="space-y-4">
        <FilterTabs options={["Active", "Completed", "All"]} value={filter} onChange={(value) => setFilter(value as TaskFilter)} />
        <div className="space-y-3">
          {filtered.map((task) => (
            <article className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between" key={task.id}>
              <label className="flex min-w-0 cursor-pointer items-start gap-3">
                <input className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" checked={task.completed} onChange={() => onToggleTask(task.id)} type="checkbox" />
                <span>
                  <span className={classNames("block font-semibold", task.completed && "text-slate-400 line-through")}>{task.title}</span>
                  <span className="mt-1 block text-sm text-slate-500">{task.relatedClient} · {task.dueDate}</span>
                </span>
              </label>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <Badge label={task.priority} tone={task.priority === "High" ? "rose" : task.priority === "Medium" ? "amber" : "slate"} />
                <button className="rounded-xl p-2 text-rose-600 transition hover:bg-rose-50" onClick={() => onDeleteTask(task.id)} type="button" aria-label={`Delete ${task.title}`}><Trash2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <EmptyState title="No tasks here" copy="Change the filter or add a new task." />}
      </div>
    </section>
  );
}

function Overview({ leads, clients, invoices, tasks, onNavigate }: { leads: Lead[]; clients: Client[]; invoices: Invoice[]; tasks: Task[]; onNavigate: (view: View) => void }) {
  const wonLeads = leads.filter((lead) => lead.status === "Won").length;
  const conversion = leads.length ? Math.round((wonLeads / leads.length) * 100) : 0;
  const monthly = invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const upcoming = tasks.filter((task) => !task.completed).length;
  const distribution = leadStatuses.map((status) => ({ status, count: leads.filter((lead) => lead.status === status).length }));
  const pipelineCards = ["New", "Contacted", "Proposal Sent"].map((status) => ({ status, value: leads.filter((lead) => lead.status === status).reduce((sum, lead) => sum + lead.value, 0) }));

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total leads" value={String(leads.length)} helper="Across all pipeline stages" icon={UsersRound} />
        <StatCard label="Active clients" value={String(clients.filter((client) => client.status === "Active").length)} helper="Currently in delivery" icon={Building2} />
        <StatCard label="Open invoices" value={String(invoices.filter((invoice) => invoice.status !== "Paid").length)} helper="Draft, sent, overdue" icon={CreditCard} />
        <StatCard label="Monthly revenue" value={formatCurrency(monthly)} helper="Paid invoices" icon={BarChart3} />
        <StatCard label="Conversion rate" value={`${conversion}%`} helper="Won leads / total leads" icon={CheckCircle2} />
        <StatCard label="Upcoming tasks" value={String(upcoming)} helper="Active follow-ups" icon={ClipboardCheck} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <RevenueChart values={monthlyRevenue} />
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-950">Lead status distribution</h3>
            <div className="mt-5 space-y-4">
              {distribution.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">{item.status}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: `${leads.length ? (item.count / leads.length) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-950">Pipeline value</h3>
            <div className="mt-4 grid gap-3">
              {pipelineCards.map((card) => (
                <button className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-left transition hover:bg-blue-50" key={card.status} onClick={() => onNavigate("Leads")} type="button">
                  <span className="font-semibold text-slate-700">{card.status}</span>
                  <span className="font-semibold text-slate-950">{formatCurrency(card.value)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SettingsView() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight">Demo settings</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">This frontend CRM demo stores all changes in local React state. A production version would connect this area to authentication, role permissions, notification preferences, and billing settings.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Workspace: Cleanova Wien", "Plan: Service Pro", "Data mode: Mock local state"].map((item) => <div className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700" key={item}>{item}</div>)}
      </div>
    </section>
  );
}

export function DashboardApp() {
  const [view, setView] = useState<View>("Dashboard");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [clients] = useState<Client[]>(initialClients);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const content = useMemo(() => {
    if (view === "Leads") {
      return <LeadsTable leads={leads} onAddLead={(lead) => setLeads((current) => [lead, ...current])} onUpdateStatus={(id, status) => setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)))} onDeleteLead={(id) => setLeads((current) => current.filter((lead) => lead.id !== id))} />;
    }
    if (view === "Clients") return <ClientsTable clients={clients} />;
    if (view === "Invoices") return <InvoicesTable invoices={invoices} onMarkPaid={(id) => setInvoices((current) => current.map((invoice) => (invoice.id === id ? { ...invoice, status: "Paid" } : invoice)))} />;
    if (view === "Tasks") return <TasksBoard tasks={tasks} onAddTask={(task) => setTasks((current) => [task, ...current])} onToggleTask={(id) => setTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))} onDeleteTask={(id) => setTasks((current) => current.filter((task) => task.id !== id))} />;
    if (view === "Settings") return <SettingsView />;
    return <Overview leads={leads} clients={clients} invoices={invoices} tasks={tasks} onNavigate={setView} />;
  }, [clients, invoices, leads, tasks, view]);

  return <DashboardShell currentView={view} onViewChange={setView}>{content}</DashboardShell>;
}
