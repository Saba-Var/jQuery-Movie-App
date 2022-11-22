import theMovieDbConfig from '../../services/the-movie-db-config.js'
import { fetchMovies } from '../../services/movie-service.js'
import sliderHandler from '../../utils/slideHandler.js'

jQuery(() => {
  let popularPage = 1
  let upcomingPage = 1
  let movieList = []

  const fetchPopularMovies = async () => {
    try {
      const response = await fetchMovies('popular', popularPage)

      if (response?.status === 200) {
        movieList = response?.data?.results

        const randomMovies = []

        for (let i = 0; i < 3; i++) {
          const randomMovie =
            movieList[Math.floor(Math.random() * movieList.length)]

          if (!randomMovies.includes(randomMovie)) {
            randomMovies.push(randomMovie)
          } else {
            i--
          }
        }

        randomMovies.forEach((movie) => {
          $('#slides-container').append(
            `<li class="slide relative" id="slide">
              <img class="w-full lg:w-[85%] xl:w-[75%] h-full mx-auto" src="${theMovieDbConfig.imageStorageBaseUrl}/original${movie?.poster_path}?api_key=${theMovieDbConfig.apiKey}" 
                alt={${movie?.title}} /> 
            </li>`
          )
        })

        appendMovies('#movie-list', movieList)
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  }

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetchMovies('upcoming', upcomingPage)

      if (response?.status === 200) {
        const upcomingMovieList = response?.data?.results
        appendMovies('#upcoming-movie-list', upcomingMovieList)
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  }

  fetchPopularMovies()
  fetchUpcomingMovies()

  const loadMoreMovies = async (page, category, containerId) => {
    try {
      page++

      const response = await fetchMovies(category, page)

      if (response?.status === 200) {
        const newList = response?.data?.results
        appendMovies(containerId, newList)
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  }

  $('#load-more').on('click', async () => {
    loadMoreMovies(popularPage, 'popular', '#movie-list')
  })

  $('#upcoming-load-more').on('click', async () => {
    loadMoreMovies(upcomingPage, 'upcoming', '#upcoming-movie-list')
  })

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=')
  })

  const appendMovies = (id, list) => {
    list.forEach((movie) => {
      $(id).append(`
      <li class="relative scale lg:mb-6">
      <div
        class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-main-red focus-within:ring-offset-2 focus-within:ring-offset-main-red"
      >
        <img
        class="pointer-events-none object-cover group-hover:opacity-75"
          src="${theMovieDbConfig.imageStorageBaseUrl}/original${movie?.poster_path}?api_key=${theMovieDbConfig.apiKey}"
          alt="${movie?.title}"
        />
        <button type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for IMG_4985.HEIC</span>
        </button>
      </div>
      <p
        class="pointer-events-none mt-2 block truncate text-base lg:text-xl font-medium text-main-red"
      >
          ${movie?.title}
        </p>
      <div class="flex items-center gap-2 mt-1">
        <div class="text-yellow-400 text-base border rounded-[4px] px-[3px] pt-[1px] flex items-center">rating</div>
        <p
        class="pointer-events-none block text-base font-medium text-slate-200"
        >
          ${movie?.vote_average}
        </p>
      </div>
    </li>
      `)
    })
  }
})
