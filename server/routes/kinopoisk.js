import { Router } from "express";
import finalConfig from "../config/index.js";

const router = Router();

/**
 * Генерирует варианты запроса для лучшего совпадения:
 * "лалаленд" → ["лалаленд", "ла ла ленд"]
 * "гаррипоттер" → ["гаррипоттер"] (без изменений)
 */
function getSearchVariants(query) {
  const trimmed = query.trim().toLowerCase();
  const variants = new Set([trimmed]);

  // Повторяющийся слог 2 символа в начале: "лалаленд" → "ла ла ленд"
  const repeatMatch = trimmed.match(/^(.{2})\1(.+)$/);
  if (repeatMatch) {
    variants.add(`${repeatMatch[1]} ${repeatMatch[1]} ${repeatMatch[2]}`);
  }

  // Вариант с дефисами для "ла ла ленд" → "ла-ла-ленд"
  if (trimmed.includes(" ")) {
    variants.add(trimmed.replace(/\s+/g, "-"));
  }

  return [...variants];
}

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const apiUrl = finalConfig.kinopoiskApiUrl;
  if (!apiUrl) {
    return res.status(500).json({
      error: "KINOPOISK_API_URL не задан в .env сервера (используется как в updateNewFields.js)",
    });
  }

  try {
    const variants = getSearchVariants(query);

    const fetchOne = async (q) => {
      const urlWithParams = `${apiUrl}?query=${encodeURIComponent(q)}`;
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": finalConfig.kinopoiskApiKey,
        },
      });
      if (!response.ok) throw new Error(`Kinopoisk API error: ${response.status}`);
      const data = await response.json();
      return data.docs || [];
    };

    const resultsArrays = await Promise.all(variants.map(fetchOne));
    const seen = new Set();
    const merged = [];
    for (const arr of resultsArrays) {
      for (const doc of arr) {
        if (doc.id && !seen.has(doc.id)) {
          seen.add(doc.id);
          merged.push(doc);
        }
      }
    }
    res.json(merged);
  } catch (error) {
    console.error("Kinopoisk search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  try {
    const response = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": finalConfig.kinopoiskApiKey,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Kinopoisk API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Kinopoisk proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

