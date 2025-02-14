import { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import TabsSection from "./TabsSection"
import LogoutSection from "./LogoutSection"
import Input from "../Input"
import Button from "../Button"

import { MoviesFilterContext } from "../Filter/MoviesFilterContext"
import { WatchedFilterContext } from "../Filter/WatchedFilterContext"

import styles from "./Header.module.css"

const Header = () => {

  const searchFilmChange = (event) => setSearchTerm(event.target.value)
  const navigate = useNavigate()
  const location = useLocation()

  const isWatchedPage = location.pathname === "/watched" || location.pathname === "/watched/series"

  const { searchTerm, setSearchTerm } = useContext(
    isWatchedPage ? WatchedFilterContext : MoviesFilterContext
  )

  return (
    <nav className={styles.header}>
      <div className={styles.logoSection}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src="/svg/logo.svg" alt="logo" />
        </div>

        <div className={styles.siteName} onClick={() => navigate("/")}>
          <h1>Randomizeo</h1>
        </div>

        <TabsSection />
      </div>
      <div className={styles.searchArea}>
        <Input
          placeholder="Найти фильм"
          labelFor="text"
          value={searchTerm}
          onChange={searchFilmChange}
        />
        <Button className={styles.searchIcon}>
          <span className="fa-solid fa-magnifying-glass fa-2xl fa-flip  search-icon"></span>
        </Button>
      <LogoutSection/>
      </div>
    </nav>
  )
}

export default Header
