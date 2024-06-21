import Input from "./Input"
import Button from "./Button"

export default function Header () {
    return(
      <>
      <div className="add-film">
        <form>
            <Input description="Введите название фильма"
             placeholder="название"
              labelFor="text1"
               id="text1"/>
            <Input description="Введите URL обложки"
             placeholder="URL"
              labelFor="text2"
               id="text2"/>
          
  
          
          <Button className="add-button">Добавить</Button>
         
          <div className="search-area">
          <Input 
             placeholder="Введи название"
              labelFor="text"
              className="search" />

            <ul id="filter-results">
  
            </ul>
          </div>
        </form>
      </div>
  
      <div className="result">
      
      <Button className="add-button">Что смотрим сегодня?</Button>
        <div className="output">#</div>
        <div className="res" id="result"></div>
      </div>
      </>
    )
  }