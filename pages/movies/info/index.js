import theMovieDbConfig from '../../../services/the-movie-db-config.js'
import { fetchMovieDetails } from '../../../services/movie-service.js'
import queryParams from '../../../utils/queryParams.js'

jQuery(() => {
  const movieId = queryParams.id

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetchMovieDetails(movieId)

      if (response?.status === 200) {
        const movieData = response?.data
        let starCount = Math.floor(movieData?.vote_average / 2)

        for (let i = 0; i < 5; i++) {
          starCount--
          $('#stars').append(`
          <svg
            class="${
              starCount >= 0 ? 'text-white' : 'text-gray-600'
            } h-5 w-5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
                fill-rule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clip-rule="evenodd"
            />
          </svg>
          `)
        }

        $('#movie-name').text(movieData?.title)
        $('#overview').text(movieData?.overview)
        $('#reviews').text(movieData?.vote_count)
        movieData?.genres.forEach((genre) => {
          $('#genres-container').append(`
            <p class="text-base w-fit border py-1 px-3 border-white rounded-2xl text-white">
                ${genre.name}
            </p>
          `)
        })

        $('#budget').text(
          '$ ' +
            movieData?.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        )

        theMovieDbConfig.getImageUri()

        const background = theMovieDbConfig.getImageUri(
          movieData.backdrop_path
            ? movieData.backdrop_path
            : movieData.poster_path
        )

        $('#movie-images').html(
          `<li class="slide relative h-[50vh] w-full sm:h-screen" id="slide">
              <div class="w-full brightness-50">
                <img class="h-[50vh] sm:h-screen w-full" src="${background}?api_key=${
            theMovieDbConfig.apiKey
          }"
                />
              </div>

              <div class="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-full top-[45%] -translate-y-1/2">
                <div class="flex justify-center gap-10 items-center">
                  <div class="w-1/2 flex flex-col gap-10">
                    <p class="text-main-red text-2xl sm:text-4xl lg:text-5xl font-bold">${
                      movieData?.title
                    }</p>

                    <p class="text-white text-xl sm:text-2xl font-bold">${
                      movieData?.tagline
                    }</p>
                  </div>

                  <div>
                  <img class="w-[150px] sm:w-[220px] lg:w-[300px] top-0 left-1" src="${theMovieDbConfig.getImageUri(
                    movieData.poster_path
                  )}?api_key=${theMovieDbConfig.apiKey}" 
                    alt={${movieData?.title}} 
                    />
                    </div>
                </div>
              </div>
            </li>`
        )
      }
    } catch (error) {
      console.log('movie details fetch failed')
    }
  }

  if (movieId) {
    fetchUpcomingMovies()
  }
})
