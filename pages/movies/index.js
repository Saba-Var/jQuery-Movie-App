import theMovieDbConfig from '../../services/the-movie-db-config.js'
import { fetchMovies } from '../../services/movie-service.js'

jQuery(() => {
  let page = 1
  let movieList = []

  const appendHandler = (list) => {
    list.forEach((movie) => {
      $('#movie-list').append(`
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

  const fetchPopularMovies = async () => {
    try {
      const response = await fetchMovies('popular', page)

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

        appendHandler(movieList)
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  }

  fetchPopularMovies()

  $('#load-more').on('click', async () => {
    try {
      page++

      const response = await fetchMovies('popular', page)

      if (response?.status === 200) {
        const newMovieList = response?.data?.results
        appendHandler(newMovieList)
      }
    } catch (error) {
      alert(error?.response?.data?.status_message)
    }
  })

  const sliderHandler = (operator) => {
    const slideWidth = $('#slide').width()
    const currentScrollPosition = $('#slides-container').scrollLeft()
    const maxScrollPosition =
      $('#slides-container')[0].scrollWidth - $('#slides-container').width()

    $('#slides-container').animate({ scrollLeft: operator + slideWidth }, 400)

    if (currentScrollPosition === 0) {
      return $('#slide-arrow-prev').addClass('cursor-not-allowed')
    }

    if (Math.floor(currentScrollPosition) === Math.floor(maxScrollPosition)) {
      return $('#slide-arrow-next').addClass('cursor-not-allowed')
    }

    if (currentScrollPosition > 0) {
      return $('#slide-arrow-prev').removeClass('cursor-not-allowed')
    }

    if (currentScrollPosition < maxScrollPosition) {
      return $('#slide-arrow-next').removeClass('cursor-not-allowed')
    }
  }

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=')
  })
})
