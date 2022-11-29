'use strict'

import { fetchPerson, movieCredits } from '../../../services/people-service.js'
import theMovieDbConfig from '../../../services/the-movie-db-config.js'
import slideHandler from '../../../utils/slideHandler.js'
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
              class="rounded-2xl mx-auto w-60"
              alt="${person.name}" 
              src="${src}" 

            />
            <p class="text-main-red text-center mt-2 text-3xl font-semibold">${person.name}</p>
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

        person?.also_known_as?.forEach((name, i) => {
          $('#also-known-as').append(`
            <span class="mr-1">
            ${name}${i !== person.also_known_as.length - 1 && ','}
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
        const movieCredits = response?.data?.cast

        movieCredits.forEach((movie) => {
          const imageSrc = theMovieDbConfig.getImageUri(
            movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
          )

          const { src } = imageHandler(
            `#${movie?.id}`,
            imageSrc,
            'not-found.png'
          )

          $('#movie-credits').append(`
          <li class="">
            <a
              href="/pages/movies/info/index.html?id=${movie.id}"
              class="flex flex-col items-center w-24 lg:w-48"
            >
              <img
              class="h-20 lg:h-32 w-full"
              id="${movie?.id}" src="${src}" alt="${movie.title}" />
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
        })

        slideHandler('movie-credits')
      }
    } catch (error) {
      console.log('movie credits fetch failed')
    }
  }

  fetchPersonData()
  fetchMovieCredits()
})
