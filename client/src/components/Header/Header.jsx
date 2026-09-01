import { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import BurgerModal from "../BurgerModal/BurgerModal"
import TabsSection from "./TabsSection"
import LogoutSection from "./LogoutSection"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import Input from "../Input"
import Button from "../Button"

import { MoviesFilterContext } from "../Filter/MoviesFilterContext"
import { WatchedFilterContext } from "../Filter/WatchedFilterContext"

import styles from "./Header.module.css"

const Header = () => {
  const { t } = useTranslation()
  const [openBurgerModal, setOpenBurgerModal] = useState(false)
  const [searchShow, setSearchShow] = useState(false)
  
  const toggleBurgerModal = () => setOpenBurgerModal((prev) => !prev)
  const closeBurgerModal = () => setOpenBurgerModal(false)

  const searchFilmChange = (event) => setSearchTerm(event.target.value)
  const navigate = useNavigate()
  const location = useLocation()

  const isWatchedPage = location.pathname === "/watched" || location.pathname === "/watched/series"

  const { searchTerm, setSearchTerm } = useContext(
    isWatchedPage ? WatchedFilterContext : MoviesFilterContext
  )

  const handleSearchIconClick = () => {
    if (window.innerWidth <= 768) {
      setSearchShow((prev) => !prev);
    }
  };

  return (
    <>
    <nav className={styles.header}>
      <div className={styles.logoSection}>
      <Button
          className={styles.burger}
          onclick={() => toggleBurgerModal()}
        >
          <span className="fa-solid fa-bars fa-2x bars-icon"></span>
        </Button>
        

        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src="/svg/logo.svg" alt={t("header.logoAlt")} />
        </div>

        <div className={styles.siteName} onClick={() => navigate("/")}>
          <h1>Randomizeo</h1>
        </div>

        <TabsSection />
      </div>
      <div className={styles.searchArea}>
        <Input
          placeholder={t("header.searchPlaceholder")}
          labelFor="text"
          value={searchTerm}
          onChange={searchFilmChange}
        />
        <Button className={styles.searchIcon} onclick={handleSearchIconClick}>
          <span className="fa-solid fa-magnifying-glass fa-2xl fa-flip  search-icon"></span>
        </Button>
      <LanguageSwitcher />
      <LogoutSection/>
      </div>
    </nav>
    { searchShow &&
    <div className={styles.searchAreaMobile}>
        <Input
          placeholder={t("header.searchPlaceholder")}
          labelFor="text"
          value={searchTerm}
          onChange={searchFilmChange}
        />
      </div>
}
    { <BurgerModal isOpen={openBurgerModal} onClose={closeBurgerModal}/> }
    </>
  )
}

export default Header
