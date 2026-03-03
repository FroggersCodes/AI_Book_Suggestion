// ===================================
// State
// ===================================
const state = {
  step: "welcome",
  type: null,     // "fiction" | "non-fiction"
  format: null,   // "series" | "standalone" (fiction only)
  genre: null,
  theme: null,
  mood: null,
  length: null,
  cachedResults: [],  // Google Books results for current search
  resultIndex: 0,     // Which result we're showing
  seenBookIds: [],    // Track shown books to avoid repeats
  searchLevel: 0      // 0 = full query, 1 = genre+theme, 2 = genre only
};

// ===================================
// DOM References
// ===================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===================================
// Dynamic Step Order
// ===================================
function getStepOrder() {
  const steps = ["welcome", "type"];
  if (state.type === "fiction") {
    steps.push("format");
  }
  steps.push("genre", "theme", "mood", "length");
  return steps;
}

// Labels for progress bar (excludes "welcome")
function getProgressSteps() {
  const steps = [{ id: "type", label: "Type" }];
  if (state.type === "fiction") {
    steps.push({ id: "format", label: "Format" });
  }
  steps.push(
    { id: "genre", label: "Genre" },
    { id: "theme", label: "Theme" },
    { id: "mood", label: "Mood" },
    { id: "length", label: "Length" }
  );
  return steps;
}

// ===================================
// Step Navigation
// ===================================
function goToStep(stepName) {
  $$(".step.active").forEach((el) => el.classList.remove("active"));

  const target = $(`#step-${stepName}`);
  if (target) {
    target.classList.add("active");
  }

  state.step = stepName;
  renderProgressBar();
}

function renderProgressBar() {
  const header = $("#progress-header");
  const stepOrder = getStepOrder();
  const stepIdx = stepOrder.indexOf(state.step);

  // Show progress bar only during selection steps (not welcome or result)
  if (stepIdx >= 1 && state.step !== "result" && state.step !== "no-match") {
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
    return;
  }

  const progressSteps = getProgressSteps();
  const currentProgressIdx = progressSteps.findIndex((s) => s.id === state.step);

  // Render segments
  const barEl = $("#progress-bar");
  barEl.innerHTML = progressSteps
    .map((s, i) => {
      const classes = [];
      if (i < currentProgressIdx) classes.push("completed");
      if (i === currentProgressIdx) classes.push("active");
      return `<div class="progress-segment ${classes.join(" ")}"></div>`;
    })
    .join("");

  // Render labels
  const labelsEl = $("#progress-labels");
  labelsEl.innerHTML = progressSteps
    .map((s, i) => {
      const classes = [];
      if (i < currentProgressIdx) classes.push("completed");
      if (i === currentProgressIdx) classes.push("active");
      return `<span class="${classes.join(" ")}">${s.label}</span>`;
    })
    .join("");
}

