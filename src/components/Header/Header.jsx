import React from 'react'
import TabsSection from './TabsSection'
import Input from '../Input'
import  styles from "./Header.module.css"
import Button from '../Button'

const Header = ({active, onChange, searchFilm, setSearchFilm}) => {
// const [tab, setTab] = useState('main')
const searchFilmChange = (event) => setSearchFilm(event.target.value) 
  return (
    <nav className={styles.header}>
    <div className={styles.logoSection}>
      <div className={styles.logo}>
        <img src="../../svg/logo.svg" alt="logo"/>
      </div>

      <div className={styles.siteName}>
        <h1>Randomizeo</h1>
      </div>

    <TabsSection  active={active} onChange={onChange}/>
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

    {/* <div className="search-area">
      <input type="text" className="search" placeholder="Найти фильм" />
      <i className="fa-solid fa-magnifying-glass fa-2xl fa-flip  search-icon" style="--fa-animation-duration: 3s;"></i>
    </div> */}
    </nav>
  )
}

export default Header