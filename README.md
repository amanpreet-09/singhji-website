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
- Directly replace `storage/logo-placeholder.svg` with your own logo file,
  then update the `logo` path in `storage/content.json` if you rename it.

All other photos (hero image, about photo, and each product category photo)
work the same way — replace them any time from the dashboard.

## How the admin panel works

- All site text and image paths live in `storage/content.json`, and uploaded
  photos are saved next to it in `storage/`.
- When you edit something in the dashboard and hit **Save changes**, that file
  is updated directly, and the public pages reflect it immediately (refresh
  the page to see it). Pages are rendered on every request, so no rebuild is needed.
- The first time the site runs with an empty `storage/` folder, it is filled
  from `seed/` (starting text + placeholder photos). Edit `seed/` only to
  change the defaults for a fresh install.

**Deploying on Vercel:** Vercel's disk is read-only, so the site stores
content and uploaded photos in **Vercel Blob** whenever a Blob store is
connected to the project (Vercel then sets `BLOB_STORE_ID` or
`BLOB_READ_WRITE_TOKEN` automatically). Create the store with **Public** access. Also set
`ADMIN_PASSWORD` in the project's Environment Variables.

**Deploying with Docker:** `storage/` must be on persistent disk, or every
redeploy wipes your edits. The Docker image sets `STORAGE_DIR=/app/storage`;
mount a volume there.

## Project structure

```
app/                  → pages (home, products, about, contact, admin)
app/api/               → backend routes (login, save content, upload photos)
components/            → header, footer, WhatsApp button, product cards
components/admin/      → dashboard's photo uploader
seed/                  → starting content.json + placeholder photos
lib/                   → content read/write + admin auth helpers
storage/               → live content.json + uploaded photos (not in git)
```

## Making further changes with Claude Code

Since you have the Claude Code extension in VS Code, you can ask it to make
changes directly — for example "change the maroon color to a darker shade" or
"add a new product category card" — and it will edit the right files for you.
For day-to-day content and photo updates though, you shouldn't need Claude Code
at all — the `/admin` dashboard handles that.