function goBack() {
  const stepOrder = getStepOrder();
  const currentIdx = stepOrder.indexOf(state.step);
  if (currentIdx > 0) {
    goToStep(stepOrder[currentIdx - 1]);
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

  // When type changes, reset downstream selections
  if (category === "type") {
    state.format = null;
    state.genre = null;
    state.theme = null;
    state.mood = null;
    state.length = null;
    state.cachedResults = [];
    state.resultIndex = 0;
    state.seenBookIds = [];
    state.searchLevel = 0;

    // Re-render genre options for the selected type
    const filteredGenres = state.type === "fiction" ? FICTION_GENRES : NON_FICTION_GENRES;
    renderOptions("genre-options", filteredGenres, "genre");
  }

  const stepOrder = getStepOrder();
  const currentIdx = stepOrder.indexOf(category);
  const nextIdx = currentIdx + 1;

  if (nextIdx < stepOrder.length) {
    goToStep(stepOrder[nextIdx]);
  } else {
    findAndShowBook();
  }
}

// ===================================
// Google Books API — Query Builder
// ===================================
const GENRE_QUERY_MAP = {
  "fiction": "fiction",
  "sci-fi": "science fiction",
  "fantasy": "fantasy",
  "mystery": "mystery detective",
  "romance": "romance",
  "non-fiction": "nonfiction",
  "horror": "horror",
  "historical-fiction": "historical fiction",
  "thriller": "thriller suspense",
  "biography": "biography memoir",
  "self-help": "self help personal development",
  "humor": "humor comedy"
};

const THEME_QUERY_MAP = {
  "love": "love relationships",
  "adventure": "adventure quest journey",
  "coming-of-age": "coming of age youth growing up",
  "redemption": "redemption second chance forgiveness",
  "survival": "survival endurance",
  "identity": "identity self discovery",
  "power": "power corruption authority",
  "family": "family bonds generations",
  "justice": "justice crime morality",
  "discovery": "exploration discovery knowledge"
};

const MOOD_QUERY_MAP = {
  "dark": "dark gritty intense",
  "lighthearted": "lighthearted cheerful uplifting",
  "thought-provoking": "philosophical thought provoking literary",
  "emotional": "emotional moving poignant",
  "thrilling": "thrilling suspenseful gripping",
  "funny": "funny humorous witty",
  "inspiring": "inspiring motivational uplifting",
  "mysterious": "mysterious enigmatic atmospheric"
};

function buildSearchQuery(level) {
  const parts = [];

  // Genre as subject (always included)
  const genreTerms = GENRE_QUERY_MAP[state.genre] || state.genre;
  parts.push(`subject:${genreTerms.split(" ")[0]}`);

  // Level 0: genre + theme + mood (most specific)
  // Level 1: genre + theme (drop mood)
  // Level 2: genre only (broadest)
  if (level <= 1) {
    const themeTerms = THEME_QUERY_MAP[state.theme] || state.theme;
    parts.push(themeTerms);
  }

  if (level === 0) {
    const moodTerms = MOOD_QUERY_MAP[state.mood] || state.mood;
    parts.push(moodTerms.split(" ")[0]);
  }

  return parts.join(" ");
}

// ===================================
// Google Books API — Search
// ===================================
async function searchGoogleBooks(level) {
  const query = buildSearchQuery(level);
  const url = `${CONFIG.GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=${CONFIG.MAX_RESULTS}&langRestrict=en&orderBy=relevance&printType=books&key=${CONFIG.GOOGLE_BOOKS_API_KEY}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];

    return data.items
      .map((item) => parseGoogleBookResult(item))
      .filter((book) => book !== null);
  } catch (e) {
    console.error("Google Books API error:", e);
    return [];
  }
}

function parseGoogleBookResult(item) {
  const info = item.volumeInfo || {};

  // Must have a title and at least one author
  if (!info.title || !info.authors || info.authors.length === 0) return null;

  // Extract ISBNs
  const identifiers = info.industryIdentifiers || [];
  const isbn13 = identifiers.find((id) => id.type === "ISBN_13")?.identifier || "";
  const isbn10 = identifiers.find((id) => id.type === "ISBN_10")?.identifier || "";

  // Determine series info
  const isSeries = detectSeries(info);

  return {
    id: item.id,
    title: info.title,
    subtitle: info.subtitle || "",
    author: info.authors.join(", "),
    isbn10,
    isbn13,
    description: info.description || "No description available.",
    pageCount: info.pageCount || 0,
    categories: info.categories || [],
    maturityRating: info.maturityRating || "NOT_MATURE",
    thumbnail: info.imageLinks?.thumbnail?.replace("http:", "https:") || "",
    isSeries,
    seriesInfo: item.volumeInfo?.seriesInfo || null,
    ratingsCount: info.ratingsCount || 0,
    averageRating: info.averageRating || 0
  };
}

// ===================================
// Series Detection
// ===================================
function detectSeries(volumeInfo) {
  // Check for explicit series info
  if (volumeInfo.seriesInfo) return true;

  const title = (volumeInfo.title || "").toLowerCase();
  const subtitle = (volumeInfo.subtitle || "").toLowerCase();
  const combined = `${title} ${subtitle}`;

  // Patterns that indicate a series
  const seriesPatterns = [
    /book\s+\d+/i,
    /vol(?:ume)?\.?\s*\d+/i,
    /part\s+\d+/i,
    /#\d+/,
    /\(\s*\w+\s+#?\d+\s*\)/i,       // (SeriesName #1)
    /\bseries\b/i,
    /\btrilogy\b/i,
    /\bbook\s+one\b/i,
    /\bbook\s+two\b/i,
    /\bbook\s+three\b/i
  ];

  return seriesPatterns.some((pattern) => pattern.test(combined));
}

// ===================================
// Filter Results
// ===================================
function filterResults(books) {
  return books.filter((book) => {
    // Filter by length (page count) — skip if page count is unknown
    if (book.pageCount > 0) {
      if (state.length === "short" && book.pageCount > 250) return false;
      if (state.length === "medium" && (book.pageCount < 200 || book.pageCount > 500)) return false;
      if (state.length === "long" && book.pageCount < 400) return false;
    }

    // Filter by series/standalone (fiction only)
    if (state.type === "fiction" && state.format) {
      if (state.format === "series" && !book.isSeries) return false;
      if (state.format === "standalone" && book.isSeries) return false;
    }

    return true;
  });
}

// ===================================
// Popularity Sorting
// ===================================
function sortByPopularity(books) {
  return books.slice().sort((a, b) => {
    // Primary: ratingsCount descending. Secondary: averageRating descending.
    const scoreA = (a.ratingsCount || 0) * 1000 + (a.averageRating || 0);
    const scoreB = (b.ratingsCount || 0) * 1000 + (b.averageRating || 0);
    return scoreB - scoreA;
  });
}

// ===================================
// Curated Book Matching
// ===================================
function getCuratedMatches() {
  // Tier 1: Exact match on genre + theme + mood + length
  let matches = BOOKS.filter((b) =>
    b.genre === state.genre && b.theme === state.theme &&
    b.mood === state.mood && b.length === state.length
  );

  // Tier 2: Relax length
  if (matches.length === 0) {
    matches = BOOKS.filter((b) =>
      b.genre === state.genre && b.theme === state.theme && b.mood === state.mood
    );
  }

  // Tier 3: Relax mood + length
  if (matches.length === 0) {
    matches = BOOKS.filter((b) =>
      b.genre === state.genre && b.theme === state.theme
    );
  }

  // Normalize to same shape as API results
  return matches.map((book) => ({
    id: `curated-${book.isbn13}`,
    title: book.title,
    subtitle: "",
    author: book.author,
    isbn10: book.isbn10,
    isbn13: book.isbn13,
    description: book.description,
    pageCount: 0,
    categories: [book.genre],
    maturityRating: "NOT_MATURE",
    thumbnail: "",
    isSeries: false,
    seriesInfo: null,
    ratingsCount: Infinity,
    averageRating: 5
  }));
}

// ===================================
// Maturity Assessment
// ===================================
const MATURE_KEYWORDS = [
  "explicit", "erotic", "erotica", "sexual", "graphic violence", "gore",
  "torture", "rape", "drug use", "drug abuse", "addiction",
  "profanity", "vulgar", "disturbing", "brutality", "18+",
  "adult content", "mature content", "graphic sex", "pornographic"
];

function assessMaturity(book) {
  // 1. Check Google Books maturity rating
  if (book.maturityRating === "MATURE") {
    return { isMature: true, reason: "Rated mature by publisher" };
  }

  // 2. Scan description for mature keywords
  const descLower = (book.description || "").toLowerCase();
  const categoriesLower = (book.categories || []).join(" ").toLowerCase();
  const combined = `${descLower} ${categoriesLower}`;

  for (const keyword of MATURE_KEYWORDS) {
    if (combined.includes(keyword)) {
      return { isMature: true, reason: `Contains mature themes (${keyword})` };
    }
  }

  // 3. Check categories for mature-oriented genres
  const matureCategories = ["erotica", "true crime", "adult"];
  for (const cat of matureCategories) {
    if (categoriesLower.includes(cat)) {
      return { isMature: true, reason: `Categorized as ${cat}` };
    }
  }

  return { isMature: false, reason: "No mature content detected" };
}

// ===================================
// Display Result
// ===================================
async function findAndShowBook() {
  $("#loading-overlay").classList.remove("hidden");

  // If no cached results or we've exhausted them, fetch new ones
  if (state.cachedResults.length === 0 || state.resultIndex >= state.cachedResults.length) {
    // Build set of already-seen book keys to avoid repeats
    const seenKeys = new Set(state.seenBookIds);

    let newResults = [];

    // Try progressively broader searches until we find unseen results
    while (newResults.length === 0 && state.searchLevel <= 2) {
      // 1. Get curated matches (only on first pass)
      const curatedMatches = state.searchLevel === 0 ? getCuratedMatches() : [];

      // 2. Get API results, filter, and sort by popularity
      const rawResults = await searchGoogleBooks(state.searchLevel);
      let filteredResults = filterResults(rawResults);

      // Fallback: if filters are too strict, relax them
      if (filteredResults.length === 0 && rawResults.length > 0) {
        filteredResults = rawResults;
        if (state.type === "fiction" && state.format) {
          const formatFiltered = rawResults.filter((book) => {
            if (state.format === "series") return book.isSeries;
            if (state.format === "standalone") return !book.isSeries;
            return true;
          });
          if (formatFiltered.length > 0) {
            filteredResults = formatFiltered;
          }
        }
      }

      const sortedApiResults = sortByPopularity(filteredResults);

      // 3. Deduplicate against curated books
      const curatedKeys = new Set(
        curatedMatches.map((b) => `${b.title.toLowerCase()}|${b.author.toLowerCase()}`)
      );
      const uniqueApiResults = sortedApiResults.filter(
        (b) => !curatedKeys.has(`${b.title.toLowerCase()}|${b.author.toLowerCase()}`)
      );

      // 4. Merge and remove already-seen books
      const merged = [...curatedMatches, ...uniqueApiResults];
      newResults = merged.filter((b) => !seenKeys.has(`${b.title.toLowerCase()}|${b.author.toLowerCase()}`));

      // If nothing new at this level, try broader
      if (newResults.length === 0) {
        state.searchLevel++;
      }
    }

    state.cachedResults = newResults;
    state.resultIndex = 0;
  }

  if (state.cachedResults.length === 0) {
    $("#loading-overlay").classList.add("hidden");
    goToStep("no-match");
    return;
  }

  const book = state.cachedResults[state.resultIndex];
  state.resultIndex++;

  // Track this book so we never show it again
  state.seenBookIds.push(`${book.title.toLowerCase()}|${book.author.toLowerCase()}`);

  // Populate cover
  const coverImg = $("#result-cover-img");
  if (book.thumbnail) {
    coverImg.src = book.thumbnail;
  } else if (book.isbn13) {
    coverImg.src = `https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg`;
  } else {
    coverImg.src = "img/placeholder.svg";
  }
  coverImg.alt = `Cover of ${book.title}`;
  coverImg.onerror = () => { coverImg.src = "img/placeholder.svg"; };

  // Populate details
  const displayTitle = book.subtitle
    ? `${book.title}: ${book.subtitle}`
    : book.title;
  $("#result-title").textContent = displayTitle;
  $("#result-author").textContent = `by ${book.author}`;

  // Truncate long descriptions
  const desc = book.description || "No description available.";
  const plainDesc = desc.replace(/<[^>]*>/g, ""); // Strip HTML tags from API response
  $("#result-description").textContent = plainDesc.length > 500
    ? plainDesc.slice(0, 500) + "..."
    : plainDesc;

  // Maturity badge
  const maturityBadge = $("#result-maturity");
  const maturity = assessMaturity(book);
  maturityBadge.className = `maturity-badge ${maturity.isMature ? "mature" : "not-mature"}`;
  maturityBadge.textContent = maturity.isMature ? "Mature" : "Not Mature";
  maturityBadge.title = maturity.reason;

  // Amazon link
  const amazonLink = book.isbn10
    ? `https://www.amazon.com/dp/${book.isbn10}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(book.title + " " + book.author)}`;
  $("#result-amazon-link").href = amazonLink;

  // Show result
  $("#loading-overlay").classList.add("hidden");
  goToStep("result");
}

// ===================================
// Reset
// ===================================
function startOver() {
  state.type = null;
  state.format = null;
  state.genre = null;
  state.theme = null;
  state.mood = null;
  state.length = null;
  state.cachedResults = [];
  state.resultIndex = 0;
  state.seenBookIds = [];
  state.searchLevel = 0;
  goToStep("welcome");
}

function tryAnother() {
  findAndShowBook();
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // Render type options
  renderOptions("type-options", TYPES, "type");

  // Render format options
  renderOptions("format-options", FORMATS, "format");

  // Render all other option grids (genres will be re-rendered on type selection)
  renderOptions("genre-options", GENRES, "genre");
  renderOptions("theme-options", THEMES, "theme");
  renderOptions("mood-options", MOODS, "mood");
  renderOptions("length-options", LENGTHS, "length");

  // Event listeners
  $("#btn-start").addEventListener("click", () => goToStep("type"));
  $("#btn-start-over").addEventListener("click", startOver);
  $("#btn-try-again").addEventListener("click", tryAnother);
  $("#btn-no-match-restart").addEventListener("click", startOver);

  // Back buttons — all use dynamic goBack
  $("#back-type").addEventListener("click", () => goToStep("welcome"));
  $("#back-format").addEventListener("click", goBack);
  $("#back-genre").addEventListener("click", goBack);
  $("#back-theme").addEventListener("click", goBack);
  $("#back-mood").addEventListener("click", goBack);
  $("#back-length").addEventListener("click", goBack);
});
