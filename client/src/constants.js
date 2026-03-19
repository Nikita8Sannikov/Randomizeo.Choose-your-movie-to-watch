/**
 * URL заглушки для отсутствующего постера фильма.
 * Используется в KinopoiskSearch, Card и useFilmData.
 */
export const PLACEHOLDER_POSTER_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"><rect width="300" height="450" fill="#1e293b"/><text x="150" y="225" text-anchor="middle" fill="#94a3b8" font-size="16" font-family="sans-serif">Нет постера</text></svg>'
  );
