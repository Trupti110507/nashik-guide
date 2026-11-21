/* App logic. Data comes from data.js (loaded first). */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Storage: bookings and reviews are kept in this browser only.
   To share them with the guide, replace these two functions with
   calls to a backend such as Supabase (see README). */
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } }
};

/* ---- Contact details (phone, WhatsApp, email) ---- */
const telHref = "tel:" + GUIDE.phone.replace(/[^\d+]/g, "");
const waBase = `https://wa.me/${encodeURIComponent(GUIDE.whatsapp)}`;
$$("[data-phone]").forEach(el => { el.textContent = GUIDE.phone; });
$$("[data-email]").forEach(el => { el.textContent = GUIDE.email; });
$$("[data-call]").forEach(a => { a.href = telHref; });
$$("[data-mail]").forEach(a => { a.href = "mailto:" + GUIDE.email; });
$$("[data-wa]").forEach(a => {
  a.href = `${waBase}?text=${encodeURIComponent("Hello Akanksha, I'd like to know more about your Nashik tours.")}`;
});

$("#yrs").textContent = GUIDE.years;
$("#y").textContent = new Date().getFullYear();

/* ---- Kumbh Mela section ---- */
const fmt = (d, o) => d.toLocaleDateString("en-IN", o);
const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
const snans = KUMBH.snans.map(s => ({ ...s, d: new Date(s.date + "T00:00:00") }));

$("#kumbhTitle").textContent = KUMBH.title;
$("#kumbhMeta").textContent = KUMBH.meta;
$("#kumbhTimeline").innerHTML = snans.map(s => `
  <li><div class="t-date"><b>${s.d.getDate()}</b><small>${esc(fmt(s.d, { month: "short" }))} ${s.d.getFullYear()}</small></div>
  <div><div class="t-title">${esc(s.title)}</div><div class="t-note">${esc(fmt(s.d, { weekday: "long" }))} · ${esc(s.note)}</div></div></li>`).join("");
$("#kumbhTips").innerHTML = KUMBH.tips.map(t =>
  `<div class="tip"><div class="ic" aria-hidden="true">${t.icon}</div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div>`).join("");

const next = snans.find(s => s.d >= startOfToday);
if (next) {
  const days = Math.round((next.d - startOfToday) / 86400000);
  $("#cdDays").textContent = days;
  $("#cdLabel").textContent = days === 0 ? `${next.title} is today` : `${days === 1 ? "day" : "days"} to the ${next.title}`;
} else {
  $("#cdDays").textContent = "✓";
  $("#cdLabel").textContent = "The main Amrit Snan dates have passed";
}

/* ---- Tours ---- */
$("#tourGrid").innerHTML = TOURS.map(t => `
  <div class="card tour"><span class="tag">${esc(t.tag)}</span><h3>${esc(t.name)}</h3>
  <ol class="stops">${t.stops.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
  <div class="foot"><span class="price">${esc(t.price)}</span>
  <button type="button" class="btn btn-sm" data-tour="${esc(t.name)}">Book this plan</button></div></div>`).join("");
$("#tourSelect").innerHTML = TOURS.map(t => `<option>${esc(t.name)}</option>`).join("");

$("#tourGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-tour]");
  if (!b) return;
  $("#tourSelect").value = b.dataset.tour;
  $("#book").scrollIntoView({ behavior: "smooth" });
});

/* ---- Slot booking ---- */
let chosen = null;
const bookings = () => store.get("bookings", []);

function renderSlots() {
  const date = $("#dateInput").value;
  const taken = bookings().filter(b => b.date === date).map(b => b.slot);
  if (taken.includes(chosen)) chosen = null;
  $("#slots").innerHTML = SLOTS.map(s => {
    const full = taken.includes(s);
    return `<button type="button" class="slot${full ? " full" : ""}${s === chosen ? " sel" : ""}" data-s="${s}" ${full ? "disabled" : ""}>${s}</button>`;
  }).join("");
}

$("#dateInput").min = new Date().toISOString().slice(0, 10);
$("#dateInput").addEventListener("change", renderSlots);
$("#slots").addEventListener("click", e => {
  const b = e.target.closest(".slot");
  if (!b || b.disabled) return;
  chosen = b.dataset.s;
  renderSlots();
});
renderSlots();

$("#bookForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg = $("#bookMsg");
  msg.style.display = "block";
  if (!chosen) {
    msg.className = "msg error";
    msg.textContent = "Please choose a time slot.";
    return;
  }
  const f = Object.fromEntries(new FormData(e.target));
  const b = { ...f, slot: chosen };
  store.set("bookings", [...bookings(), b]);
  const text = `Hello Akanksha, I'd like to book:\nPlan: ${b.tour}\nDate: ${b.date}, ${b.slot}\nGuests: ${b.guests}\nName: ${b.name}, Phone: ${b.phone}\n${b.notes ? "Notes: " + b.notes : ""}`;
  msg.className = "msg";
  msg.innerHTML = `Request saved! <a target="_blank" rel="noopener" href="${waBase}?text=${encodeURIComponent(text)}">Confirm on WhatsApp</a>`;
  e.target.reset();
  chosen = null;
  renderSlots();
});

/* ---- Previous records ---- */
$("#recBody").innerHTML = RECORDS.map(r =>
  `<tr><td>${esc(r.date)}</td><td>${esc(r.group)}</td><td>${esc(r.plan)}</td><td>${Number(r.guests)}</td></tr>`).join("");
$("#sTours").textContent = RECORDS.length;
$("#sGuests").textContent = RECORDS.reduce((a, r) => a + r.guests, 0);

/* ---- Feedback ---- */
let rating = 0;
$("#stars").innerHTML = [1, 2, 3, 4, 5].map(n => `<span data-n="${n}">★</span>`).join("");
$("#stars").addEventListener("click", e => {
  const n = +e.target.dataset.n;
  if (!n) return;
  rating = n;
  [...$("#stars").children].forEach((s, i) => s.classList.toggle("on", i < n));
});

const reviews = () => [...SEED_REVIEWS, ...store.get("reviews", [])];

function renderReviews() {
  const r = reviews();
  $("#reviews").innerHTML = r.map(x =>
    `<div class="review"><b>${esc(x.name)}</b> <span class="star">${"★".repeat(x.rating)}</span><br>${esc(x.text)}</div>`).join("");
  $("#sRating").textContent = (r.reduce((a, x) => a + x.rating, 0) / r.length).toFixed(1);
}
renderReviews();

$("#fbForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!rating) { alert("Please select a star rating."); return; }
  const f = Object.fromEntries(new FormData(e.target));
  store.set("reviews", [...store.get("reviews", []), { name: f.name, text: f.text, rating }]);
  e.target.reset();
  rating = 0;
  [...$("#stars").children].forEach(s => s.classList.remove("on"));
  $("#fbMsg").style.display = "block";
  renderReviews();
});
