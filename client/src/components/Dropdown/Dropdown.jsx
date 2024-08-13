import React, { useState, useRef, useEffect } from "react"
import Button from "../Button"
import styles from "./Dropdown.module.css"

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  // Закрываем дропдаун, если кликнули вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Button className={styles.dropdownToggle} onclick={toggleDropdown}>
        {/* {selectedOption || 'Select an option'} */}
        <span className="fa-solid fa-square-caret-down"></span>
      </Button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
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
