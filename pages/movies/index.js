'use strict'

import theMovieDbConfig from '../../services/the-movie-db-config.js'
import { fetchMovies } from '../../services/movie-service.js'
import searchHandler from '../../utils/searchHandler.js'
import appendMovies from '../../utils/appendMovies.js'

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
          const background = theMovieDbConfig.getImageUri(
            movie.backdrop_path ? movie.backdrop_path : movie.poster_path
          )

          $('#slides-container').append(
            `
              <li class="slide relative h-[50vh] w-screen sm:h-screen" id="slide">
              <div class="w-full brightness-50">
                <img
                  src="${background}?api_key=${theMovieDbConfig.apiKey}"
                  class="h-[50vh] sm:h-screen w-full"
                  alt="${movie.title}"
                />
                />
              </div>
          
              <div
                class="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] top-[45%] -translate-y-1/2"
              >
                <div class="flex justify-between gap-10 items-center">
                  <div class="w-1/2 flex flex-col gap-10">
                    <p class="text-main-red text-2xl sm:text-3xl lg:text-4xl font-bold">
                      ${movie.title}
                    </p>
                    <p
                      class="text-white overflow-hidden h-[165px] text-ellipsis text-base font-bold"
                    >
                      ${movie.overview}
                    </p>
                  </div>
          
                  <a
                    href="/pages/movies/info/index.html?id=${movie.id}"
                    class="cursor-pointer relative"
                    id="item-card"
                  >
                    <img
                      class="w-[150px] img sm:w-[220px] lg:w-[300px] top-0 left-1"
                      src="${theMovieDbConfig.getImageUri(
                        movie.poster_path
                      )}?api_key=${theMovieDbConfig.apiKey}"
                      alt="${movie?.title}"
                    />
                    <div
                      class="absolute h-20 w-20 hide sm:h-28 sm:w-28 lg:h-40 lg:w-40 z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      id="play-icon-container"
                    >
                      <img
                        id="play-icon"
                        src="../../assets/images/play-icon.png"
                        alt="play icon"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </li>
              `
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

  const loadMoreMovies = async (page, category, containerId) => {
    try {
      const response = await fetchMovies(category, page)

      if (response?.status === 200) {
        const newList = response?.data?.results
        appendMovies(containerId, newList)
      }
    } catch (error) {
      console.log('load movies failed')
    }
  }

  fetchPopularMovies()
  fetchUpcomingMovies()

  $('#load-more').on('click', async () => {
    popularMoviesPage++
    loadMoreMovies(popularMoviesPage, 'popular', '#movie-list')
  })

  $('#upcoming-load-more').on('click', async () => {
    upcomingMoviesPage++
    loadMoreMovies(upcomingMoviesPage, 'upcoming', '#upcoming-movie-list')
  })

  const sliderHandler = (operator, buttonId) => {
    $(buttonId).attr('disabled', true)

    $('#slides-container').animate(
      { scrollLeft: operator + Math.floor($('#slide').width()) },
      400
    )

    const timeOut = setTimeout(() => {
      $(buttonId).attr('disabled', false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=', '#slide-arrow-next')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=', '#slide-arrow-prev')
  })

  $('#search-icon').on('click', () => {
    searchHandler('movies')
  })

  $('#search-input').on('keyup', (e) => {
    if (e.key === 'Enter') {
      searchHandler('movies')
    }
  })
})
