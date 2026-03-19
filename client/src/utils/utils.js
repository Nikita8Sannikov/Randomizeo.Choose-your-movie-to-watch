// Вынесена логика фетча
export const fetchApi = async(url, method = "GET", body) => {
    try{
        const options = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
         ...(body && {body: JSON.stringify(body)}),
        }
  
        const response = await fetch(url, options)
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
    
        const data = await response.json()
        return data
    }catch(error){
      console.error(`Error fetching ${url}:`, error)
      throw error
    }
  }

  // Функция для получения фильмов
  export  async function fetchFilms(userId, getFunc, setState) {
      if (!userId) return; 
      try {
        const fetchedFilms = await getFunc(userId)
        const reverseFetched = fetchedFilms.reverse()
        setState(reverseFetched)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

  // Функция для удаления фильмов, прокинута в ModalContext, в нем обрабатывает удаление фильма и удаление просмотренного фильма
  function removeMovieFromList (movie, list, setList) {
      setList(list.filter((m) => m._id !== movie._id))
    }    

  export async function deleteMovie(movie, list, setList, apiFunc, userId) {
      try {
        await apiFunc(movie._id, userId)
        removeMovieFromList(movie, list, setList)
      } catch (error) {
        console.error("Error deleting movies:", error)
      }
    }  
  
  // Функция для добавления фильмов и сериалов в просмотренные, прокинута в ModalContext, там обрабатывается в confirmViewed
    export async function addToWatchedMovies(movie, addSeriesToApi, addMovieToApi, setWatchedSeries, setWatchedMovies, userId) {
      const newItem = {
        title: movie.title,
        img: movie.img,
        shortDescription: movie.shortDescription,
        description: movie.description,
        year: movie.year,
        genres: movie.genres,
        rating: movie.rating,
        movieLength: movie.movieLength,
        kinopoiskId: movie.kinopoiskId,
        isSeries: movie.isSeries,
      }
      await addItem(newItem,
        newItem.isSeries ? addSeriesToApi : addMovieToApi,
        newItem.isSeries ? setWatchedSeries : setWatchedMovies,
        userId
         )
    }
    
    // Функция для добавления фильмов и сериалов через инпут, прокинута в AddKinopoisk
    export async function addMovieOrSeries(
          title,
          img,
          shortDescription = "",
          description = "",
          year = "",
          genres = "",
          rating = "",
          movieLength = "",
          kinopoiskId = "",
          isSeries = false,
          addSeriesToApi,
          addMovieToApi,
          setSeries,
          setMovies,
          userId
        ) {
          const newItem = {
            title,
            img,
            shortDescription,
            description,
            year,
            genres,
            rating,
            movieLength,
            kinopoiskId,
            isSeries,
          }
    
          return await addItem(newItem,
            newItem.isSeries ? addSeriesToApi : addMovieToApi,
            newItem.isSeries ? setSeries : setMovies,
            userId
             )
        }

// Вынесена логика добавления и недублирования фильма
     async function addItem( item, addToApi, setState, userId) {
      try{
        const addedItem = await addToApi(item, userId )

        setState(prev => {
          return prev.some(el => el.kinopoiskId === addedItem.kinopoiskId)
          ? prev
          : [addedItem, ...prev]
        })
        return true
      }catch (error) {
        console.error(
          `Error adding ${
            item.isSeries ? "series" : "movie"
          } to the API:`,
          error
        )
        return false
      }
    }