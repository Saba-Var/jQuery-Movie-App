'use strict'

import theMovieDbConfig from '../../services/the-movie-db-config.js'
import imageHandler from '../../utils/imageHandler.js'
import { fetchMovies } from '../../services/movie-service.js'

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
                      class="w-[150px] sm:w-[220px] lg:w-[300px] top-0 left-1"
                      src="${theMovieDbConfig.getImageUri(
                        movie.poster_path
                      )}?api_key=${theMovieDbConfig.apiKey}"
                      alt="{${movie?.title}}"
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

        appendMovies('#movie-list', movieList, 'popular')
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
        appendMovies('#upcoming-movie-list', upcomingMovieList, 'upcoming')
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
        appendMovies(containerId, newList, category)
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

  const sliderHandler = (operator) => {
    const slideWidth = $('#slide').width()

    $('#slides-container').animate(
      { scrollLeft: operator + Math.floor(slideWidth) },
      400
    )
  }

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=')
  })

  const appendMovies = (id, list, type) => {
    list.forEach((movie) => {
      const imageSrc = theMovieDbConfig.getImageUri(
        movie.backdrop_path ? movie.backdrop_path : movie.poster_path
      )

      const { src } = imageHandler(`#${movie?.id}`, imageSrc, 'not-found.png')

      $(id).append(
        `
    <li
      id="item-card"
      class="relative scale lg:mb-6 border-[3px] border-main-red rounded-lg overflow-hidden pb-3"
    >
      <a href="/pages/movies/info/index.html?id=${movie.id}">
        <div
          class="group pointer-events-none object-cover group-hover:brightness-50 relative aspect-w-10 aspect-h-7 block w-full border-none overflow-hidden bg-gray-100"
        >
          <img
          alt="${movie?.title}"
            id="${movie?.id}"
            src="${src}"
          />

          <div
            id="play-icon-container"
            class="absolute h-20 w-20 hide sm:h-28 sm:w-28 lg:h-40 lg:w-40 z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              id="play-icon"
              src="../../assets/images/play-icon.png"
              alt="play icon"
            />
          </div>
        </div>
        <div class="px-2 sm:px-3">
          <p
            class="pointer-events-none mt-2 block truncate text-base lg:text-xl font-medium text-main-red"
          >
            ${movie?.title}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <div
              class="text-yellow-400 text-base border rounded-[4px] px-[3px] pt-[1px] flex items-center"
            >
              rating
            </div>
            <p
              class="pointer-events-none block text-base font-medium text-slate-200"
            >
              ${movie?.vote_average}
            </p>
          </div>
        </div>
      </a>
    </li>
      `
      )
    })
  }
})
