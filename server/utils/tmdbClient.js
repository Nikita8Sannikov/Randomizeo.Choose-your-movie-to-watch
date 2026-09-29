const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_FALLBACK_POSTER = "https://placehold.co/300x450/1e293b/94a3b8?text=No+poster";

function isJwtToken(token) {
  return typeof token === "string" && token.startsWith("eyJ");
}

export function tmdbPosterUrl(posterPath) {
  if (!posterPath) return TMDB_FALLBACK_POSTER;
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

export async function tmdbFetch(token, path, params = {}) {
  if (!token) {
    const error = new Error("TMDB_ACCESS_TOKEN is not set");
    error.status = 500;
    throw error;
  }

  const url = new URL(`${TMDB_API_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") url.searchParams.set(key, String(value));
  });

  const headers = { accept: "application/json" };
  if (isJwtToken(token)) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    url.searchParams.set("api_key", token);
  }

  const response = await fetch(url, { headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.status_message || `TMDB error ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
}

function titleOf(doc) {
  return doc.title || doc.name || "";
}

function yearOf(doc) {
  const date = doc.release_date || doc.first_air_date || "";
  const year = Number.parseInt(String(date).slice(0, 4), 10);
  return Number.isFinite(year) ? year : "";
}

function runtimeOf(doc) {
  if (typeof doc.runtime === "number" && doc.runtime > 0) return doc.runtime;
  const episode = Array.isArray(doc.episode_run_time) ? doc.episode_run_time[0] : null;
  return typeof episode === "number" && episode > 0 ? episode : "";
}

function genresOf(doc) {
  return Array.isArray(doc.genres) ? doc.genres.map((g) => g.name).filter(Boolean).join(", ") : "";
}

function ratingOf(doc) {
  return typeof doc.vote_average === "number" && doc.vote_average > 0
    ? doc.vote_average.toFixed(1)
    : "";
}

const SHORT_DESCRIPTION_MAX_LENGTH = 150;

function truncateOverview(text, maxLength = SHORT_DESCRIPTION_MAX_LENGTH) {
  const value = String(text || "").trim();
  if (!value || value.length <= maxLength) return value;

  const sliced = value.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trim()}…`;
}

export function mapSearchResult(item) {
  const mediaType = item.media_type === "tv" ? "tv" : "movie";
  return {
    tmdbId: item.id,
    tmdbMediaType: mediaType,
    title: titleOf(item),
    img: tmdbPosterUrl(item.poster_path),
    shortDescription: truncateOverview(item.overview),
    description: item.overview || "",
    year: yearOf(item),
    genres: "",
    rating: ratingOf(item),
    movieLength: "",
    isSeries: mediaType === "tv",
  };
}

export function mapDetailsPair(ru, en, mediaType) {
  const titleRu = titleOf(ru) || titleOf(en);
  const titleEn = titleOf(en) || titleOf(ru);
  const overviewRu = ru.overview || "";
  const overviewEn = en.overview || "";
  const runtime = runtimeOf(ru) || runtimeOf(en);

  return {
    tmdbId: ru.id || en.id,
    tmdbMediaType: mediaType,
    title: titleRu,
    titleEn,
    img: tmdbPosterUrl(ru.poster_path || en.poster_path),
    shortDescription: truncateOverview(overviewRu),
    shortDescriptionEn: truncateOverview(overviewEn),
    description: overviewRu,
    descriptionEn: overviewEn,
    year: yearOf(ru) || yearOf(en),
    genres: genresOf(ru) || genresOf(en),
    rating: ratingOf(ru) || ratingOf(en),
    movieLength: runtime === "" ? "" : String(runtime),
    isSeries: mediaType === "tv",
  };
}

export async function fetchTmdbDetails(token, mediaType, id) {
  const path = mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`;
  const [ru, en] = await Promise.all([
    tmdbFetch(token, path, { language: "ru-RU" }),
    tmdbFetch(token, path, { language: "en-US" }),
  ]);
  return mapDetailsPair(ru, en, mediaType);
}
