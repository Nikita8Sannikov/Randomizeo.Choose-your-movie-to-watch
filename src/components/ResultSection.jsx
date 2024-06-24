import React from "react"
import Button from "./Button"

export default function ResultSection() {
    return(
        <div className="result">
        <Button className="button">Что смотрим сегодня?</Button>
        <div className="output">#</div>
        <div className="res" id="result">
       
        </div>
      </div>
    )
}