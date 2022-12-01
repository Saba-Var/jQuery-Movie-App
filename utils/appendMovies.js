'use strict'

import theMovieDbConfig from '../services/the-movie-db-config.js'
import imageHandler from './imageHandler.js'

const appendMovies = (id, list, method) => {
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
            class="img"
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
              src="../../../assets/images/play-icon.png"
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

export default appendMovies
