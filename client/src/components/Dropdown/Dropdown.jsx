import React, { useState } from "react"
import Button from "../Button"
import styles from "./Dropdown.module.css"

const Dropdown = ({ options, onSelect, label, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (option) => {
    setIsOpen(false)
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleMouseEnter = () => {
    setIsOpen(true)
  }
  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const getOptionLabel = (option) =>
    option && typeof option === "object" ? option.label : option

  const getOptionKey = (option, index) =>
    option && typeof option === "object" && option.value != null
      ? option.value
      : index

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.dropdownLabel}>
        <Button className={className}>{label}</Button>
      </div>
      {isOpen && (
        <ul
          className={styles.dropdownMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((option, index) => (
            <li
              key={getOptionKey(option, index)}
              onClick={() => handleOptionClick(option)}
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
