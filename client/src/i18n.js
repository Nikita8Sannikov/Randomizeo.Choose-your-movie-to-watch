import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import ru from "./locales/ru.json"
import en from "./locales/en.json"

const STORAGE_KEY = "i18nLng"

const savedLng = localStorage.getItem(STORAGE_KEY)
const initialLng = savedLng === "en" || savedLng === "ru" ? savedLng : "ru"

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: initialLng,
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
})

const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng
}

syncHtmlLang(i18n.language)

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
  syncHtmlLang(lng)
})

export default i18n
