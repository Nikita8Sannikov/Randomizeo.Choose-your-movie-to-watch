// src/api.js

export const addMovie = async (movie) => {
  try {
    const response = await fetch("/api/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding movie:", error)
    throw error
  }
}

export const getMovies = async () => {
  try {
    const response = await fetch("/api/movies", {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      },
    })

    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting movies:", error)
    throw error
  }
}

export const getWatchedMovies = async () => {
  try {
    const response = await fetch("/api/movies/watched")
    return await response.json()
  } catch (error) {
    console.error("Error getting watched movies:", error)
    throw error
  }
}

export const updateMovie = async (id, watched) => {
  try {
    const response = await fetch(`/api/movies/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watched }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error updating movie:", error)
    throw error
  }
}

export const deleteMovie = async (id) => {
  try {
    const response = await fetch(`/api/movies/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting movie:", error)
    throw error
  }
}
