import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from './ModalContext'
import  styles from "./Modal.module.css"

const Modal = () => {
  const{isModalOpen, isModalClosing, modalContent, modalTitle, closeModal} = useContext(ModalContext)
  const [modalClass, setModalClass] = useState(styles.modal)
  useEffect(() => {
    let timeoutId
    if(isModalOpen) {
      setModalClass(`${styles.modal} ${styles.open}`)
    } else if(isModalClosing){
      setModalClass(`${styles.modal} ${styles.hide}`)
      timeoutId = setTimeout(() => {
        setModalClass(styles.modal)
      }, 200)
    }
    return () => clearTimeout(timeoutId)
  }, [isModalOpen, isModalClosing])

  if (!isModalOpen && !isModalClosing) return null;

  return (
    <div className={modalClass}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalWindow}>
          <div className={styles.modalHeader}>
            <span className={styles.modalTitle}> {modalTitle}</span>
          <span className={styles.modalClose} onClick={closeModal} >&times;</span>
          </div>
         <div className={styles.modalBody} >
            {modalContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal