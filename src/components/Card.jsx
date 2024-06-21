import React from "react"

export default function Card({movie}) {
    return(
        <div className="card" key={movie.title}>
        <img src={movie.img} alt={movie.title} />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">описание</p>
          <div className="btns">
            <button
              href="#"
              className="btn btn-primary"
              data-btn="description"
              data-id={movie.id}
            >
              Описание
            </button>
            <button
              href="#"
              className="btn btn-danger"
              data-btn="viewed"
              data-id={movie.id}
            >
              Просмотрено
            </button>
          </div>
        </div>
      </div>
    )
}