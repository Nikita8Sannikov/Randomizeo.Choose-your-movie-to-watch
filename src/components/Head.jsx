import React from 'react'
import TabsSection from './TabsSection'
import Input from './Input'
import { useState } from 'react'

const Head = ({active, onChange}) => {
// const [tab, setTab] = useState('main')
const [searchFilm, setSearchFilm] = useState("")
const searchFilmChange = (event) => setSearchFilm(event.target.value) 
  return (
    <>
    <div className="logo-section">
      <div className="logo">
        <img src="../../svg/logo.svg" alt="logo"/>
      </div>

      <div className="site-name">
        <h1>Randomizeo</h1>
      </div>

    <TabsSection  active={active} onChange={onChange}/>
  </div>

  <div className="search-area">
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
    </>
  )
}

export default Head