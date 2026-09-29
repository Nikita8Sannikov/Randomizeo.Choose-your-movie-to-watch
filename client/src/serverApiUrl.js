/**
 * Base URL for API requests.
 * Empty in both dev and production so fetches stay same-origin (`/api/...`).
 * Dev is proxied by Vite, production by the Vercel rewrite.
 *
 * @example
 * fetch(`${SERVER_API_URL}/api/auth/me`, { credentials: "include" })
 */
export const SERVER_API_URL = "";
