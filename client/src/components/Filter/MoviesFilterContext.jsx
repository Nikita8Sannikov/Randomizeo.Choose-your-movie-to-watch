import React, { useState } from "react"
export const MoviesFilterContext = React.createContext()

export const MoviesFilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <MoviesFilterContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </MoviesFilterContext.Provider>
  )
}
