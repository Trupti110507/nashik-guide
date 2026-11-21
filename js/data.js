/* ======= EDIT THIS FILE WITH REAL DETAILS ======= */
/* Everything the site shows (contact, tours, prices, Kumbh dates, past
   records) lives here, so content changes never touch the app logic. */

const GUIDE = {
  phone: "+91 72198 01045",   // shown on the site; the Call buttons use it too
  whatsapp: "917219801045",   // country code + number, no + or spaces
  email: "",                  // add an email like "name@gmail.com" to show it in the footer
  years: "4 to 5"             // shown in About as "Experience: 4 to 5 years"
};

const TOURS = [
  { id: "half", name: "Panchavati Half-Day Darshan", tag: "4 hours", price: "₹1,500 / group",
    stops: ["Kalaram Temple", "Sita Gufaa", "Ramkund (Godavari ghat)", "Sundarnarayan Temple", "Local misal breakfast stop"] },
  { id: "full", name: "Nashik Full-Day Darshan", tag: "8 hours", price: "₹3,000 / group",
    stops: ["Ramkund & Kapaleshwar", "Kalaram Temple", "Pandavleni Caves", "Muktidham", "Sula Vineyards (sunset)"] },
  { id: "trimbak", name: "Trimbakeshwar Pilgrimage", tag: "Full day", price: "₹3,500 / group",
    stops: ["Trimbakeshwar Jyotirlinga", "Kushavarta Kund", "Brahmagiri viewpoint", "Anjaneri Hill (optional)"] },
  { id: "kumbh", name: "Kumbh Mela 2027 Special", tag: "Custom", price: "On request",
    stops: ["Ramkund & Kalaram Temple darshan", "Trimbakeshwar visit planned around the crowds", "Ghat access and timing guidance", "Stay and travel assistance"] }
];

const SLOTS = ["6:30 AM", "9:00 AM", "12:00 PM", "3:00 PM"];

/* Simhastha Kumbh Mela, Nashik-Trimbakeshwar, as announced by the
   Maharashtra government. Check official notices before publishing changes. */
const KUMBH = {
  title: "Simhastha Kumbh Mela 2027–28",
  meta: "Began on 31 Oct 2026 · concludes at Trimbakeshwar on 27 Feb 2028 and at Ramkund, Nashik on 24 Jul 2028.",
  snans: [
    { date: "2027-08-02", title: "First Amrit Snan", note: "Ashadha Somvati Amavasya" },
    { date: "2027-08-31", title: "Mahakumbh Snan", note: "Second Amrit Snan · Shravan Amavasya" },
    { date: "2027-09-11", title: "Third Amrit Snan", note: "Bhadrapada Shuddha Ekadashi · Trimbakeshwar's third snan is on 12 Sep" }
  ],
  tips: [
    { icon: "🗓️", title: "Book early", text: "Stays and guide slots fill up around the Amrit Snan dates. Lock your plan weeks ahead." },
    { icon: "🌅", title: "Start before sunrise", text: "Ghats and roads are calmest early in the morning. The 6:30 AM slot is made for this." },
    { icon: "🎒", title: "Travel light", text: "Comfortable footwear, a water bottle, a small bag and a photo ID are all you need." },
    { icon: "🤝", title: "Stay together", text: "Agree on a meeting point and share phone numbers. Crowds can separate families." }
  ]
};

const RECORDS = [
  { date: "2026-10-12", group: "Pune family", plan: "Panchavati Half-Day Darshan", guests: 5 },
  { date: "2026-10-26", group: "Ahmedabad group", plan: "Nashik Full-Day Darshan", guests: 9 },
  { date: "2026-11-02", group: "Mumbai couple", plan: "Trimbakeshwar Pilgrimage", guests: 2 }
];

const SEED_REVIEWS = [
  { name: "Sample guest", rating: 5, text: "Replace these sample reviews with real ones." }
];
