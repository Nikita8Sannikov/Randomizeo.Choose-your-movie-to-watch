/**
 * Base URL for API requests.
 * Production: empty string so fetches stay same-origin (`/api/...` via Vercel proxy).
 * Dev: VITE_SERVER_API_URL (or empty if unset).
 *
 * @example
 * fetch(`${SERVER_API_URL}/api/auth/me`, { credentials: "include" })
 */
export const SERVER_API_URL = import.meta.env.PROD
  ? ""
  : import.meta.env.VITE_SERVER_API_URL || "";
