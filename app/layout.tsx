import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaCRM | Simple CRM for Growing Service Businesses",
  description:
    "A fictional CRM platform portfolio case study with a polished SaaS landing page and interactive dashboard demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
