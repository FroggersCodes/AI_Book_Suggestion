// ===================================
// Track — Reading Journal
// ===================================

const TRACK_KEY = "bookbrew_track";

// ===================================
// Data
// ===================================
function loadTrackData() {
  try {
    const raw = localStorage.getItem(TRACK_KEY);
    if (!raw) return defaultTrackData();
    const data = JSON.parse(raw);
    if (!data.goals) data.goals = { yearlyTarget: 24 };
    if (!data.readLog) data.readLog = [];
    if (!("currentlyReading" in data)) data.currentlyReading = null;
    return data;
  } catch (e) {
    return defaultTrackData();
  }
}

function defaultTrackData() {
  return { goals: { yearlyTarget: 24 }, currentlyReading: null, readLog: [] };
}

function saveTrackData(data) {
  localStorage.setItem(TRACK_KEY, JSON.stringify(data));
}

// ===================================
// Public API — called from result cards
// ===================================
function setCurrentlyReading(book) {
  const data = loadTrackData();
  data.currentlyReading = {
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl || "",
    startDate: todayStr()
  };
  saveTrackData(data);
  showShareToast("Saved to Currently Reading!");
}

function addToReadLog(book) {
  const data = loadTrackData();
  const dup = data.readLog.find(
    (b) =>
      b.title.toLowerCase() === book.title.toLowerCase() &&
      b.author.toLowerCase() === book.author.toLowerCase()
  );
  if (dup) {
    showShareToast("Already in your reading log!");
    return;
  }
  data.readLog.unshift({
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl || "",
    finishedDate: todayStr(),
    rating: 0
  });
  saveTrackData(data);
  showShareToast("Added to Reading Log!");
}

// ===================================
// Render — main entry point
// ===================================
function renderTrackPage() {
  renderGoalCard();
  renderCurrentlyReading();
  renderReadLog();
}

// ===================================
// Goal Section
// ===================================
function renderGoalCard() {
  const card = document.getElementById("track-goal-card");
  if (!card) return;
  const data = loadTrackData();
  const year = new Date().getFullYear();
  const target = data.goals.yearlyTarget || 0;
  const done = data.readLog.filter(
    (b) => b.finishedDate && parseInt(b.finishedDate) === year
  ).length;
  const pct = target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;

  card.innerHTML = `
    <div class="track-goal-numbers">
      <span class="track-goal-done">${done}</span>
      <span class="track-goal-sep"> / </span>
      <span class="track-goal-target">${target}</span>
      <span class="track-goal-label"> books in ${year}</span>
    </div>
    <div class="track-progress-wrap">
      <div class="track-progress-fill" style="width:${pct}%"></div>
    </div>
    <p class="track-goal-pct">${pct}% complete</p>
  `;
}

function openGoalEditor() {
  const card = document.getElementById("track-goal-card");
  if (!card) return;
  const data = loadTrackData();
  card.innerHTML = `
    <form class="track-goal-form" id="track-goal-form">
      <label class="track-goal-form-label">Books goal for ${new Date().getFullYear()}</label>
      <div class="track-goal-form-row">
        <input type="number" id="track-goal-input" class="track-goal-input"
          value="${data.goals.yearlyTarget}" min="1" max="999">
        <button type="submit" class="btn-track-save">Save</button>
        <button type="button" class="btn-track-cancel" id="track-goal-cancel-btn">Cancel</button>
      </div>
    </form>
  `;
  document.getElementById("track-goal-form").addEventListener("submit", saveGoal);
  document.getElementById("track-goal-cancel-btn").addEventListener("click", renderGoalCard);
  document.getElementById("track-goal-input").focus();
}

function saveGoal(e) {
  e.preventDefault();
  const val = parseInt(document.getElementById("track-goal-input").value) || 24;
  const data = loadTrackData();
  data.goals.yearlyTarget = Math.max(1, Math.min(999, val));
  saveTrackData(data);
  renderGoalCard();
}

