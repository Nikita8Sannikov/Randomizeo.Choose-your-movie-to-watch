import jwt from "jsonwebtoken";
import finalConfig from "../config/index.js";

const jwtSecret = finalConfig.jwtSecret;

/**
 * Middleware проверяет JWT из cookie auth_token и устанавливает req.userId.
 * Возвращает 401, если токен отсутствует или невалиден.
 */
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(401).json({ message: "Authentication required" });
  }
};
