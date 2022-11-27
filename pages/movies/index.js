'use strict'

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
          theMovieDbConfig.getImageUri()

          const background = theMovieDbConfig.getImageUri(
            movie.backdrop_path ? movie.backdrop_path : movie.poster_path
          )
          $('#slides-container').append(
            `<li class="slide relative h-[50vh] w-screen sm:h-screen" id="slide">
              <div class="w-full brightness-50">
                <img class="h-[50vh] sm:h-screen w-full" src="${background}?api_key=${
              theMovieDbConfig.apiKey
            }"
                />
              </div>

              <div class="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] top-[45%] -translate-y-1/2">
                <div class="flex justify-between gap-10 items-center">
                  <div class="w-1/2 flex flex-col gap-10">
                    <p class="text-main-red text-2xl sm:text-3xl lg:text-4xl font-bold">${
                      movie.title
                    }</p>
                    <p class="text-white overflow-hidden h-[165px] text-ellipsis text-base font-bold">${
                      movie.overview
                    }</p>
                  </div>

                  <div>
                  <img class="w-[150px] sm:w-[220px] lg:w-[300px] top-0 left-1" src="${theMovieDbConfig.getImageUri(
                    movie.poster_path
                  )}?api_key=${theMovieDbConfig.apiKey}" 
                    alt={${movie?.title}} 
                    />
                    </div>
                </div>
              </div>
            </li>`
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

  $('#slide-arrow-next').on('click', () => {
    sliderHandler('+=')
  })

  $('#slide-arrow-prev').on('click', () => {
    sliderHandler('-=')
  })

  const appendMovies = (id, list, type) => {
    list.forEach((movie) => {
      const background = theMovieDbConfig.getImageUri(
        movie.backdrop_path ? movie.backdrop_path : movie.poster_path
      )

      $(id).append(`
      <li class="relative scale lg:mb-6">
        <a
          class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-main-red focus-within:ring-offset-2 focus-within:ring-offset-main-red"
          href="/pages/movies/info/index.html?id=${movie.id}&type=${type}"
          >
          <img
          class="pointer-events-none object-cover group-hover:brightness-50"
            src="${background}?api_key=${theMovieDbConfig.apiKey}"
            alt="${movie?.title}"
          />
          <button type="button" class="absolute inset-0 focus:outline-none">
            <span class="sr-only">View details for IMG_4985.HEIC</span>
          </button>
        </a>
        <p
          class="pointer-events-none mt-2 block truncate text-base lg:text-xl font-medium text-main-red"
        >
            ${movie?.title}
          </p>
        <a class="flex items-center gap-2 mt-1">
          <div class="text-yellow-400 text-base border rounded-[4px] px-[3px] pt-[1px] flex items-center">rating</div>
          <p
          class="pointer-events-none block text-base font-medium text-slate-200"
          >
            ${movie?.vote_average}
          </p>
        </a>
    </li>
      `)
    })
  }
})
