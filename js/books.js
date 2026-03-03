// ===================================
// Type & Format Options
// ===================================
const TYPES = [
  { id: "fiction", label: "Fiction", subtitle: "Novels, stories & imagination" },
  { id: "non-fiction", label: "Non-Fiction", subtitle: "Real world & knowledge" }
];

const FORMATS = [
  { id: "series", label: "Series", subtitle: "Multi-book stories" },
  { id: "standalone", label: "Standalone", subtitle: "Complete in one book" }
];

// ===================================
// Genre Options — split by type
// ===================================
const FICTION_GENRES = [
  { id: "fiction", label: "General Fiction" },
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "fantasy", label: "Fantasy" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "horror", label: "Horror" },
  { id: "historical-fiction", label: "Historical Fiction" },
  { id: "thriller", label: "Thriller" },
  { id: "humor", label: "Humor" }
];

const NON_FICTION_GENRES = [
  { id: "non-fiction", label: "General Non-Fiction" },
  { id: "biography", label: "Biography & Memoir" },
  { id: "self-help", label: "Self-Help" }
];

// All genres combined (used for initial render before type is selected)
const GENRES = [...FICTION_GENRES, ...NON_FICTION_GENRES];

// ===================================
// Theme, Mood, Length Options
// ===================================
const THEMES = [
  { id: "love", label: "Love" },
  { id: "adventure", label: "Adventure" },
  { id: "coming-of-age", label: "Coming of Age" },
  { id: "redemption", label: "Redemption" },
  { id: "survival", label: "Survival" },
  { id: "identity", label: "Identity" },
  { id: "power", label: "Power" },
  { id: "family", label: "Family" },
  { id: "justice", label: "Justice" },
  { id: "discovery", label: "Discovery" }
];

const MOODS = [
  { id: "dark", label: "Dark" },
  { id: "lighthearted", label: "Lighthearted" },
  { id: "thought-provoking", label: "Thought-Provoking" },
  { id: "emotional", label: "Emotional" },
  { id: "thrilling", label: "Thrilling" },
  { id: "funny", label: "Funny" },
  { id: "inspiring", label: "Inspiring" },
  { id: "mysterious", label: "Mysterious" }
];

const LENGTHS = [
  { id: "short", label: "Short", subtitle: "Under 250 pages" },
  { id: "medium", label: "Medium", subtitle: "250 – 450 pages" },
  { id: "long", label: "Long", subtitle: "450+ pages" }
];
