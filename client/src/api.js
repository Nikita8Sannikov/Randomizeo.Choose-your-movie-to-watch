// фильмы с главной
export const addMovie = async (movie, userId) => {
  try {
    const response = await fetch(`/api/movies/add?userId=${userId}`, {
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

export const getMovies = async (userId) => {
  try {
    const response = await fetch(`/api/movies?userId=${userId}`, {
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

export const deleteMovie = async (_id, userId) => {
  try {
    console.log('id from api:', _id);
    
    const response = await fetch(`/api/movies/delete/${_id}?userId=${userId}`, {
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
export const getWatchedMovies = async (userId) => {
  try {
    const response = await fetch(`/api/watched-movies?userId=${userId}`,{
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

export const addWatchedMovie = async (movie, userId) => {
  try {
    const response = await fetch(`/api/watched-movies/add?userId=${userId}`, {
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
    console.error("Error adding watched movie:", error)
    throw error
  }
}

export const deleteWatchedMovie = async (_id, userId) => {
  try {
    console.log('id watched from api:', _id);
    const response = await fetch(`/api/watched-movies/delete/${_id}?userId=${userId}`, {
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

// Добавляем функции для сериалов
export const addSeries = async (movie, userId) => {
  try {
    const response = await fetch(`/api/movies/series/add?userId=${userId}`, {
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
    console.error("Error adding series:", error)
    throw error
  }
}

export const getSeries = async (userId) => {
  try {
    const response = await fetch(`/api/movies/series?userId=${userId}`, {
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
    console.error("Error getting series:", error)
    throw error
  }
}

export const getWatchedSeries = async (userId) => {
  try {
    const response = await fetch(`/api/watched-movies/series?userId=${userId}`, {
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
    console.error("Error getting watched series:", error)
    throw error
  }
}

export const addWatchedSeries = async (movie, userId) => {
  try {
    const response = await fetch(`/api/watched-movies/series/add?userId=${userId}`, {
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