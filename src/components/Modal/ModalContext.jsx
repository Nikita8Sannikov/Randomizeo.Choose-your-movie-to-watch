import React, { useState } from "react"

export const ModalContext = React.createContext()

export const ModalProvider = ({ children }) => {
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

      return (
        <ModalContext.Provider value={{ isModalClosing, isModalOpen,modalTitle, modalContent, openModal, closeModal }}>
          {children}
        </ModalContext.Provider>
      )
}