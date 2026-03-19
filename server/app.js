import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import movieRoutes from "./routes/movie.js";
import watchedMovieRoutes from "./routes/watchedMovies.js";
import seriesRoutes from "./routes/series.js";
import watchedSeriesRoutes from "./routes/watchedSeries.js";
import authRoutes from "./routes/auth.js";
import kinopoiskRoutes from "./routes/kinopoisk.js";
import { authMiddleware } from "./middleware/auth.js";
import finalConfig from "./config/index.js";

const app = express();

// Разрешаем запросы с других доменов (CORS)
// В проде (деплой на Vercel) разрешаем только нужные домены фронтенда,
// в разработке (локально) упрощаем CORS и разрешаем все origin.
if (process.env.NODE_ENV === "production") {
  const allowedOrigins = [
    "https://randomizeo-choose-your-movie-to-watch.vercel.app",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  ); // Включает CORS для всех запросов
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

// Мидлвары для обработки тела запросов и cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Миддлвар для обработки URL-кодированных запросов
app.use(cookieParser()); //Мидлвар cookie-parser разбирает cookies и делает их доступными через req.cookies

// Использование роутов для обработки запросов по пути /api/movies (с проверкой JWT)
app.use("/api/movies", authMiddleware, movieRoutes);
// Использование роутов для обработки запросов по пути /api/watched-movies
app.use("/api/watched-movies", authMiddleware, watchedMovieRoutes);
// Использование роутов для обработки запросов по пути /api/movies/series
app.use("/api/movies/series", authMiddleware, seriesRoutes);
// Использование роутов для обработки запросов по пути /api/watched-movies/series
app.use("/api/watched-movies/series", authMiddleware, watchedSeriesRoutes);
// Использование роутов для обработки запросов по пути /api/auth
app.use("/api/auth", authRoutes);
// Прокси-роуты к неофициальной Kinopoisk API
app.use("/api/kinopoisk", kinopoiskRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(finalConfig.mongoUri, {});
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Config:", finalConfig);
    console.log("Connected to MongoDB!");
    console.log("process.env.PORT:", process.env.PORT);
    console.log("finalConfig.port:", finalConfig.port);
    console.log("Using PORT:", PORT);

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

