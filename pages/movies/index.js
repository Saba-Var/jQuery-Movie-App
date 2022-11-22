import theMovieDbConfig from '../../services/the-movie-db-config.js'
import axiosInstance from '../../services/axios.js'

jQuery(() => {
  const fetchPopularMovies = async () => {
    try {
      const response = await axiosInstance.get(
        `/movie/popular?api_key=${theMovieDbConfig.apiKey}`
      )
      const data = await response?.data?.results

      if (response?.status === 200) {
        const randomMovies = []

        for (let i = 0; i < 3; i++) {
          const randomMovie = data[Math.floor(Math.random() * data.length)]

          if (!randomMovies.includes(randomMovie)) {
            randomMovies.push(randomMovie)
          } else {
            i--
          }
        }

        randomMovies.forEach((movie) => {
          $('#slides-container').append(
            `<li class="slide" id="slide">
              <img class="w-full lg:w-[85%] xl:w-[75%] h-full mx-auto" src="${theMovieDbConfig.imageStorageBaseUrl}/original${movie?.poster_path}?api_key=${theMovieDbConfig.apiKey}" alt="${movie?.title}" /> 
            </li>`
          )
        })

        const sliderHandler = (operator) => {
          const slideWidth = $('#slide').width()
          $('#slides-container').animate(
            { scrollLeft: operator + slideWidth },
            300
          )
        }

        $('#slide-arrow-next').on('click', () => {
          sliderHandler('+=')
        })

        $('#slide-arrow-prev').on('click', () => {
          sliderHandler('-=')
        })
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  }

  fetchPopularMovies()
})
