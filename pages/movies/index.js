import theMovieDbConfig from '../../services/the-movie-db-config.js'
import { fetchMovies } from '../../services/movie-service.js'
import sliderHandler from '../../utils/slideHandler.js'

jQuery(() => {
  let upcomingMoviesPage = 1
  let popularMoviesPage = 1

  let movieList = []

  const fetchPopularMovies = async () => {
    try {
      const response = await fetchMovies('popular', popularMoviesPage)

      if (response?.status === 200) {
        movieList = response?.data?.results

        const shuffled = movieList.sort(() => 0.5 - Math.random())

        shuffled.forEach((movie) => {
          theMovieDbConfig.originalImage()

          const background = theMovieDbConfig.originalImage(
            movie.backdrop_path ? movie.backdrop_path : movie.poster_path
          )

          $('#slides-container').append(
            `<li class="slide relative" id="slide">
                <img class="w-full brightness-50 h-full mx-auto" src="${background}?api_key=${theMovieDbConfig.apiKey}"
                 alt={${movie?.title}} />
            </li>`
          )
        })

        appendMovies('#movie-list', movieList)
      }
    } catch (error) {
      console.log('popular movie fetch failed')
    }
  }

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetchMovies('upcoming', upcomingMoviesPage)

      if (response?.status === 200) {
        const upcomingMovieList = response?.data?.results
        appendMovies('#upcoming-movie-list', upcomingMovieList)
      }
    } catch (error) {
      console.log('upcoming movies fetch failed')
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
      console.log('load movies failed')
    }
  }

  $('#load-more').on('click', async () => {
    loadMoreMovies(popularMoviesPage, 'popular', '#movie-list')
  })

  $('#upcoming-load-more').on('click', async () => {
    loadMoreMovies(upcomingMoviesPage, 'upcoming', '#upcoming-movie-list')
  })

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=')
  })

  $('#scroll-up').hide()

  let prevScrollPosition = window.pageYOffset

  $(window).on('scroll', () => {
    const currentScrollPosition = window.pageYOffset

    if (prevScrollPosition > currentScrollPosition) {
      $('#navbar-container').fadeIn('slow')

      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeIn('slow')
      }
    } else {
      $('#navbar-container').fadeOut('slow')
      if (currentScrollPosition > 500) {
        $('#scroll-up').fadeOut('slow')
      }
    }

    if (window.pageYOffset < 500) {
      $('#scroll-up').fadeOut('slow')
    }

    prevScrollPosition = currentScrollPosition
  })

  $('#scroll-up').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, 500)
  })

  const appendMovies = (id, list) => {
    list.forEach((movie) => {
      const background = theMovieDbConfig.originalImage(
        movie.backdrop_path ? movie.backdrop_path : movie.poster_path
      )

      $(id).append(`
      <li class="relative scale lg:mb-6">
      <div
        class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-main-red focus-within:ring-offset-2 focus-within:ring-offset-main-red"
      >
        <img
        class="pointer-events-none object-cover group-hover:opacity-75"
          // src="${background}?api_key=${theMovieDbConfig.apiKey}"
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
