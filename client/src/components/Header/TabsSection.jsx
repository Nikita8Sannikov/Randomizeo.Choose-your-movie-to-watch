import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Dropdown from "../Dropdown/Dropdown"
import styles from "./Header.module.css"

const NAV_ROUTES = {
  movies: "/",
  series: "/series",
  watchedMovies: "/watched",
  watchedSeries: "/watched/series",
}

const TabsSection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const options = [
    { value: "movies", label: t("nav.movies") },
    { value: "series", label: t("nav.series") },
  ]
  const watchedOptions = [
    { value: "watchedMovies", label: t("nav.watchedMovies") },
    { value: "watchedSeries", label: t("nav.watchedSeries") },
  ]

  const handleSelect = (option) => {
    const path = NAV_ROUTES[option.value]
    if (path) navigate(path)
  }

  return (
    <section className={styles.navigationSection}>
      <div className={styles.buttonSection}>
        <Dropdown
          className={styles.navButton}
          label={t("nav.watch")}
          options={options}
          onSelect={handleSelect}
        />
      </div>
      <div className={styles.buttonSection}>
        <Dropdown
          className={styles.navButton}
          label={t("nav.watched")}
          options={watchedOptions}
          onSelect={handleSelect}
        />
      </div>
    </section>
  )
}

export default TabsSection
