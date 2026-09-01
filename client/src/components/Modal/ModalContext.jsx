import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Trans, useTranslation } from "react-i18next"

import { deleteMovie as deleteMoviesFromApi } from "../../api"
import { deleteWatchedMovie as deleteWatchedMoviesFromApi } from "../../api"
import { addWatchedMovie as addWatchedMovieToApi } from "../../api"
import { addWatchedSeries as addWatchedSeriesToApi } from "../../api"

import { deleteMovie, addToWatchedMovies } from "../../utils/utils"

import {StyledButton} from "./Modal"

export const ModalContext = React.createContext()

export const ModalProvider = ({ children, movies, setMovies, watchedMovies, setWatchedMovies, series, setSeries,
  watchedSeries, setWatchedSeries }) => {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [modalTitle, setModalTitle] = useState(null)
    const [isModalClosing,  setIsModalClosing] = useState(false)
    const [modalButtons, setModalButtons] = useState(null)
    const userId = useSelector((state) => state.auth.user?._id);

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
            <p>{ movie.description ? movie.description : t("modals.noDescription") }</p> ,
          <StyledButton onClick={closeModal}>{t("modals.ok")}</StyledButton>
        )
      }
    
      const showViewedConfirmation = (movie, list, setList) => {
        openModal( t("modals.addToWatchedTitle"),
            <p>
              <Trans
                i18nKey="modals.addToWatchedBody"
                values={{ title: movie.title }}
                components={{ strong: <strong /> }}
              />
            </p>,
          <>
            <StyledButton onClick={() => confirmViewed (movie, list, setList)}>{t("modals.yes")}</StyledButton>
            <StyledButton onClick={() => showDeleteConfirmation(movie, list, setList)}>{t("modals.no")}</StyledButton>
          </>
        )
      }
      const showDeleteConfirmation = (movie, list, setList, isWatched=false) => {
        openModal(t("modals.deleteTitle"),
            <p>
              <Trans
                i18nKey="modals.deleteBody"
                values={{ title: movie.title }}
                components={{ strong: <strong /> }}
              />
            </p>,
          <>
            <StyledButton onClick={() => confirmDelete(movie, list, setList, isWatched)}>{t("modals.yes")}</StyledButton>
            <StyledButton onClick={closeModal}>{t("modals.no")}</StyledButton>
          </>
        )
      }
      const confirmViewed =  (movie, list, setList) => {
        addToWatchedMovies(movie, addWatchedSeriesToApi, addWatchedMovieToApi, setWatchedSeries, setWatchedMovies, userId)
        closeModal()
        showDeleteConfirmation(movie, list, setList)
      }
    
      const confirmDelete = async (movie, list, setList, isWatched) => {
        try{
          if(!isWatched){
            await deleteMovie(movie, list, setList, deleteMoviesFromApi, userId)
          }else{
            await deleteMovie(movie, list, setList, deleteWatchedMoviesFromApi, userId)
          }
         
         closeModal()
        }catch(error){
          console.error("Error deleting movie:", error)
        }
      }
    
      return (
        <ModalContext.Provider value={{ isModalClosing, isModalOpen,modalTitle, modalContent, modalButtons, openModal, closeModal,
         showDetails, showViewedConfirmation: (movie)=>showViewedConfirmation(movie, movies, setMovies),
         showSeriesViewedConfirmation: (movie)=>showViewedConfirmation(movie, series, setSeries),
          showWatchedDeleteConfirmation: (movie) => showDeleteConfirmation(movie, watchedMovies, setWatchedMovies, true), 
          showWatchedSeriesDeleteConfirmation: (movie) => showDeleteConfirmation(movie, watchedSeries, setWatchedSeries, true) }}>
          {children}
        </ModalContext.Provider>
      )
}