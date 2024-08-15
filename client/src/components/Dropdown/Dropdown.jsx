import React, { useState, useRef, useEffect } from "react"
import Button from "../Button"
import styles from "./Dropdown.module.css"

const Dropdown = ({ options, onSelect, label, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  // const dropdownRef = useRef(null)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  // Закрываем дропдаун, если кликнули вне его
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [])

  const handleMouseEnter = () => {
    setIsOpen(true)
  }
  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div
      className={styles.dropdown}
      // ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.dropdownLabel}>
        <Button className={className}>{label}</Button>
        <span className="fa-solid fa-square-caret-down"></span>
      </div>
      {isOpen && (
        <ul
          className={styles.dropdownMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
