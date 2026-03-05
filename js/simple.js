// ===================================
// Simple Mode — Quiz Logic
// ===================================

const SIMPLE_GENRES = [
  { id: "literary-fiction", label: "Literary Fiction", subtitle: "Classic & contemporary novels" },
  { id: "sci-fi", label: "Sci-Fi", subtitle: "Space, tech & future worlds" },
  { id: "fantasy", label: "Fantasy", subtitle: "Magic & mythical realms" },
  { id: "mystery", label: "Mystery", subtitle: "Whodunits & puzzles" },
  { id: "romance", label: "Romance", subtitle: "Love stories & relationships" },
  { id: "thriller", label: "Thriller", subtitle: "Suspense & tension" },
  { id: "horror", label: "Horror", subtitle: "Scares & the supernatural" },
  { id: "historical", label: "Historical", subtitle: "Past eras & real events" },
  { id: "biography", label: "Biography & Memoir", subtitle: "True life stories" },
  { id: "self-help", label: "Self-Help", subtitle: "Growth & knowledge" }
];

// ===================================
// State
// ===================================
const simpleState = {
  step: "simple-welcome",
  genre: null,
  theme: null,
  mood: null,
  length: null,
  seenBookIds: []
};

// ===================================
// Step Navigation
// ===================================
const SIMPLE_STEPS = ["simple-welcome", "simple-genre", "simple-theme", "simple-mood", "simple-length"];

function simpleGetProgressSteps() {
  return [
    { id: "simple-genre", label: "Genre" },
    { id: "simple-theme", label: "Theme" },
    { id: "simple-mood", label: "Mood" },
    { id: "simple-length", label: "Length" }
  ];
}

function simpleGoToStep(stepName) {
  $$("#page-simple .step.active").forEach((el) => el.classList.remove("active"));
  const target = $(`#step-${stepName}`);
  if (target) target.classList.add("active");
  simpleState.step = stepName;
  simpleRenderProgressBar();
}

function simpleRenderProgressBar() {
  const header = $("#simple-progress-header");
  const stepIdx = SIMPLE_STEPS.indexOf(simpleState.step);

  if (stepIdx >= 1 && simpleState.step !== "simple-result" && simpleState.step !== "simple-no-match") {
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
    return;
  }

  const progressSteps = simpleGetProgressSteps();
  const currentProgressIdx = progressSteps.findIndex((s) => s.id === simpleState.step);

  $("#simple-progress-bar").innerHTML = progressSteps
    .map((s, i) => {
      const classes = [];
      if (i < currentProgressIdx) classes.push("completed");
      if (i === currentProgressIdx) classes.push("active");
      return `<div class="progress-segment ${classes.join(" ")}"></div>`;
    })
    .join("");

  $("#simple-progress-labels").innerHTML = progressSteps
    .map((s, i) => {
      const classes = [];
      if (i < currentProgressIdx) classes.push("completed");
      if (i === currentProgressIdx) classes.push("active");
      return `<span class="${classes.join(" ")}">${s.label}</span>`;
    })
    .join("");
}

function simpleGoBack() {
  const currentIdx = SIMPLE_STEPS.indexOf(simpleState.step);
  if (currentIdx > 0) {
    simpleGoToStep(SIMPLE_STEPS[currentIdx - 1]);
  }
}

// ===================================
// Option Rendering & Selection
// ===================================
function simpleRenderOptions(containerId, options, category) {
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
    card.addEventListener("click", () => simpleSelectOption(category, opt.id));
    container.appendChild(card);
  });
}

function simpleSelectOption(category, value) {
  simpleState[category] = value;

  const categoryToStep = {
    genre: "simple-genre",
    theme: "simple-theme",
    mood: "simple-mood",
    length: "simple-length"
  };

  const currentStep = categoryToStep[category];
  const currentIdx = SIMPLE_STEPS.indexOf(currentStep);
  const nextIdx = currentIdx + 1;

  if (nextIdx < SIMPLE_STEPS.length) {
    simpleGoToStep(SIMPLE_STEPS[nextIdx]);
  } else {
    simpleFindAndShowBook();
  }
}

// ===================================
// Book Matching
// ===================================
async function simpleFindAndShowBook() {
  $("#simple-loading-overlay").classList.remove("hidden");

  const seenKeys = new Set(simpleState.seenBookIds);

  // Progressive relaxation filters
  const filters = [
    (b) => b.genre === simpleState.genre && b.theme === simpleState.theme && b.mood === simpleState.mood && b.length === simpleState.length,
    (b) => b.genre === simpleState.genre && b.theme === simpleState.theme && b.mood === simpleState.mood,
    (b) => b.genre === simpleState.genre && b.theme === simpleState.theme,
    (b) => b.genre === simpleState.genre,
    () => true
  ];

  let candidates = [];
  for (const filterFn of filters) {
    candidates = SIMPLE_BOOKS.filter((b) => {
      const key = `${b.title.toLowerCase()}|${b.author.toLowerCase()}`;
      return filterFn(b) && !seenKeys.has(key);
    });
    if (candidates.length > 0) break;
  }

  if (candidates.length === 0) {
    $("#simple-loading-overlay").classList.add("hidden");
    simpleGoToStep("simple-no-match");
    return;
  }

  // Pick a random book
  const book = candidates[Math.floor(Math.random() * candidates.length)];
  simpleState.seenBookIds.push(`${book.title.toLowerCase()}|${book.author.toLowerCase()}`);

  // Fetch cover and details from Google Books API
  const apiData = await simpleBookLookup(book);

  // Display result
  simpleDisplayResult(book, apiData);

  $("#simple-loading-overlay").classList.add("hidden");
  simpleGoToStep("simple-result");
}

async function simpleBookLookup(book) {
  try {
    // Try ISBN lookup first
    let url = `${CONFIG.GOOGLE_BOOKS_API_URL}?q=isbn:${book.isbn}&key=${CONFIG.GOOGLE_BOOKS_API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.items && data.items.length > 0) {
      return parseGoogleBookResult(data.items[0]);
    }

    // Fallback: title + author search
    const query = `intitle:${encodeURIComponent(book.title)}+inauthor:${encodeURIComponent(book.author)}`;
    url = `${CONFIG.GOOGLE_BOOKS_API_URL}?q=${query}&maxResults=1&key=${CONFIG.GOOGLE_BOOKS_API_KEY}`;
    response = await fetch(url);
    data = await response.json();

    if (data.items && data.items.length > 0) {
      return parseGoogleBookResult(data.items[0]);
    }
  } catch (e) {
    console.warn("[BookBrew Simple] API lookup failed:", e);
  }
  return null;
}

function simpleDisplayResult(localBook, apiData) {
  const coverImg = $("#simple-result-cover-img");
  coverImg.src = apiData?.thumbnail || "img/placeholder.svg";
  coverImg.alt = `Cover of ${localBook.title}`;
  coverImg.onerror = () => { coverImg.src = "img/placeholder.svg"; };

  $("#simple-result-title").textContent = localBook.title;
  $("#simple-result-author").textContent = `by ${localBook.author}`;

  // Star rating
  const ratingEl = $("#simple-result-rating");
  const rating = apiData?.averageRating || 0;
  if (rating) {
    const stars = renderStars(rating);
    const isbn = apiData?.isbn10 || "";
    const reviewsUrl = isbn
      ? `https://www.amazon.com/dp/${isbn}#customerReviews`
      : `https://www.amazon.com/s?k=${encodeURIComponent(localBook.title + " " + localBook.author)}`;
    ratingEl.innerHTML = `<a href="${reviewsUrl}" class="reviews-link" target="_blank" rel="noopener noreferrer">Reviews</a>: <span class="result-stars">${stars}</span> <span class="rating-value">${rating.toFixed(1)}</span>`;
  } else {
    ratingEl.innerHTML = "";
  }

  // Description
  const desc = apiData?.description || "No description available.";
  const plainDesc = desc.replace(/<[^>]*>/g, "");
  $("#simple-result-description").textContent = plainDesc.length > 500
    ? plainDesc.slice(0, 500) + "..."
    : plainDesc;

  // Maturity badge — local flag + API assessment
  const maturityBadge = $("#simple-result-maturity");
  let isMature = localBook.mature;
  let maturityReason = localBook.mature ? "Flagged as mature content" : "No mature content detected";

  if (apiData) {
    const apiMaturity = assessMaturity(apiData);
    if (apiMaturity.isMature) {
      isMature = true;
      maturityReason = apiMaturity.reason;
    }
  }

  maturityBadge.className = `maturity-badge ${isMature ? "mature" : "not-mature"}`;
  maturityBadge.textContent = isMature ? "Mature" : "Not Mature";
  maturityBadge.title = maturityReason;

  // Amazon link
  const isbn10 = apiData?.isbn10 || "";
  $("#simple-result-amazon-link").href = isbn10
    ? `https://www.amazon.com/dp/${isbn10}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(localBook.title + " " + localBook.author)}`;
}

// ===================================
// Reset
// ===================================
function simpleStartOver() {
  simpleState.genre = null;
  simpleState.theme = null;
  simpleState.mood = null;
  simpleState.length = null;
  simpleState.seenBookIds = [];
  simpleGoToStep("simple-welcome");
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // Render option grids using our own renderer (not app.js's renderOptions)
  simpleRenderOptions("simple-genre-options", SIMPLE_GENRES, "genre");
  simpleRenderOptions("simple-theme-options", THEMES, "theme");
  simpleRenderOptions("simple-mood-options", MOODS, "mood");
  simpleRenderOptions("simple-length-options", LENGTHS, "length");

  // Event listeners
  $("#btn-simple-start").addEventListener("click", () => simpleGoToStep("simple-genre"));
  $("#btn-simple-start-over").addEventListener("click", simpleStartOver);
  $("#btn-simple-try-again").addEventListener("click", () => simpleFindAndShowBook());
  $("#btn-simple-no-match-restart").addEventListener("click", simpleStartOver);

  // Back buttons
  $("#back-simple-genre").addEventListener("click", () => simpleGoToStep("simple-welcome"));
  $("#back-simple-theme").addEventListener("click", simpleGoBack);
  $("#back-simple-mood").addEventListener("click", simpleGoBack);
  $("#back-simple-length").addEventListener("click", simpleGoBack);
});
