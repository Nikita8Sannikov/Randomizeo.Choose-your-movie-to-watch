import React from "react"
import TabsSection from "./TabsSection"
import Input from "../Input"
import styles from "./Header.module.css"
import Button from "../Button"
import { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { MoviesFilterContext } from "../Filter/MoviesFilterContext"
import { WatchedFilterContext } from "../Filter/WatchedFilterContext"

const Header = () => {

  const searchFilmChange = (event) => setSearchTerm(event.target.value)
  const navigate = useNavigate()
  const location = useLocation()

  const isWatchedPage = location.pathname === "/watched"

  const { searchTerm, setSearchTerm } = useContext(
    isWatchedPage ? WatchedFilterContext : MoviesFilterContext
  )

  return (
    <nav className={styles.header}>
      <div className={styles.logoSection}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src="../../svg/logo.svg" alt="logo" />
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
          className="search"
          value={searchTerm}
          onChange={searchFilmChange}
        />
        <Button className={styles.searchIcon}>
          <span className="fa-solid fa-magnifying-glass fa-2xl fa-flip  search-icon"></span>
        </Button>
      </div>
    </nav>
  )
}

export default Header
