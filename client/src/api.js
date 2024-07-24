// фильмы с главной
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting movies:", error)
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting movie:", error)
    throw error
  }
}

// фильмы со страницы просмотренных
export const getWatchedMovies = async () => {
  try {
    const response = await fetch("/api/watched-movies",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error getting watched movies:", error)
    throw error
  }
}

export const addWatchedMovie = async (movie) => {
  try {
    const response = await fetch("/api/watched-movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
    return await response.json()
  } catch (error) {
    console.error("Error adding watched movie:", error)
    throw error
  }
}

export const deleteWatchedMovie = async (id) => {
  try {
    const response = await fetch(`/api/watched-movies/delete/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error deleting watched movie:", error)
    throw error
  }
}
