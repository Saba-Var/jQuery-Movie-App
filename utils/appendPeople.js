'use strict'

import theMovieDbConfig from '../services/the-movie-db-config.js'
import imageHandler from './imageHandler.js'

const appendPeople = (peopleList) => {
  peopleList.forEach((actor) => {
    const id = actor?.id

    const { src } = imageHandler(
      `#${id}`,
      theMovieDbConfig.getImageUri(actor?.profile_path),
      'default-avatar2.jpg'
    )

    $('#actors-list').append(`
            <li
            class="relative scale lg:mb-6 border-[3px] border-main-red rounded-lg overflow-hidden pb-3"
          >
            <a href="/pages/people/info/index.html?id=${id}">
              <div
                class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden bg-gray-100"
              >
                <img
                  id="${id}"
                  class="pointer-events-none object-cover group-hover:brightness-50"
                  src="${src}"
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

export default appendPeople
