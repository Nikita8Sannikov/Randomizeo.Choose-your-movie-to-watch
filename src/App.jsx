import { useState } from "react"

function Header () {
  return(
    <>
    <div className="add-film">
      <form>
        <label htmlFor="text1">Введите название фильма</label>
        <input type="text" id="text1" placeholder="название" />

        <label htmlFor="text2">Введите URL обложки</label>
        <input type="text"  id="text2" placeholder="URL"/>
        <button className="add-button">Добавить</button>
        <div className="search-area">
          <label htmlFor="text"></label>
          <input type="text" className="search" placeholder="Введи название"/>
          <ul id="filter-results">

          </ul>
        </div>
      </form>
    </div>

    <div className="result">
      <button className="button">Что смотрим сегодня?</button>
      <div className="output">#</div>
      <div className="res" id="result"></div>
    </div>
    </>
  )
}

function App() {
  return (
   
    <div>
       <Header/>
     <div className="film-container" id = "films"></div>
    </div>
  )
}

export default App
