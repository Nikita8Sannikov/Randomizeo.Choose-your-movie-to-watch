import { Router } from "express";
import finalConfig from "../config/index.js";

const router = Router();

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

