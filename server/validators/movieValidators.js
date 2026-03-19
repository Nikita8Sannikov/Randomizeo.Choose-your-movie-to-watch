import { body, validationResult } from "express-validator";

/**
 * Валидация полей фильма/сериала при добавлении в список
 */
export const addMovieOrSeriesValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 500 })
    .withMessage("Title must be at most 500 characters"),
  body("img")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isLength({ max: 2000 })
    .withMessage("Image URL must be at most 2000 characters"),
  body("shortDescription")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Short description must be at most 500 characters"),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 10000 })
    .withMessage("Description must be at most 10000 characters"),
  body("year")
    .optional({ values: "falsy" })
    .trim()
    .isInt({ min: 1800, max: 2100 })
    .withMessage("Year must be between 1800 and 2100")
    .toInt(),
  body("genres")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Genres must be at most 500 characters"),
  body("rating")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 20 })
    .withMessage("Rating must be at most 20 characters"),
  body("movieLength")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Movie length must be at most 50 characters"),
  body("kinopoiskId")
    .notEmpty()
    .withMessage("Kinopoisk ID is required")
    .isInt({ min: 1 })
    .withMessage("Kinopoisk ID must be a positive number")
    .toInt(),
  body("isSeries")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("isSeries must be a boolean")
    .toBoolean(),
];

/**
 * Валидация при добавлении в просмотренные (только kinopoiskId)
 */
export const addToWatchedValidation = [
  body("kinopoiskId")
    .notEmpty()
    .withMessage("Kinopoisk ID is required")
    .isInt({ min: 1 })
    .withMessage("Kinopoisk ID must be a positive number")
    .toInt(),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Invalid request data",
    });
  }
  next();
};
