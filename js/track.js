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
        <p>No book in progress.</p>
        <button class="btn-primary track-empty-cta" id="track-find-current-btn">Find a Book</button>
      </div>
    `;
    document.getElementById("track-find-current-btn").addEventListener("click", openBookSearch);
    return;
  }

  const book = data.currentlyReading;
  const coverHtml = book.coverUrl
    ? `<img class="track-log-cover" src="${escapeHtml(book.coverUrl)}" alt="Cover">`
    : `<div class="track-log-cover-placeholder"></div>`;

  container.innerHTML = `
    <div class="track-log-grid">
      <div class="track-log-card">
        ${coverHtml}
        <div class="track-log-info">
          <p class="track-book-title">${escapeHtml(book.title)}</p>
          <p class="track-book-author">by ${escapeHtml(book.author)}</p>
          <p class="track-log-date">Started ${formatDate(book.startDate)}</p>
          <button class="btn-track-finish" id="btn-finish-current">Mark as Finished</button>
          <button class="btn-track-remove-sm" id="btn-clear-current">Remove</button>
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
// Book Search Modal
// ===================================
let trackSearchResults = [];
let searchDebounceTimer = null;

function openBookSearch() {
  let modal = document.getElementById("track-search-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "track-search-modal";
    modal.className = "track-modal-overlay";
    modal.innerHTML = `
      <div class="track-modal">
        <div class="track-modal-header">
          <h3 class="track-modal-title">Find a Book</h3>
          <button class="track-modal-close" id="track-search-close" aria-label="Close">&times;</button>
        </div>
        <div class="track-search-wrap">
          <input type="text" id="track-search-input" class="track-search-input"
            placeholder="Search by title, author, or ISBN&hellip;" autocomplete="off">
        </div>
        <div id="track-search-results" class="track-search-results">
          <p class="track-search-placeholder">Start typing to find books&hellip;</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeBookSearch();
    });
  }

  modal.classList.add("visible");
  // If modal was replaced by a detail view, rebuild it
  if (!document.getElementById("track-search-input")) {
    reopenBookSearchModal();
    document.getElementById("track-search-input").value = "";
    return;
  }
  const input = document.getElementById("track-search-input");
  input.value = "";
  trackSearchResults = [];
  document.getElementById("track-search-results").innerHTML =
    '<p class="track-search-placeholder">Start typing to find books&hellip;</p>';
  document.getElementById("track-search-close").onclick = closeBookSearch;
  input.oninput = onSearchInput;
  input.focus();
}

function closeBookSearch() {
  const modal = document.getElementById("track-search-modal");
  if (modal) modal.classList.remove("visible");
  clearTimeout(searchDebounceTimer);
}

function onSearchInput(e) {
  const query = e.target.value.trim();
  const resultsEl = document.getElementById("track-search-results");
  clearTimeout(searchDebounceTimer);

  if (query.length < 2) {
    resultsEl.innerHTML = '<p class="track-search-placeholder">Start typing to find books&hellip;</p>';
    return;
  }

  resultsEl.innerHTML = '<p class="track-search-loading">Searching&hellip;</p>';

  searchDebounceTimer = setTimeout(() => searchBooks(query), 350);
}

async function searchBooks(query) {
  const resultsEl = document.getElementById("track-search-results");
  if (!resultsEl) return;
  try {
    const url = `${CONFIG.GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=10&key=${CONFIG.GOOGLE_BOOKS_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      resultsEl.innerHTML = '<p class="track-search-empty">No books found. Try a different search.</p>';
      return;
    }

    trackSearchResults = data.items.map((item) => {
      const info = item.volumeInfo || {};
      const links = info.imageLinks || {};
      const ids = info.industryIdentifiers || [];
      const isbn10 = (ids.find((x) => x.type === "ISBN_10") || {}).identifier || "";
      const desc = (info.description || "").replace(/<[^>]*>/g, "");
      return {
        id: item.id || "",
        title: info.title || "Unknown Title",
        author: (info.authors || []).join(", ") || "Unknown Author",
        coverUrl: (links.thumbnail || links.smallThumbnail || "").replace("http:", "https:"),
        description: desc,
        averageRating: info.averageRating || 0,
        ratingsCount: info.ratingsCount || 0,
        isbn10,
        isMature: info.maturityRating === "MATURE"
      };
    });

    renderSearchResults();
  } catch (e) {
    resultsEl.innerHTML = '<p class="track-search-empty">Search failed. Please try again.</p>';
  }
}

function renderSearchResults() {
  const resultsEl = document.getElementById("track-search-results");
  if (!resultsEl) return;

  resultsEl.innerHTML = trackSearchResults.map((book, i) => {
    const coverHtml = book.coverUrl
      ? `<img class="track-search-cover" src="${escapeHtml(book.coverUrl)}" alt="">`
      : `<div class="track-search-cover-ph"></div>`;
    return `
      <div class="track-search-result" data-index="${i}" style="cursor:pointer;">
        ${coverHtml}
        <div class="track-search-info">
          <p class="track-search-title">${escapeHtml(book.title)}</p>
          <p class="track-search-author">${escapeHtml(book.author)}</p>
        </div>
        <span class="track-search-chevron">›</span>
      </div>
    `;
  }).join("");

  resultsEl.querySelectorAll(".track-search-result").forEach((row) => {
    row.addEventListener("click", () => {
      showBookDetail(trackSearchResults[parseInt(row.dataset.index)]);
    });
  });
}

function showBookDetail(book) {
  const modal = document.getElementById("track-search-modal");
  if (!modal) return;

  const stars = book.averageRating
    ? renderStars(book.averageRating)
    : "";
  const ratingHtml = book.averageRating
    ? `<p class="result-rating"><span class="result-stars">${stars}</span> <span class="rating-value">${book.averageRating.toFixed(1)}</span></p>`
    : "";
  const maturityHtml = `<span class="track-detail-maturity ${book.isMature ? "mature" : "not-mature"}">${book.isMature ? "Mature" : "Not Mature"}</span>`;
  const coverHtml = book.coverUrl
    ? `<img class="track-detail-cover" src="${escapeHtml(book.coverUrl)}" alt="">`
    : `<div class="track-detail-cover-ph"></div>`;
  const desc = book.description
    ? (book.description.length > 400 ? book.description.slice(0, 400) + "…" : book.description)
    : "No description available.";
  const amazonUrl = book.isbn10
    ? `https://www.amazon.com/dp/${book.isbn10}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(book.title + " " + book.author)}`;
  const googleUrl = book.id
    ? `https://books.google.com/books?id=${book.id}`
    : `https://books.google.com/books?q=${encodeURIComponent(book.title + " " + book.author)}`;

  modal.innerHTML = `
    <div class="track-modal">
      <div class="track-modal-header">
        <button class="track-detail-back" id="track-detail-back">← Back</button>
        <button class="track-modal-close" id="track-search-close" aria-label="Close">&times;</button>
      </div>
      <div class="track-detail-body">
        <div class="track-detail-top">
          ${coverHtml}
          <div class="track-detail-meta">
            <p class="track-detail-title">${escapeHtml(book.title)}</p>
            <p class="track-detail-author">by ${escapeHtml(book.author)}</p>
            ${ratingHtml}
            ${maturityHtml}
          </div>
        </div>
        <p class="track-detail-desc">${escapeHtml(desc)}</p>
        <div class="track-detail-links">
          <a class="btn-primary btn-amazon" href="${amazonUrl}" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
          <a class="btn-primary btn-google" href="${googleUrl}" target="_blank" rel="noopener noreferrer">Google Books</a>
        </div>
        <div class="track-detail-actions">
          <button class="btn-search-reading" id="track-detail-reading">I'm Reading This</button>
          <button class="btn-search-log" id="track-detail-log">Mark as Read</button>
        </div>
      </div>
    </div>
  `;

  modal.querySelector("#track-detail-back").addEventListener("click", () => {
    // Rebuild the original modal
    reopenBookSearchModal();
  });
  modal.querySelector("#track-search-close").addEventListener("click", closeBookSearch);
  modal.querySelector("#track-detail-reading").addEventListener("click", () => {
    setCurrentlyReading(book);
    closeBookSearch();
    renderCurrentlyReading();
  });
  modal.querySelector("#track-detail-log").addEventListener("click", () => {
    addToReadLog(book);
    closeBookSearch();
    renderReadLog();
    renderGoalCard();
  });
}


function reopenBookSearchModal() {
  const modal = document.getElementById("track-search-modal");
  if (!modal) return;
  modal.innerHTML = `
    <div class="track-modal">
      <div class="track-modal-header">
        <h3 class="track-modal-title">Find a Book</h3>
        <button class="track-modal-close" id="track-search-close" aria-label="Close">&times;</button>
      </div>
      <div class="track-search-wrap">
        <input type="text" id="track-search-input" class="track-search-input"
          placeholder="Search by title, author, or ISBN&hellip;" autocomplete="off">
      </div>
      <div id="track-search-results" class="track-search-results"></div>
    </div>
  `;
  modal.querySelector("#track-search-close").onclick = closeBookSearch;
  const input = modal.querySelector("#track-search-input");
  input.oninput = onSearchInput;
  input.focus();
  if (trackSearchResults.length > 0) {
    renderSearchResults();
  } else {
    document.getElementById("track-search-results").innerHTML =
      '<p class="track-search-placeholder">Start typing to find books&hellip;</p>';
  }
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
  document.getElementById("track-add-manual-btn").addEventListener("click", openBookSearch);
  document.getElementById("track-add-current-btn").addEventListener("click", openBookSearch);
});
