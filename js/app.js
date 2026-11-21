/* App logic. Data comes from data.js (loaded first). */

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Storage: bookings and reviews are kept in this browser only.
   To share them with the guide, replace these two functions with
   calls to a backend such as Supabase (see README). */
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } }
};

$("#yrs").textContent = GUIDE.years;
$("#y").textContent = new Date().getFullYear();

/* ---- Tours ---- */
$("#tourGrid").innerHTML = TOURS.map(t => `
  <div class="card"><span class="tag">${esc(t.tag)}</span><h3>${esc(t.name)}</h3>
  <ol class="stops">${t.stops.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
  <div class="price">${esc(t.price)}</div></div>`).join("");
$("#tourSelect").innerHTML = TOURS.map(t => `<option>${esc(t.name)}</option>`).join("");

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
  msg.innerHTML = `Request saved! <a target="_blank" rel="noopener" href="https://wa.me/${encodeURIComponent(GUIDE.whatsapp)}?text=${encodeURIComponent(text)}">Confirm on WhatsApp</a>`;
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
