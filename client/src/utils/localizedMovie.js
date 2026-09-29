export const SHORT_DESCRIPTION_MAX_LENGTH = 150

export function isEnglishLang(lang) {
  return String(lang || "").toLowerCase().startsWith("en")
}

export function truncateText(text, maxLength = SHORT_DESCRIPTION_MAX_LENGTH) {
  const value = String(text || "").trim()
  if (!value || value.length <= maxLength) return value

  const sliced = value.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(" ")
  const cut = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced
  return `${cut.trim()}…`
}

export function movieTitle(movie, lang) {
  if (isEnglishLang(lang)) return movie.titleEn || movie.title || ""
  return movie.title || movie.titleEn || ""
}

export function movieDescription(movie, lang) {
  if (isEnglishLang(lang)) return movie.descriptionEn || ""
  return movie.description || ""
}

export function movieShortDescription(movie, lang) {
  if (isEnglishLang(lang)) {
    return movie.shortDescriptionEn || movie.descriptionEn || ""
  }
  return movie.shortDescription || movie.description || ""
}

export function formatMovieLength(minutes, t) {
  if (minutes == null || minutes === "") return ""
  const asNumber = Number(minutes)
  if (!Number.isFinite(asNumber)) return String(minutes)
  return t("duration.hoursMinutes", {
    hours: Math.trunc(asNumber / 60),
    minutes: asNumber % 60,
  })
}

export function movieMatchesQuery(movie, rawQuery) {
  const q = rawQuery.trim().toLowerCase()
  if (!q) return false
  return [movie.title, movie.titleEn].some(
    (value) => value && String(value).toLowerCase().includes(q)
  )
}
