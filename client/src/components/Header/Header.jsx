import React from "react"
import TabsSection from "./TabsSection"
import Input from "../Input"
import styles from "./Header.module.css"
import Button from "../Button"
import { useNavigate } from "react-router-dom"

const Header = ({ searchFilm, setSearchFilm }) => {
  const searchFilmChange = (event) => setSearchFilm(event.target.value)
  const navigate = useNavigate()

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
          value={searchFilm}
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
