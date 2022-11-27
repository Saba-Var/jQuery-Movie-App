'use strict'

import { fetchPerson, movieCredits } from '../../../services/people-service.js'
import theMovieDbConfig from '../../../services/the-movie-db-config.js'
import queryParams from '../../../utils/queryParams.js'

jQuery(() => {
  const personId = queryParams.id

  const fetchPersonData = async () => {
    try {
      const response = await fetchPerson(personId)

      if (response.status === 200) {
        const person = response?.data
        console.log(person)

        $('#person-image').html(
          `
          <div>
            <img 
              class="rounded-2xl mx-auto w-60"
              src="${theMovieDbConfig.getW500ImageUri(person.profile_path)}" 
              alt="${person.name}" 
            />
            <p class="text-main-red text-center mt-2 text-3xl font-semibold">${
              person.name
            }</p>
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
    } catch (error) {}
  }

  const fetchMovieCredits = async () => {
    try {
      const response = await movieCredits(personId)

      if (response.status === 200) {
        const movieCredits = response?.data?.cast

        movieCredits.forEach((movie) => {
          $('#movie-credits').append(`
            <li>
                <a
                href="/pages/movies/info/index.html?id=${movie.id}" 
                class="flex flex-col items-center w-24 lg:w-32"
                >
                <img 
                    class=""
                    src="${theMovieDbConfig.getW500ImageUri(
                      movie.poster_path
                    )}" 
                    alt="${movie.title}" 
                />
                <p class="text-main-red text-center mt-2 text-sm font-semibold">${
                  movie.title.length > 12
                    ? movie.title.substring(0, 12) + '...'
                    : movie.title
                }</p>
                </a>
            </li>
          `)
        })

        const slider = document.getElementById('movie-credits')

        let isDown = false
        let scrollLeft = 0
        let startX = 0

        $('#movie-credits')
          .on('mousedown', (e) => {
            isDown = true
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
          })
          .on('mouseleave', () => {
            isDown = false
          })
          .on('mouseup', () => {
            isDown = false
          })
          .on('mousemove', (e) => {
            if (!isDown) {
              return
            }
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const move = (x - startX) * 3
            slider.scrollLeft = scrollLeft - move
          })
      }
    } catch (error) {}
  }

  fetchPersonData()
  fetchMovieCredits()
})
