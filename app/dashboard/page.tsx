import type { Metadata } from "next";
import { DashboardApp } from "@/components/crm-dashboard";

export const metadata: Metadata = {
  title: "NovaCRM Dashboard Demo",
  description: "Frontend-only CRM dashboard demo with leads, clients, invoices, tasks, and mock SaaS analytics.",
};

export default function DashboardPage() {
  return <DashboardApp />;
}
