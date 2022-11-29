'use strict'

import theMovieDbConfig from '../../../services/the-movie-db-config.js'
import imageHandler from '../../../utils/imageHandler.js'
import sliderHandler from '../../../utils/sliderHandler.js'
import queryParams from '../../../utils/queryParams.js'
import sortVideos from '../../../utils/sortVideos.js'
import {
  fetchMovieDetails,
  fetchVideos,
  fetchPeople,
} from '../../../services/movie-service.js'

jQuery(() => {
  const movieId = queryParams.id

  const fetchMovies = async () => {
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
              starCount >= 0 ? 'text-yellow-400' : 'text-slate-500'
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
        $('#release-date').text(movieData?.release_date)

        movieData?.genres?.forEach((genre) => {
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

        const background = theMovieDbConfig.getImageUri(
          movieData.backdrop_path
            ? movieData.backdrop_path
            : movieData.poster_path
        )

        $('#movie-images').html(
          `<li class="slide relative h-[50vh] w-full sm:h-screen" id="slide">
              <div class="w-full brightness-50">
                <img class="h-[50vh] sm:h-screen w-full" 
                  src="${background}?api_key=${theMovieDbConfig.apiKey}"
                  alt="${movieData?.title}"
                />
              </div>

              <div class="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-full top-[45%] -translate-y-1/2">
                <div class="flex justify-center gap-10 items-center">
                  <div class="w-1/2 flex flex-col gap-10">
                    <p class="text-main-red text-2xl sm:text-4xl lg:text-5xl font-bold">${
                      movieData?.title
                    }</p>

                    <p class="text-slate-100 italic text-xl sm:text-2xl font-bold">${
                      movieData?.tagline ? `"${movieData?.tagline}"` : ''
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

  const fetchActorsList = async () => {
    try {
      const response = await fetchPeople(movieId)

      if (response?.status === 200) {
        const cast = response?.data?.cast

        cast?.forEach((actor) => {
          const image = new Image()
          image.src = theMovieDbConfig.getW500ImageUri(actor?.profile_path)

          image.onerror = () => {
            imageHandler(`#${actor?.id}`)
          }

          $('#cast').append(`
            <li>
                <a
                href="/pages/people/info/index.html?id=${actor.id}" 
                class="flex flex-col items-center w-44"
                >
                   <img
                   id="${actor?.id}"
                   src="${image.src}"
                   alt="${actor?.name}"
                 />
                 <div class="px-1 py-2">
                   <p class="text-center text-lg text-white font-semibold">
                     ${actor?.original_name}
                   </p>
                   <p class="text-center text-sm text-slate-400">${actor?.character}</p>
                </div>
                </a>
            </li>
          `)
        })
      }
    } catch (error) {
      console.log('actors list fetch failed')
    }
  }

  const fetchMovieVideos = async () => {
    try {
      const response = await fetchVideos(movieId)

      if (response?.status) {
        let videoList = response?.data?.results.sort(sortVideos)

        if (videoList.length > 0) {
          videoList.slice(0, 3).forEach((video) => {
            const src = `https://www.youtube.com/embed/${video?.key}`
            $('#video-gallery').append(`
            <div class="w-[90%] lg:w-[90%] mx-auto">
              <p class="text-main-red text-2xl">${video?.name}</p>
              <iframe src="${src}" allowfullscreen class="w-full  mt-4 h-[50vh] lg:h-[80vh]" ></iframe>
            </div>
            `)
          })
        } else {
          $('#videos-container').hide()
        }
      }
    } catch (error) {
      console.log('video fetch failed')
    }
  }

  sliderHandler('cast')

  if (movieId) {
    fetchMovies()
    fetchActorsList()
    fetchMovieVideos()
  }
})
