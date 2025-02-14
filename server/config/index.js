import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import config from "config";

// Загружаем переменные окружения
dotenv.config();

// Читаем JSON-конфиг
const defaultsPath = path.resolve("config/default.json");
const defaults = JSON.parse(fs.readFileSync(defaultsPath, "utf8"));

// Объединяем конфиги
const finalConfig = {
    port: config.get("port") || defaults.port,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
};

export default finalConfig;