import React, { useState } from "react"
import {StyledButton} from "./Modal"
export const ModalContext = React.createContext()

export const ModalProvider = ({ children, addToWatchedMovies, movies, setMovies, watchedMovies, setWatchedMovies, deleteMovie, deleteWatchedMovie }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [modalTitle, setModalTitle] = useState(null)
    const [isModalClosing,  setIsModalClosing] = useState(false)
    const [modalButtons, setModalButtons] = useState(null)

    const openModal = ( title, content, buttons) => {
        setModalContent(content)
        setModalButtons(buttons)
        setIsModalOpen(true)
        setModalTitle(title)
      }

      const closeModal = () => {
        setIsModalOpen(false)
        setModalContent(null)
        setModalButtons(null)
        setModalTitle(null)
        setIsModalClosing(true)
      }

      const showDetails = (movie) => {
        openModal( movie.title,
            <p>{ movie.description }</p> ,
          <StyledButton onClick={closeModal}>Ок</StyledButton>
        )
      }
    
      const showViewedConfirmation = (movie, list, setList) => {
        openModal( 'Добавить в просмотренные?',
            <p>Вы добавляете: <strong>{movie.title}</strong> в просмотренные</p>,
          <>
            <StyledButton onClick={() => confirmViewed (movie, list, setList)}>Да</StyledButton>
            <StyledButton onClick={() => showDeleteConfirmation(movie, list, setList)}>Нет</StyledButton>
          </>
        )
      }
      const showDeleteConfirmation = (movie, list, setList, isWatched=false) => {
        openModal('Удалить фильм?',
            <p>Вы удаляете: <strong>{movie.title}</strong> из текущего списка</p>,
          <>
            <StyledButton onClick={() => confirmDelete(movie, list, setList, isWatched)}>Да</StyledButton>
            <StyledButton onClick={closeModal}>Нет</StyledButton>
          </>
        )
      }
      const confirmViewed =  (movie, list, setList) => {
        addToWatchedMovies(movie)
        closeModal()
        showDeleteConfirmation(movie, list, setList)
      }
    
      const confirmDelete = async (movie, list, setList, isWatched) => {
        try{
          if(!isWatched){
            await deleteMovie(movie, list, setList)
          }else{
            await deleteWatchedMovie(movie, list, setList)
          }
         
        //  removeMovieFromList(movie, list, setList)
         closeModal()
        }catch(error){
          console.error("Error deleting movie:", error)
        }
      }
    

      return (
        <ModalContext.Provider value={{ isModalClosing, isModalOpen,modalTitle, modalContent, modalButtons, openModal, closeModal,
         showDetails, showViewedConfirmation: (movie)=>showViewedConfirmation(movie, movies, setMovies),
          showDeleteConfirmation,
          showWatchedDeleteConfirmation: (movie) => showDeleteConfirmation(movie, watchedMovies, setWatchedMovies, true) }}>
          {children}
        </ModalContext.Provider>
      )
}