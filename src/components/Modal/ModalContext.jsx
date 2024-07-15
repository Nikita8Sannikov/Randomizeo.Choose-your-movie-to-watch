import React, { useState } from "react"
import  styles from "./Modal.module.css"
import Button from "../Button"
export const ModalContext = React.createContext()

export const ModalProvider = ({ children, addToWatchedMovies, removeMovie }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [modalTitle, setModalTitle] = useState(null)
    const [isModalClosing,  setIsModalClosing] = useState(false)


    const openModal = ( title, content) => {
        setModalContent(content)
        setIsModalOpen(true)
        setModalTitle(title)
      }

      const closeModal = () => {
        setIsModalOpen(false)
        setModalContent(null)
        setModalTitle(null)
        setIsModalClosing(true)
      }

      const showDetails = (movie) => {
        openModal( movie.title,
          <>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam alias, odit maiores reiciendis totam rem. Nemo repellendus voluptatibus commodi!</p>
            <div className={styles.modalFooter}>
          <Button onclick={closeModal}>Ок</Button>
          </div> 
          </>
        )
      }
    
      const showViewedConfirmation = (movie) => {
        openModal( 'Добавить в просмотренные?',
          <>
            <p>Вы добавляете: <strong>{movie.title}</strong> в просмотренные</p>
            <div className={styles.modalFooter}>
            <Button onclick={() => confirmViewed(movie)}>Да</Button>
            <Button onclick={showDeleteConfirmation}>Нет</Button>
            </div>
          </>
        )
      }
      const showDeleteConfirmation = (movie) => {
        openModal('Удалить фильм?',
          <>
            <p>Вы удаляете: <strong>{movie.title}</strong> из текущего списка</p>
            <div className={styles.modalFooter}>
            <Button onclick={() => confirmDelete(movie)}>Да</Button>
            <Button onclick={closeModal}>Нет</Button>
            </div>
          </>
        );
      };
      const confirmViewed = (movie) => {
        addToWatchedMovies(movie)
        closeModal()
        showDeleteConfirmation(movie)
      }
    
      const confirmDelete = (movie) => {
        removeMovie(movie);
        closeModal();
      };
    

      return (
        <ModalContext.Provider value={{ isModalClosing, isModalOpen,modalTitle, modalContent, openModal, closeModal, showDetails, showViewedConfirmation, showDeleteConfirmation }}>
          {children}
        </ModalContext.Provider>
      )
}