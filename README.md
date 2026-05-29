# NovaCRM

NovaCRM is a fictional CRM platform portfolio case study for small service businesses. It includes a polished SaaS landing page plus a functional frontend-only CRM dashboard demo at `/dashboard`.

## Landing Page

The main landing page presents NovaCRM as a premium SaaS product for managing leads, clients, invoices, tasks, projects, revenue, and follow-ups. It includes a dashboard preview, business problem framing, feature cards, automation workflow messaging, case study positioning, FAQ, and calls to open the interactive demo.

## Dashboard Demo

The `/dashboard` route is a local-state React CRM prototype. It uses realistic mock data and does not require a backend.

## Functional CRM Features

- Dark sidebar app shell with responsive mobile navigation
- Overview stats for leads, clients, invoices, revenue, conversion rate, and upcoming tasks
- CSS-based monthly revenue chart
- Lead status distribution and pipeline value cards
- Lead management table with search, status filter, add lead modal, status updates, and delete actions
- Client cards with search and a basic details modal
- Invoice table with status filtering, paid/outstanding totals, and mark-as-paid actions
- Task manager with add, complete/uncomplete, delete, and active/completed filters
- Reusable UI components for shell, sidebar, stat cards, tables, modal, badge, search, filters, and charting

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React client components
- ESLint
- GitHub Actions CI

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page and `http://localhost:3000/dashboard` for the CRM demo.

## Build Command

```bash
npm run build
```

## Portfolio Positioning

NovaCRM demonstrates dashboard design, CRM interaction logic, SaaS information architecture, business automation thinking, and modern frontend development. The project is intentionally frontend-only for now, so every record change happens in local React state.

## Future Backend Roadmap

- Supabase database
- Authentication
- User roles
- Real invoice generation
- Email reminders
- Stripe payments

## License

MIT
