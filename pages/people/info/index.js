'use strict'

import { fetchPerson, movieCredits } from '../../../services/people-service.js'
import theMovieDbConfig from '../../../services/the-movie-db-config.js'
import sliderHandler from '../../../utils/sliderHandler.js'
import imageHandler from '../../../utils/imageHandler.js'
import queryParams from '../../../utils/queryParams.js'

jQuery(() => {
  const personId = queryParams.id

  const fetchPersonData = async () => {
    try {
      const response = await fetchPerson(personId)

      if (response.status === 200) {
        const person = response?.data

        const { src } = imageHandler(
          `#${person?.id}`,
          theMovieDbConfig.getW500ImageUri(person.profile_path),
          'default-avatar.jpg'
        )

        $('#person-image').html(
          `
          <div>
            <img 
              id="${person?.id}"
              class="rounded-2xl mx-auto w-60 lg:mx-0"
              alt="${person.name}" 
              src="${src}" 
            />
            <p class="text-main-red lg:text-start text-center mt-2 text-3xl font-semibold">${person.name}</p>
          </div> 
          `
        )
        $('#known-for').text(person.known_for_department)
        $('#gender').text(person.gender === 2 ? 'Male' : 'Female')
        $('#birthday').text(person.birthday)
        $('#place-of-birth').text(person.place_of_birth)

        const age =
          new Date().getFullYear() - new Date(person.birthday).getFullYear()
        $('#age').text(`(${age} years old)`)

        person?.also_known_as?.forEach((name, i, arr) => {
          $('#also-known-as').append(`
            <span class="mr-1">
              ${name}${i !== arr.length - 1 ? ',' : ''}
            </span>
            `)
        })
        $('#biography').text(person.biography)
      }
    } catch (error) {
      console.log('person details fetch failed')
    }
  }

  const fetchMovieCredits = async () => {
    try {
      const response = await movieCredits(personId)

      if (response.status === 200) {
        const movieCredits = response?.data?.cast?.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date)
        })

        movieCredits.forEach((movie, i, arr) => {
          const imageSrc = theMovieDbConfig.getImageUri(
            movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
          )

          const { src } = imageHandler(
            `#${movie?.id}`,
            imageSrc,
            'not-found.png'
          )

          $('#movie-credits').append(`
            <li id="item-card">
              <a
                href="/pages/movies/info/index.html?id=${movie.id}"
                class="flex scale flex-col items-center w-24 lg:w-48 relative"
              >
                <div class="h-20 lg:h-32 w-full relative">
                  <img
                    class="w-full h-full"
                    id="${movie?.id}"
                    src="${src}"
                    alt="${movie.title}"
                  />

                  <div
                    id="play-icon-container"
                    class="absolute h-10 w-10 lg:h-20 lg:w-20 hide z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <img
                      id="play-icon"
                      src="../../../assets/images/play-icon.png"
                      alt="play icon"
                    />
                  </div>
                </div>
                <p class="text-main-red text-center mt-2 text-sm font-semibold">
                  ${
                    movie.title.length > 12
                      ? movie.title.substring(0, 12) + '...'
                      : movie.title
                  }
                </p>
              </a>
            </li>
          `)

          $('#acting-history').append(` 
            <li>
              <div class="relative pb-8">
                ${
                  i !== arr.length - 1
                    ? `<span
                  class="absolute top-4 left-1 -ml-px h-full w-0.5 bg-main-red"
                  aria-hidden="true"
                ></span
                >`
                    : ''
                }
                <div class="relative flex space-x-3">
                  <div class="pt-3 lg:mr-2">
                    <span
                      class="h-2 w-2 rounded-full bg-main-red flex items-center justify-center ring-8 ring-slate-700"
                    >
                    </span>
                  </div>
                  <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p class="text-sm text-gray-500">
                      <a
                        href="/pages/movies/info/index.html?id=${movie.id}" 
                        class="font-medium text-slate-100 hover:underline">${
                          movie?.title
                        }</a>
                        <span class="text-slate-400">
                        ${
                          movie?.character ? `as ${movie?.character}` : ''
                        }</span>
                      </p>
                    </div>
                    <div class="whitespace-nowrap text-right text-sm text-slate-200">
                      <time datetime="2020-09-20">${new Date(
                        movie.release_date
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          `)
        })

        sliderHandler('movie-credits')
      }
    } catch (error) {
      console.log('movie credits fetch failed')
    }
  }

  fetchPersonData()
  fetchMovieCredits()
})
