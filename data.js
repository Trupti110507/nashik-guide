/* ======= EDIT THIS FILE WITH REAL DETAILS ======= */
/* Everything the site shows (tours, prices, past records) lives here,
   so content changes never touch the app logic. */

const GUIDE = {
  whatsapp: "910000000000", // country code + number, no + or spaces
  years: "X"
};

const TOURS = [
  { id: "half", name: "Panchavati Half-Day Darshan", tag: "4 hours", price: "₹1,500 / group",
    stops: ["Kalaram Temple", "Sita Gufaa", "Ramkund (Godavari ghat)", "Sundarnarayan Temple", "Local misal breakfast stop"] },
  { id: "full", name: "Nashik Full-Day Darshan", tag: "8 hours", price: "₹3,000 / group",
    stops: ["Ramkund & Kapaleshwar", "Kalaram Temple", "Pandavleni Caves", "Muktidham", "Sula Vineyards (sunset)"] },
  { id: "trimbak", name: "Trimbakeshwar Pilgrimage", tag: "Full day", price: "₹3,500 / group",
    stops: ["Trimbakeshwar Jyotirlinga", "Kushavarta Kund", "Brahmagiri viewpoint", "Anjaneri Hill (optional)"] },
  { id: "kumbh", name: "Kumbh Mela 2027 Special", tag: "Custom", price: "On request",
    stops: ["Customised for crowds & ritual dates", "Ghat access planning", "Stay & travel assistance"] }
];

const SLOTS = ["6:30 AM", "9:00 AM", "12:00 PM", "3:00 PM"];

const RECORDS = [
  { date: "2026-10-12", group: "Pune family", plan: "Panchavati Half-Day Darshan", guests: 5 },
  { date: "2026-10-26", group: "Ahmedabad group", plan: "Nashik Full-Day Darshan", guests: 9 },
  { date: "2026-11-02", group: "Mumbai couple", plan: "Trimbakeshwar Pilgrimage", guests: 2 }
];

const SEED_REVIEWS = [
  { name: "Sample guest", rating: 5, text: "Replace these sample reviews with real ones." }
];
