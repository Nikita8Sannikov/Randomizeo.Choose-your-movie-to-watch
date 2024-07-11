import React, { useContext } from "react"
import { ModalContext } from './ModalContext'
import Button from "./Button"


export default function Card({title, id, img }) {
  const { openModal } = useContext(ModalContext)

  const showDetails = () => {
    openModal( title,
      <div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam alias, odit maiores reiciendis totam rem. Nemo repellendus voluptatibus commodi!</p>
      </div>
    )
  }

    return(
        <div className="card" >
        <img src={img} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">описание</p>
          <div className="btns">
            <Button
              href="#"
              className="btn btn-primary"
              data-btn="description"
              data-id={id}
              onclick={showDetails}
            >
              Описание
            </Button>
            <Button
              href="#"
              className="btn btn-danger"
              data-btn="viewed"
              data-id={id}
            >
              Просмотрено
            </Button>
          </div>
        </div>
      </div>
    )
}