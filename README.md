# Singhji Enterprises — Website

A simple, elegant website for Singhji Enterprises (wholesale & custom apparel),
with a built-in admin panel so photos and text can be updated without touching
code.

## Pages
- **Home** — hero, highlights, product preview, services strip
- **Products** — all product categories
- **About** — business story + proprietor
- **Contact** — phone, WhatsApp, email, address, embedded map
- **/admin** — password-protected login → **/admin/dashboard** to edit everything

Every page has a "WhatsApp Us" button in the header and a floating WhatsApp
button, both of which open a chat directly — no contact forms, no popups.

## 1. Install (one-time)

You'll need [Node.js](https://nodejs.org) (version 18 or newer) installed.
Then, in this folder, open a terminal (VS Code → Terminal → New Terminal) and run:

```bash
npm install
```

## 2. Set your admin password

Copy `.env.local.example` to a new file called `.env.local`, and change the
password:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and set:

```
ADMIN_PASSWORD=your-own-password-here
```

This is the password you'll use to log in at `/admin`. Never share this file
or commit it to GitHub — it's already excluded via `.gitignore`.

## 3. Run it locally

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser. To use the admin panel,
go to **http://localhost:3000/admin** and log in with the password you set above.

## 4. Add your own logo

Two options:
- Log in at `/admin/dashboard` → Business details → "Replace photo" under Logo, or
- Directly replace `public/uploads/logo-placeholder.svg` with your own logo file,
  then update the `logo` path in `data/content.json` if you rename it.

All other photos (hero image, about photo, and each product category photo)
work the same way — replace them any time from the dashboard.

## How the admin panel works

- All site text and image paths live in `data/content.json`.
- When you edit something in the dashboard and hit **Save changes**, that file
  is updated directly, and the public pages reflect it immediately (refresh
  the page to see it).
- Uploaded photos are saved into `public/uploads/`.

**Important note for later, when you deploy:** this simple approach writes
directly to files on disk, which works perfectly on your computer and on most
regular hosting. If you deploy to Vercel specifically, Vercel's servers don't
allow saving files after deployment, so the admin "Save" wouldn't persist
there. When you're ready to deploy, tell me and I'll either:
- point you to a host that does allow file writes (e.g. a small VPS, Railway, or Render), or
- upgrade the admin panel to use Supabase (a free database + photo storage
  service) so it works on Vercel too, without changing how the dashboard looks
  or works for you.

Either way, nothing changes about how you use the dashboard — this is purely
a backend detail we'll sort out at deployment time, as you asked.

## Project structure

```
app/                  → pages (home, products, about, contact, admin)
app/api/               → backend routes (login, save content, upload photos)
components/            → header, footer, WhatsApp button, product cards
components/admin/      → dashboard's photo uploader
data/content.json      → all editable site text + image paths
lib/                   → content read/write + admin auth helpers
public/uploads/        → all uploaded/placeholder photos
```

## Making further changes with Claude Code

Since you have the Claude Code extension in VS Code, you can ask it to make
changes directly — for example "change the maroon color to a darker shade" or
"add a new product category card" — and it will edit the right files for you.
For day-to-day content and photo updates though, you shouldn't need Claude Code
at all — the `/admin` dashboard handles that.
