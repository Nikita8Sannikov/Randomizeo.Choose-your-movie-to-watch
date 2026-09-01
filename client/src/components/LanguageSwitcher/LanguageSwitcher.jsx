import { useTranslation } from "react-i18next"

import styles from "./LanguageSwitcher.module.css"

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage || i18n.language

  return (
    <div className={`${styles.switcher} ${className}`.trim()} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.button} ${current.startsWith("ru") ? styles.active : ""}`}
        onClick={() => i18n.changeLanguage("ru")}
      >
        {t("language.ru")}
      </button>
      <span className={styles.divider}>|</span>
      <button
        type="button"
        className={`${styles.button} ${current.startsWith("en") ? styles.active : ""}`}
        onClick={() => i18n.changeLanguage("en")}
      >
        {t("language.en")}
      </button>
    </div>
  )
}

export default LanguageSwitcher
