# FK94

Consulting-first rebuild of `fk94security.com`.

This version removes the old SaaS positioning and replaces it with:

- a clear home page for everyday digital privacy and OPSEC
- a strong free resource hub
- simple 1:1 services
- an intake funnel that scores fit and urgency
- a content structure ready for SEO, CRM, and automation

## Sitemap

- `/`
- `/free-resources`
- `/free-resources/opsec-checklist`
- `/free-resources/account-hardening-planner`
- `/free-resources/incident-triage`
- `/free-resources/exposure-self-check`
- `/services`
- `/about`
- `/book-review`
- `/book-review/thanks`
- `/incident-help`
- `/guides`
- `/guides/[slug]`
- `/open-resources`
- `/privacy`
- `/terms`

Legacy routes redirect permanently:

- `/pricing` -> `/services`
- `/platform` -> `/about`
- `/dashboard` -> `/services`
- `/audit` -> `/free-resources/exposure-self-check`
- `/contact` -> `/book-review`
- `/checklist` -> `/free-resources/opsec-checklist`
- `/harden` -> `/free-resources/account-hardening-planner`

## Content system

Content is file-based for speed and simplicity:

- `content/site.ts`: nav, services, trust copy, footer groups, intake options
- `content/resources.ts`: tools, guides, templates, open repos
- `content/guides.ts`: guide library and editorial backlog
- `content/tools.ts`: checklist data

This keeps the MVP easy to edit without adding CMS complexity. If needed later, these collections can move to MDX or a headless CMS without changing the routing model much.

## Intake and CRM flow

- `components/intake-form.tsx` collects the lead
- `app/api/intake/route.ts` validates input, scores the lead, and optionally posts it to n8n
- `lib/intake.ts` contains fit, urgency, service suggestion, and resource recommendation logic
- `app/book-review/thanks/page.tsx` gives the user a clear next step and relevant free resources

### Optional env vars

```bash
NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-handle/fk94-review
N8N_INTAKE_WEBHOOK_URL=https://your-n8n-instance/webhook/fk94-intake
```

`NEXT_PUBLIC_BOOKING_URL` enables the booking CTA on the thank-you page.

`N8N_INTAKE_WEBHOOK_URL` sends intake payloads and scoring output into n8n, a CRM, email, or any downstream automation you want.

## Analytics and automation hooks

- `lib/analytics.ts` supports `plausible`, `umami`, and `dataLayer`
- key CTA and intake events are already named and wired
- `app/sitemap.ts` and `app/robots.ts` are included for SEO basics

This is enough to start measuring:

- home traffic
- clicks into free resources
- guide opens
- service CTA clicks
- intake submissions

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm run build
```
