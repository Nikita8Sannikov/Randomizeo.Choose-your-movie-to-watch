import React, { useContext } from 'react'
import { ModalContext } from './ModalContext'
import "./modal.css"

const Modal = () => {
  const{isModalOpen, modalContent, modalTitle, closeModal} = useContext(ModalContext)

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window" >
        <div className="modal-header">
          <span className="modal-title"> {modalTitle}</span>
         <span className="modal-close" onClick={closeModal} >&times;</span>
        </div>
        <div className="modal-body" >
          {modalContent}
        </div>
      </div>
    </div>
  )
}

export default Modal