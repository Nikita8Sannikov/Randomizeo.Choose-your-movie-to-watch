import React, { useContext } from "react"
import { ModalContext } from './Modal/ModalContext'
import Button from "./Button"

export default function Card({movie}) {
  const { showDetails, showViewedConfirmation } = useContext(ModalContext)

    return(
        <div className="card" >
        <img src={movie.img} alt={movie.title} />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">описание</p>
          <div className="btns">
            <Button
              href="#"
              className="btn btn-primary"
              data-btn="description"
              data-id={movie.id}
              onclick={() => showDetails(movie)}
            >
              Описание
            </Button>
            <Button
              href="#"
              className="btn btn-danger"
              data-btn="viewed"
              data-id={movie.id}
              onclick={() => showViewedConfirmation(movie)}
            >
              Просмотрено
            </Button>
          </div>
        </div>
      </div>
    )
}