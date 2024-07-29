import React, { useState } from "react"
export const WatchedFilterContext = React.createContext()

export const WatchedFilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <WatchedFilterContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </WatchedFilterContext.Provider>
  )
}
