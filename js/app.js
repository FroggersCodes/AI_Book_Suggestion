// ===================================
// State
// ===================================
const state = {
  step: "welcome", // welcome | genre | theme | mood | length | result | no-match
  genre: null,
  theme: null,
  mood: null,
  length: null,
  shownBooks: [] // ISBNs of books already shown (for "Try Another")
};

const STEP_ORDER = ["welcome", "genre", "theme", "mood", "length"];

// ===================================
// DOM References
// ===================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===================================
// Step Navigation
// ===================================
function goToStep(stepName) {
  // Hide all steps
  $$(".step.active").forEach((el) => el.classList.remove("active"));

  // Show target step
  const target = $(`#step-${stepName}`);
  if (target) {
    target.classList.add("active");
  }

  state.step = stepName;
  updateProgress();
}

function updateProgress() {
  const header = $("#progress-header");
  const stepIdx = STEP_ORDER.indexOf(state.step);

  // Show progress bar only during steps 1-4
  if (stepIdx >= 1 && stepIdx <= 4) {
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
  }

  // Update segments and labels
  $$(".progress-segment").forEach((seg) => {
    const s = parseInt(seg.dataset.step);
    seg.classList.toggle("completed", s < stepIdx);
    seg.classList.toggle("active", s === stepIdx);
  });

  $$(".progress-labels span").forEach((label) => {
    const s = parseInt(label.dataset.step);
    label.classList.toggle("completed", s < stepIdx);
    label.classList.toggle("active", s === stepIdx);
  });
}

function goBack() {
  const currentIdx = STEP_ORDER.indexOf(state.step);
  if (currentIdx > 0) {
    goToStep(STEP_ORDER[currentIdx - 1]);
  }
}

// ===================================
// Render Option Cards
// ===================================
function renderOptions(containerId, options, category) {
  const container = $(`#${containerId}`);
  container.innerHTML = "";

  options.forEach((opt, i) => {
    const card = document.createElement("button");
    card.className = "option-card";
    card.style.animationDelay = `${i * 40}ms`;

    let html = `<div class="option-label">${opt.label}</div>`;
    if (opt.subtitle) {
      html += `<div class="option-subtitle">${opt.subtitle}</div>`;
    }

    card.innerHTML = html;
    card.addEventListener("click", () => selectOption(category, opt.id));
    container.appendChild(card);
  });
}

function selectOption(category, value) {
  state[category] = value;

  const currentIdx = STEP_ORDER.indexOf(category);
  const nextIdx = currentIdx + 1;

  if (nextIdx < STEP_ORDER.length) {
    goToStep(STEP_ORDER[nextIdx]);
  } else {
    // All selections made — find a book
    findAndShowBook();
  }
}

// ===================================
// Book Matching
// ===================================
function findBook() {
  const { genre, theme, mood, length } = state;

  // Score each book
  const scored = BOOKS
    .filter((b) => !state.shownBooks.includes(b.isbn13))
    .map((book) => {
      let score = 0;
      if (book.genre === genre) score += 8;
      if (book.theme === theme) score += 4;
      if (book.mood === mood) score += 2;
      if (book.length === length) score += 1;
      return { book, score };
    })
    .filter((entry) => entry.score >= 8) // Must match genre at minimum
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return Math.random() - 0.5;
    });

  if (scored.length > 0) {
    return scored[0].book;
  }

  // If all genre matches exhausted, reset and try again
  if (state.shownBooks.length > 0) {
    state.shownBooks = [];
    return findBook();
  }

  return null;
}

// ===================================
// Open Library API
// ===================================
async function fetchBookCover(isbn13) {
  // Use the covers API directly — fast and no JSON parsing needed
  const url = `https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg`;

  try {
    const response = await fetch(url, { method: "HEAD" });
    // Open Library returns a 1x1 pixel for missing covers
    if (response.ok) {
      return url;
    }
  } catch (e) {
    // Network error — use placeholder
  }

  return "img/placeholder.svg";
}

async function fetchBookDescription(isbn13) {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn13}&format=json&jscmd=data`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    const bookData = data[`ISBN:${isbn13}`];

    if (bookData) {
      return {
        description: bookData.excerpts?.[0]?.text || null,
        pages: bookData.number_of_pages || null,
        subjects: bookData.subjects?.map((s) => s.name) || []
      };
    }
  } catch (e) {
    // Timeout or network error
  }

  return null;
}

// ===================================
// Display Result
// ===================================
async function findAndShowBook() {
  // Show loading
  $("#loading-overlay").classList.remove("hidden");

  const book = findBook();

  if (!book) {
    $("#loading-overlay").classList.add("hidden");
    goToStep("no-match");
    return;
  }

  state.shownBooks.push(book.isbn13);

  // Fetch cover and API data in parallel
  const [coverUrl, apiData] = await Promise.all([
    fetchBookCover(book.isbn13),
    fetchBookDescription(book.isbn13)
  ]);

  // Populate result
  const coverImg = $("#result-cover-img");
  coverImg.src = coverUrl;
  coverImg.alt = `Cover of ${book.title}`;
  coverImg.onerror = () => { coverImg.src = "img/placeholder.svg"; };

  $("#result-title").textContent = book.title;
  $("#result-author").textContent = `by ${book.author}`;
  $("#result-description").textContent = book.description;

  // Amazon link
  const amazonLink = book.isbn10
    ? `https://www.amazon.com/dp/${book.isbn10}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(book.title + " " + book.author)}`;
  $("#result-amazon-link").href = amazonLink;

  // Hide loading, show result
  $("#loading-overlay").classList.add("hidden");
  goToStep("result");
}

// ===================================
// Reset
// ===================================
function startOver() {
  state.genre = null;
  state.theme = null;
  state.mood = null;
  state.length = null;
  state.shownBooks = [];
  goToStep("welcome");
}

function tryAnother() {
  findAndShowBook();
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // Render all option grids
  renderOptions("genre-options", GENRES, "genre");
  renderOptions("theme-options", THEMES, "theme");
  renderOptions("mood-options", MOODS, "mood");
  renderOptions("length-options", LENGTHS, "length");

  // Event listeners
  $("#btn-start").addEventListener("click", () => goToStep("genre"));
  $("#btn-start-over").addEventListener("click", startOver);
  $("#btn-try-again").addEventListener("click", tryAnother);
  $("#btn-no-match-restart").addEventListener("click", startOver);

  // Back buttons
  $("#back-genre").addEventListener("click", () => goToStep("welcome"));
  $("#back-theme").addEventListener("click", () => goToStep("genre"));
  $("#back-mood").addEventListener("click", () => goToStep("theme"));
  $("#back-length").addEventListener("click", () => goToStep("mood"));
});
