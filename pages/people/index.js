'use strict'

import theMovieDbConfig from '../../services/the-movie-db-config.js'
import { fetchActors } from '../../services/actor-service.js'

jQuery(() => {
  let currentPage = 1

  const fetchPopularActors = async () => {
    try {
      const response = await fetchActors('popular', currentPage)

      if (response?.status === 200) {
        response?.data?.results?.forEach((actor) => {
          const imageSrc = theMovieDbConfig.getImageUri(actor?.profile_path)

          $('#actors-list').append(`
              <li
              class="relative scale lg:mb-6 border-[3px] border-main-red rounded-lg overflow-hidden pb-3"
            >
              <a href="/pages/actors/info/index.html?id=${actor.id}">
                <div
                  class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden bg-gray-100"
                >
                  <img
                    class="pointer-events-none object-cover group-hover:brightness-50"
                    src="${imageSrc}?api_key=${theMovieDbConfig.apiKey}"
                    alt="${actor?.title}"
                  />
                  <button type="button" class="absolute inset-0 focus:outline-none">
                    <span class="sr-only">View details for IMG_4985.HEIC</span>
                  </button>
                </div>
                <div class="px-2 sm:px-3">
                  <p
                    class="pointer-events-none mt-2 block truncate text-base lg:text-xl font-medium text-main-red"
                  >
                    ${actor?.name}
                  </p>
                  <a class="flex items-center gap-2 mt-1">
                    <p
                      class="pointer-events-none block text-base font-medium text-slate-400"
                    >
                      ${actor?.known_for_department}
                    </p>
                  </a>
                </div>
              </a>
            </li>
          `)
        })
      }
    } catch (error) {
      console.log('actors fetch failed')
    }
  }

  fetchPopularActors()

  $('#load-more').on('click', async () => {
    try {
      currentPage++

      const response = await fetchPopularActors(currentPage)

      if (response?.status === 200) {
      }
    } catch (error) {
      console.log('actors fetch failed')
    }
  })
})
