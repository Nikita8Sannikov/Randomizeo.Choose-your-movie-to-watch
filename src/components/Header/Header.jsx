import React from 'react'
import TabsSection from './TabsSection'
import Input from '../Input'
import  styles from "./Header.module.css"

const Header = ({active, onChange, searchFilm, setSearchFilm}) => {
// const [tab, setTab] = useState('main')
const searchFilmChange = (event) => setSearchFilm(event.target.value) 
  return (
    <div className={styles.header}>
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
    </div>

    {/* <div className="search-area">
      <input type="text" className="search" placeholder="Найти фильм" />
      <i className="fa-solid fa-magnifying-glass fa-2xl fa-flip  search-icon" style="--fa-animation-duration: 3s;"></i>
    </div> */}
    </div>
  )
}

export default Header