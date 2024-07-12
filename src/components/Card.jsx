import React, { useContext } from "react"
import { ModalContext } from './ModalContext'
import Button from "./Button"


export default function Card({movie, addToWatchedMovies, removeMovie }) {
  const { openModal, closeModal } = useContext(ModalContext)

  const showDetails = () => {
    openModal( movie.title,
      <>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam alias, odit maiores reiciendis totam rem. Nemo repellendus voluptatibus commodi!</p>
      <Button onclick={closeModal}>Ок</Button>
      </>
    )
  }

  const showViewedConfirmation = () => {
    openModal( 'Добавить в просмотренные?',
      <>
        <p>Вы добавляете: <strong>{movie.title}</strong> в просмотренные</p>
        <Button onclick={confirmViewed}>Да</Button>
        <Button onclick={showDeleteConfirmation}>Нет</Button>
      </>
    )
  }
  const showDeleteConfirmation = () => {
    openModal('Удалить фильм?',
      <>
        <p>Вы удаляете: <strong>{movie.title}</strong> из текущего списка</p>
        <Button onclick={confirmDelete}>Да</Button>
        <Button onclick={closeModal}>Нет</Button>
      </>
    );
  };
  const confirmViewed = () => {
    addToWatchedMovies(movie)
    closeModal()
    showDeleteConfirmation()
  }

  const confirmDelete = () => {
    removeMovie(movie);
    closeModal();
  };


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
              onclick={showDetails}
            >
              Описание
            </Button>
            <Button
              href="#"
              className="btn btn-danger"
              data-btn="viewed"
              data-id={movie.id}
              onclick={showViewedConfirmation}
            >
              Просмотрено
            </Button>
          </div>
        </div>
      </div>
    )
}