// ===================================
// Currently Reading Section
// ===================================
function renderCurrentlyReading() {
  const container = document.getElementById("track-currently-reading");
  if (!container) return;
  const data = loadTrackData();

  if (!data.currentlyReading) {
    container.innerHTML = `
      <div class="track-empty-state">
        <p>No book in progress. Get a recommendation and tap "I'm Reading This".</p>
      </div>
    `;
    return;
  }

  const book = data.currentlyReading;
  const coverHtml = book.coverUrl
    ? `<img class="track-book-cover" src="${escapeHtml(book.coverUrl)}" alt="Cover">`
    : `<div class="track-book-cover-placeholder"></div>`;

  container.innerHTML = `
    <div class="track-current-card">
      ${coverHtml}
      <div class="track-current-info">
        <p class="track-book-title">${escapeHtml(book.title)}</p>
        <p class="track-book-author">by ${escapeHtml(book.author)}</p>
        <p class="track-book-started">Started ${formatDate(book.startDate)}</p>
        <div class="track-current-actions">
          <button class="btn-track-finish" id="btn-finish-current">Mark as Finished</button>
          <button class="btn-track-remove" id="btn-clear-current">Remove</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-finish-current").addEventListener("click", finishCurrentBook);
  document.getElementById("btn-clear-current").addEventListener("click", clearCurrentlyReading);
}

function finishCurrentBook() {
  const data = loadTrackData();
  if (!data.currentlyReading) return;
  const book = data.currentlyReading;
  const dup = data.readLog.find(
    (b) =>
      b.title.toLowerCase() === book.title.toLowerCase() &&
      b.author.toLowerCase() === book.author.toLowerCase()
  );
  if (!dup) {
    data.readLog.unshift({
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl || "",
      finishedDate: todayStr(),
      rating: 0
    });
  }
  data.currentlyReading = null;
  saveTrackData(data);
  renderTrackPage();
}

function clearCurrentlyReading() {
  const data = loadTrackData();
  data.currentlyReading = null;
  saveTrackData(data);
  renderCurrentlyReading();
}

// ===================================
// Reading Log Section
// ===================================
function renderReadLog() {
  const container = document.getElementById("track-log-list");
  if (!container) return;
  const data = loadTrackData();

  if (data.readLog.length === 0) {
    container.innerHTML = `
      <div class="track-empty-state">
        <p>No books logged yet. Finish a book to see it here.</p>
      </div>
    `;
    return;
  }

  const cards = data.readLog.map((book, i) => {
    const coverHtml = book.coverUrl
      ? `<img class="track-log-cover" src="${escapeHtml(book.coverUrl)}" alt="">`
      : `<div class="track-log-cover-placeholder"></div>`;
    const stars = [1, 2, 3, 4, 5]
      .map(
        (n) =>
          `<button class="track-star ${n <= book.rating ? "filled" : ""}" data-index="${i}" data-rating="${n}">${n <= book.rating ? "★" : "☆"}</button>`
      )
      .join("");

    return `
      <div class="track-log-card">
        ${coverHtml}
        <div class="track-log-info">
          <p class="track-book-title">${escapeHtml(book.title)}</p>
          <p class="track-book-author">by ${escapeHtml(book.author)}</p>
          <p class="track-log-date">${formatDate(book.finishedDate)}</p>
          <div class="track-star-row">${stars}</div>
          <button class="btn-track-remove-sm" data-remove="${i}">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `<div class="track-log-grid">${cards}</div>`;

  // Star rating buttons
  container.querySelectorAll(".track-star").forEach((btn) => {
    btn.addEventListener("click", () => {
      rateLogBook(parseInt(btn.dataset.index), parseInt(btn.dataset.rating));
    });
  });

  // Remove buttons
  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromLog(parseInt(btn.dataset.remove));
    });
  });
}

function rateLogBook(index, rating) {
  const data = loadTrackData();
  if (data.readLog[index]) {
    data.readLog[index].rating = rating;
    saveTrackData(data);
    renderReadLog();
  }
}

function removeFromLog(index) {
  const data = loadTrackData();
  data.readLog.splice(index, 1);
  saveTrackData(data);
  renderReadLog();
  renderGoalCard();
}

// ===================================
// Manual Add Modal
// ===================================
function openAddManual() {
  let modal = document.getElementById("track-manual-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "track-manual-modal";
    modal.className = "track-modal-overlay";
    modal.innerHTML = `
      <div class="track-modal">
        <h3 class="track-modal-title">Add a Book</h3>
        <form id="track-manual-form">
          <label class="track-form-label" for="manual-title">Title</label>
          <input type="text" id="manual-title" class="track-form-input" placeholder="Book title" required>
          <label class="track-form-label" for="manual-author">Author</label>
          <input type="text" id="manual-author" class="track-form-input" placeholder="Author name" required>
          <div class="track-modal-actions">
            <button type="submit" class="btn-primary">Add to Log</button>
            <button type="button" class="btn-secondary" id="track-modal-cancel">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAddManual();
    });
  }
  modal.classList.add("visible");
  document.getElementById("manual-title").value = "";
  document.getElementById("manual-author").value = "";
  document.getElementById("track-manual-form").onsubmit = submitManualBook;
  document.getElementById("track-modal-cancel").onclick = closeAddManual;
  document.getElementById("manual-title").focus();
}

function closeAddManual() {
  const modal = document.getElementById("track-manual-modal");
  if (modal) modal.classList.remove("visible");
}

function submitManualBook(e) {
  e.preventDefault();
  const title = document.getElementById("manual-title").value.trim();
  const author = document.getElementById("manual-author").value.trim();
  if (!title || !author) return;
  const data = loadTrackData();
  const dup = data.readLog.find(
    (b) =>
      b.title.toLowerCase() === title.toLowerCase() &&
      b.author.toLowerCase() === author.toLowerCase()
  );
  if (dup) {
    showShareToast("Already in your reading log!");
    closeAddManual();
    return;
  }
  data.readLog.unshift({ title, author, coverUrl: "", finishedDate: todayStr(), rating: 0 });
  saveTrackData(data);
  closeAddManual();
  renderReadLog();
  renderGoalCard();
}

// ===================================
// Utilities
// ===================================
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str || ""));
  return div.innerHTML;
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("track-goal-edit-btn").addEventListener("click", openGoalEditor);
  document.getElementById("track-add-manual-btn").addEventListener("click", openAddManual);
});
