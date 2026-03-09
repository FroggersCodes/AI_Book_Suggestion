// ===================================
// UCSD Dataset (primary book pool)
// ===================================
const ucsdData = {
  loaded: false,
  seriesBookIds: new Set(),       // best_book_ids that belong to a series
  standaloneBookIds: new Set(),   // best_book_ids confirmed standalone
  titleToEntry: new Map()         // normalizedTitle → { book_id, isSeries, popularityScore }
};

function normalizeTitle(title) {
  return title.toLowerCase()
    .replace(/^(the|a|an)\s+/i, '')   // strip leading articles
    .replace(/[^\w\s]/g, ' ')          // punctuation → space
    .replace(/\s+/g, ' ')              // collapse whitespace
    .trim();
}

async function loadUCSDData() {
  try {
    const [seriesMapping, standaloneArr, worksArr, statsArr] = await Promise.all([
      fetch('book_series_mapping 2.json').then(r => r.json()),
      fetch('standalone_books.json').then(r => r.json()),
      fetch('works_filtered.json').then(r => r.json()),
      fetch('book_stats.json').then(r => r.json())
    ]);

    for (const id of Object.keys(seriesMapping)) ucsdData.seriesBookIds.add(id);
    for (const b of standaloneArr) ucsdData.standaloneBookIds.add(b.book_id);

    const popularityMap = new Map(statsArr.map(b => [b.book_id, b.popularity_score]));

    for (const work of worksArr) {
      if (!work.original_title || !work.best_book_id) continue;
      const key = normalizeTitle(work.original_title);
      if (ucsdData.titleToEntry.has(key)) continue;
      const id = work.best_book_id;
      const isSeries = ucsdData.seriesBookIds.has(id)
        ? true
        : ucsdData.standaloneBookIds.has(id) ? false : null;
      ucsdData.titleToEntry.set(key, {
        book_id: id,
        isSeries,
        popularityScore: popularityMap.get(id) || 0
      });
    }

    ucsdData.loaded = true;
    console.log(`[BookBrew] UCSD loaded: ${ucsdData.titleToEntry.size} titles indexed`);
  } catch (e) {
    console.warn('[BookBrew] UCSD load failed — using regex fallback', e);
  }
}

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
  searchLevel: 0,     // 0 = genre+theme+mood, 1 = genre+theme, 2 = genre+theme hint, 3 = genre only
  startIndex: 0       // Pagination offset for Google Books API
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
  $$("#page-advanced .step.active").forEach((el) => el.classList.remove("active"));

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
    state.startIndex = 0;

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
// subject: term used for Google Books category filtering
const GENRE_SUBJECT_MAP = {
  "fiction": "fiction",
  "sci-fi": "science fiction",
  "fantasy": "fantasy",
  "mystery": "mystery",
  "romance": "romance",
  "non-fiction": "nonfiction",
  "horror": "horror",
  "historical-fiction": "historical fiction",
  "thriller": "thriller",
  "biography": "biography",
  "self-help": "self-help",
  "humor": "humor"
};

