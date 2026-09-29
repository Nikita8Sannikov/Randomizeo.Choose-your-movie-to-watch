import { Router } from "express";
import finalConfig from "../config/index.js";
import { fetchTmdbDetails, mapSearchResult, tmdbFetch } from "../utils/tmdbClient.js";

const router = Router();

router.get("/search", async (req, res) => {
  const query = typeof req.query.query === "string" ? req.query.query.trim() : "";
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const language = req.query.language === "en-US" ? "en-US" : "ru-RU";

  try {
    const data = await tmdbFetch(finalConfig.tmdbAccessToken, "/search/multi", {
      query,
      language,
      include_adult: "false",
    });
    const results = Array.isArray(data.results)
      ? data.results
          .filter((item) => item && (item.media_type === "movie" || item.media_type === "tv"))
          .map(mapSearchResult)
      : [];
    res.json(results);
  } catch (error) {
    console.error("TMDB search error:", error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
});

router.get("/details/:type/:id", async (req, res) => {
  const mediaType = req.params.type === "tv" ? "tv" : "movie";
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid TMDB ID format" });
  }

  try {
    const details = await fetchTmdbDetails(finalConfig.tmdbAccessToken, mediaType, id);
    res.json(details);
  } catch (error) {
    console.error("TMDB details error:", error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
});

export default router;
