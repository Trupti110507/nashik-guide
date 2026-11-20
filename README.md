# Nashik Darshan: Akanksha Padol

Website for Miss Akanksha Padol, tourist guide in Nashik. Visitors can read about her, see tour plans and itineraries, request a booking slot, view previous tours and leave feedback.

Plain HTML, CSS and JavaScript. There is no build step and nothing to install.

## Project structure

```
nashik-guide/
├── index.html        page layout
├── css/style.css     styling
├── js/data.js        EDIT THIS: tours, prices, slots, past records, phone number
├── js/app.js         booking, records and feedback logic
├── images/           put photos here
├── vercel.json       Vercel settings
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Change the content

Open `js/data.js` and replace the placeholders:

- `GUIDE.whatsapp`: her number with country code, no `+` or spaces (for example `919876543210`)
- `GUIDE.years`: years of experience
- `TOURS`: plans, stops and prices
- `SLOTS`: time slots offered each day
- `RECORDS`: previous tours
- `SEED_REVIEWS`: replace the sample review with real ones

The phone and email in the footer are in `index.html`.

## Push to GitHub

```
git remote add origin https://github.com/<your-username>/nashik-guide.git
git branch -M main
git push -u origin main
```

## Deploy on Vercel

Import the GitHub repository in Vercel. Framework preset: **Other**. No build command and no output directory are needed.

## Current limitation and next step

Bookings and reviews are saved in the visitor's own browser (`localStorage`), so the guide cannot see them and slot availability is not shared between visitors. For real use, connect a database such as Supabase:

1. Create tables `bookings` (name, phone, tour, date, slot, guests, notes, status) and `reviews` (name, rating, text, approved).
2. Replace the `store` object and the two submit handlers in `js/app.js` with Supabase calls.
3. Add an admin page for approving bookings and reviews.

Never put a Supabase service-role key in this repository. Only the public anon key belongs in front-end code, protected by row-level security.
