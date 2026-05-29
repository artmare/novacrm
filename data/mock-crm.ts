export type LeadStatus = "New" | "Contacted" | "Proposal Sent" | "Won" | "Lost";
export type ClientStatus = "Active" | "Onboarding" | "Paused";
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";
export type TaskPriority = "Low" | "Medium" | "High";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  status: LeadStatus;
  value: number;
  lastContact: string;
  assignedTask: string;
};

export type Client = {
  id: string;
  clientName: string;
  company: string;
  email: string;
  activeProject: string;
  totalValue: number;
  status: ClientStatus;
  notes: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
};

export type Task = {
  id: string;
  title: string;
  relatedClient: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
};

export const leadStatuses: LeadStatus[] = ["New", "Contacted", "Proposal Sent", "Won", "Lost"];
export const invoiceStatuses: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue"];

export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Anna Berger",
    company: "Cleanova Wien",
    email: "anna@cleanova-wien.at",
    status: "New",
    value: 4800,
    lastContact: "2026-05-28",
    assignedTask: "Qualify cleaning contract scope",
  },
  {
    id: "lead-2",
    name: "Dr. Lukas Weiss",
    company: "UrbanDent Clinic",
    email: "office@urbandent.at",
    status: "Proposal Sent",
    value: 7200,
    lastContact: "2026-05-26",
    assignedTask: "Follow up on proposal approval",
  },
  {
    id: "lead-3",
    name: "Jonas Keller",
    company: "Prime Move Wien",
    email: "jonas@primemove.at",
    status: "Contacted",
    value: 3900,
    lastContact: "2026-05-27",
    assignedTask: "Send relocation workflow estimate",
  },
  {
    id: "lead-4",
    name: "Elena Rossi",
    company: "Studio Luna",
    email: "elena@studioluna.at",
    status: "Won",
    value: 5600,
    lastContact: "2026-05-24",
    assignedTask: "Create onboarding task list",
  },
  {
    id: "lead-5",
    name: "Matthias Gruber",
    company: "Alpine Hausservice",
    email: "matthias@alpine-haus.at",
    status: "New",
    value: 6400,
    lastContact: "2026-05-29",
    assignedTask: "Schedule discovery call",
  },
  {
    id: "lead-6",
    name: "Mira Novak",
    company: "Vienna Fit Studio",
    email: "mira@viennafit.at",
    status: "Lost",
    value: 2800,
    lastContact: "2026-05-20",
    assignedTask: "Archive nurture sequence",
  },
];

export const initialClients: Client[] = [
  {
    id: "client-1",
    clientName: "Anna Berger",
    company: "Cleanova Wien",
    email: "anna@cleanova-wien.at",
    activeProject: "Recurring commercial cleaning CRM",
    totalValue: 18400,
    status: "Active",
    notes: "Needs weekly lead reports and invoice reminders for multi-site contracts.",
  },
  {
    id: "client-2",
    clientName: "Dr. Lukas Weiss",
    company: "UrbanDent Clinic",
    email: "office@urbandent.at",
    activeProject: "Patient follow-up dashboard",
    totalValue: 21200,
    status: "Onboarding",
    notes: "Interested in automated consultation reminders and front-desk task routing.",
  },
  {
    id: "client-3",
    clientName: "Jonas Keller",
    company: "Prime Move Wien",
    email: "jonas@primemove.at",
    activeProject: "Quote pipeline and dispatch board",
    totalValue: 13800,
    status: "Active",
    notes: "High lead volume during month-end moves; wants clear status tracking.",
  },
  {
    id: "client-4",
    clientName: "Elena Rossi",
    company: "Studio Luna",
    email: "elena@studioluna.at",
    activeProject: "Booking and invoice workflow",
    totalValue: 9600,
    status: "Active",
    notes: "Uses CRM to track studio bookings, deposits, and follow-up tasks.",
  },
  {
    id: "client-5",
    clientName: "Matthias Gruber",
    company: "Alpine Hausservice",
    email: "matthias@alpine-haus.at",
    activeProject: "Maintenance client portal",
    totalValue: 11200,
    status: "Paused",
    notes: "Paused until next quarter; keep status updates visible for account owner.",
  },
  {
    id: "client-6",
    clientName: "Mira Novak",
    company: "Vienna Fit Studio",
    email: "mira@viennafit.at",
    activeProject: "Membership retention tasks",
    totalValue: 7400,
    status: "Active",
    notes: "Needs simple task reminders around trials, renewals, and class packages.",
  },
];

export const initialInvoices: Invoice[] = [
  { id: "inv-1", invoiceNumber: "NOVA-1001", client: "Cleanova Wien", amount: 4200, dueDate: "2026-06-04", status: "Sent" },
  { id: "inv-2", invoiceNumber: "NOVA-1002", client: "UrbanDent Clinic", amount: 6800, dueDate: "2026-06-08", status: "Draft" },
  { id: "inv-3", invoiceNumber: "NOVA-1003", client: "Prime Move Wien", amount: 3900, dueDate: "2026-05-31", status: "Overdue" },
  { id: "inv-4", invoiceNumber: "NOVA-1004", client: "Studio Luna", amount: 5600, dueDate: "2026-05-24", status: "Paid" },
  { id: "inv-5", invoiceNumber: "NOVA-1005", client: "Alpine Hausservice", amount: 3100, dueDate: "2026-06-12", status: "Sent" },
  { id: "inv-6", invoiceNumber: "NOVA-1006", client: "Vienna Fit Studio", amount: 2400, dueDate: "2026-06-14", status: "Paid" },
];

export const initialTasks: Task[] = [
  { id: "task-1", title: "Call Cleanova about new contract locations", relatedClient: "Cleanova Wien", dueDate: "2026-05-30", priority: "High", completed: false },
  { id: "task-2", title: "Send UrbanDent dashboard proposal", relatedClient: "UrbanDent Clinic", dueDate: "2026-05-31", priority: "High", completed: false },
  { id: "task-3", title: "Mark Studio Luna onboarding complete", relatedClient: "Studio Luna", dueDate: "2026-06-01", priority: "Medium", completed: true },
  { id: "task-4", title: "Review overdue invoice with Prime Move", relatedClient: "Prime Move Wien", dueDate: "2026-05-29", priority: "High", completed: false },
  { id: "task-5", title: "Prepare Alpine Hausservice reactivation email", relatedClient: "Alpine Hausservice", dueDate: "2026-06-05", priority: "Low", completed: false },
  { id: "task-6", title: "Update Vienna Fit task templates", relatedClient: "Vienna Fit Studio", dueDate: "2026-06-03", priority: "Medium", completed: true },
];

export const monthlyRevenue = [9200, 11800, 10400, 14600, 16200, 18400, 17100, 21300, 19800, 22600, 24100, 26800];