// Extra keywords added alongside subject to improve relevance
const GENRE_KEYWORDS_MAP = {
  "mystery": "detective crime",
  "thriller": "suspense",
  "biography": "memoir",
  "self-help": "personal development",
  "humor": "comedy"
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

  // Genre as subject: with quoted multi-word terms (e.g. subject:"science fiction")
  const subject = GENRE_SUBJECT_MAP[state.genre] || state.genre;
  parts.push(subject.includes(" ") ? `subject:"${subject}"` : `subject:${subject}`);

  // Add genre-specific keywords for better relevance
  const genreKeywords = GENRE_KEYWORDS_MAP[state.genre];
  if (genreKeywords) {
    parts.push(genreKeywords);
  }

  // Level 0: genre + theme + mood (most specific)
  // Level 1: genre + theme (drop mood)
  // Level 2: genre + primary theme keyword only (drop secondary theme words)
  // Level 3: genre only (broadest — last resort)
  if (level <= 1) {
    const themeTerms = THEME_QUERY_MAP[state.theme] || state.theme;
    parts.push(themeTerms);
  }

  if (level === 2) {
    const themeTerms = THEME_QUERY_MAP[state.theme] || state.theme;
    parts.push(themeTerms.split(" ")[0]); // only the first/strongest theme keyword
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
async function searchGoogleBooks(level, startIndex = 0) {
  const query = buildSearchQuery(level);
  const url = `${CONFIG.GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=${CONFIG.MAX_RESULTS}&startIndex=${startIndex}&langRestrict=en&orderBy=relevance&printType=books&key=${CONFIG.GOOGLE_BOOKS_API_KEY}`;

  console.log("[BookBrew] Fetching:", url);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[BookBrew] API error: HTTP ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log(`[BookBrew] API status: ${response.status}, items: ${data.items?.length ?? 0}`);
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

  // Determine series info — UCSD is authoritative; regex is fallback
  let isSeries;
  let inUCSD = false;
  let ucsdPopularity = 0;

  if (ucsdData.loaded) {
    const entry = ucsdData.titleToEntry.get(normalizeTitle(info.title));
    if (entry) {
      inUCSD = true;
      ucsdPopularity = entry.popularityScore;
      isSeries = entry.isSeries !== null ? entry.isSeries : detectSeries(info);
    } else {
      isSeries = detectSeries(info);
    }
  } else {
    isSeries = detectSeries(info);
  }

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
    inUCSD,
    ucsdPopularity,
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

// Patterns in title/description that signal an academic work, not a trade book
const ACADEMIC_PATTERNS = [
  /\bdissertation\b/i,
  /\bthesis\b/i,
  /\bproceedings\b/i,
  /\bpeer.reviewed\b/i,
  /\bacademic journal\b/i,
  /\blecture notes\b/i,
  /\bconference paper\b/i,
];

function filterResults(books) {
  return books.filter((book) => {
    // Exclude academic/thesis works that slip through subject filters
    const textToCheck = book.title;
    if (ACADEMIC_PATTERNS.some((re) => re.test(textToCheck))) return false;

    // If Google Books returned category data, use it to reject obvious type mismatches.
    // E.g. a user who selected Fiction should not see Juvenile Nonfiction books.
    const cats = (book.categories || []).join(" ").toLowerCase();
    if (cats) {
      if (state.type === "fiction" && /\bnonfiction\b/.test(cats)) return false;
      if (state.type === "non-fiction" && /\bfiction\b/.test(cats) && !/nonfiction/.test(cats)) return false;
    }

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
    // UCSD-curated books always rank above non-UCSD (primary pool first)
    if (a.inUCSD !== b.inUCSD) return a.inUCSD ? -1 : 1;
    // Among UCSD books: sort by UCSD popularity score
    if (a.inUCSD && b.inUCSD) {
      const diff = (b.ucsdPopularity || 0) - (a.ucsdPopularity || 0);
      if (diff !== 0) return diff;
    }
    // Fallback (non-UCSD or tied): Google Books ratings
    const scoreA = (a.ratingsCount || 0) * 1000 + (a.averageRating || 0);
    const scoreB = (b.ratingsCount || 0) * 1000 + (b.averageRating || 0);
    return scoreB - scoreA;
  });
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
// Star Rating
// ===================================
function renderStars(rating) {
  const clamped = Math.min(5, Math.max(0, rating));
  // Round to nearest 0.5 (standard half-star convention)
  const rounded = Math.round(clamped * 2) / 2;
  const full = Math.floor(rounded);
  const hasHalf = rounded - full === 0.5;
  const emptyCount = 5 - full - (hasHalf ? 1 : 0);

  const fullHtml  = '<span class="star-full">★</span>'.repeat(full);
  const halfHtml  = hasHalf
    ? '<span class="star-half"><span class="fill">★</span>☆</span>'
    : '';
  const emptyHtml = '<span class="star-empty">☆</span>'.repeat(emptyCount);

  return fullHtml + halfHtml + emptyHtml;
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

    // Try fetching more results: paginate first, then broaden query
    while (newResults.length === 0 && state.searchLevel <= 3) {
      // 1. Get API results with pagination
      const rawResults = await searchGoogleBooks(state.searchLevel, state.startIndex);
      let filteredResults = filterResults(rawResults);

      // Gradually relax filters rather than dropping all at once.
      // Step 2: relax length constraint, keep format filter.
      if (filteredResults.length === 0 && rawResults.length > 0) {
        filteredResults = rawResults.filter((book) => {
          if (state.type === "fiction" && state.format) {
            if (state.format === "series" && !book.isSeries) return false;
            if (state.format === "standalone" && book.isSeries) return false;
          }
          return true;
        });
      }

      // Step 3: relax length + format — use all raw results for this search level.
      if (filteredResults.length === 0 && rawResults.length > 0) {
        filteredResults = rawResults;
      }

      // 2. Sort by popularity and remove already-seen books
      newResults = sortByPopularity(filteredResults)
        .filter((b) => !seenKeys.has(`${b.title.toLowerCase()}|${b.author.toLowerCase()}`));

      // If nothing new, try next page first, then broaden query
      if (newResults.length === 0) {
        if (rawResults.length >= CONFIG.MAX_RESULTS) {
          // More pages available at this level — fetch next page
          state.startIndex += CONFIG.MAX_RESULTS;
        } else {
          // No more pages — broaden search level
          state.searchLevel++;
          state.startIndex = 0;
        }
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
  } else {
    coverImg.src = "img/placeholder.svg";
  }
  coverImg.alt = `Cover of ${book.title} by ${book.author}`;
  coverImg.onerror = () => { coverImg.src = "img/placeholder.svg"; };

  // Populate details
  const displayTitle = book.subtitle
    ? `${book.title}: ${book.subtitle}`
    : book.title;
  $("#result-title").textContent = displayTitle;
  $("#result-author").textContent = `by ${book.author}`;

  // Star rating — links to Amazon reviews
  const ratingEl = $("#result-rating");
  if (book.averageRating) {
    const stars = renderStars(book.averageRating);
    const reviewsUrl = book.isbn10
      ? `https://www.amazon.com/dp/${book.isbn10}#customerReviews`
      : `https://www.amazon.com/s?k=${encodeURIComponent(book.title + " " + book.author)}`;
    ratingEl.innerHTML = `<a href="${reviewsUrl}" class="reviews-link" target="_blank" rel="noopener noreferrer">Reviews</a>: <span class="result-stars">${stars}</span> <span class="rating-value">${book.averageRating.toFixed(1)}</span>`;
  } else {
    ratingEl.innerHTML = "";
  }

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

  // Google Books link
  $("#result-google-link").href = `https://books.google.com/books?id=${book.id}`;

  // Show result
  $("#loading-overlay").classList.add("hidden");
  goToStep("result");
}

// ===================================
// Share Result
// ===================================
async function shareResult(text) {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch (e) {
      // User cancelled or share failed — fall through to clipboard
      if (e.name === "AbortError") return;
    }
  }
  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(text);
    showShareToast("Copied to clipboard!");
  } catch (e) {
    showShareToast("Couldn't copy — try manually");
  }
}

function showShareToast(message) {
  // Remove existing toast if any
  const existing = document.querySelector(".share-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "share-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 10);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
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
  state.startIndex = 0;
  goToStep("welcome");
}

function tryAnother() {
  findAndShowBook();
}

// ===================================
// Initialize
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  // Load UCSD dataset in the background (enriches results once ready)
  loadUCSDData();

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
  $("#btn-share").addEventListener("click", () => {
    const title = $("#result-title").textContent;
    const author = $("#result-author").textContent;
    const text = `Check out "${title}" ${author} — found on BookBrew!\n\nhttps://bookbrew.org`;
    shareResult(text);
  });

  // Back buttons — all use dynamic goBack
  $("#back-type").addEventListener("click", () => goToStep("welcome"));
  $("#back-format").addEventListener("click", goBack);
  $("#back-genre").addEventListener("click", goBack);
  $("#back-theme").addEventListener("click", goBack);
  $("#back-mood").addEventListener("click", goBack);
  $("#back-length").addEventListener("click", goBack);
});
