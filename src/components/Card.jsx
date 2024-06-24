import React from "react"

export default function Card({title, id, img }) {
    return(
        <div className="card" >
        <img src={img} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">описание</p>
          <div className="btns">
            <button
              href="#"
              className="btn btn-primary"
              data-btn="description"
              data-id={id}
            >
              Описание
            </button>
            <button
              href="#"
              className="btn btn-danger"
              data-btn="viewed"
              data-id={id}
            >
              Просмотрено
            </button>
          </div>
        </div>
      </div>
    )
}