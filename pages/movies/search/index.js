'use strict'

import { searchMovies } from '../../../services/movie-service.js'
import appendMovies from '../../../utils/appendMovies.js'
import queryParams from '../../../utils/queryParams.js'

jQuery(() => {
  const searchQuery = queryParams.query

  const fetchMovies = async (query) => {
    try {
      $('#movie-list').html(
        `<p class="text-3xl mt-5 text-slate-400">Loading ...</p>`
      )

      const response = await searchMovies(query || searchQuery)

      if (response?.status === 200) {
        const moviesList = response?.data?.results

        if (moviesList.length === 0) {
          $('#movie-list').html(
            `<p class="text-3xl  mt-5 text-main-red">No results found</p>`
          )
        } else {
          $('#movie-list').html('')
          appendMovies('#movie-list', moviesList)
        }
      }
    } catch (error) {
      console.log('movie details fetch failed')
    }
  }

  if (searchQuery) {
    $('#search-input').val(searchQuery)
    fetchMovies()
  }

  const searchHandler = () => {
    const searchValue = $('#search-input').val().trim()

    if (searchValue) {
      fetchMovies(searchValue)

      if (history.pushState) {
        let newurl =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname +
          `?query=${searchValue}`

        window.history.pushState({ path: newurl }, '', newurl)
      }
    }
  }

  $('#search-icon').on('click', searchHandler)

  $('#search-input').on('keyup', (e) => {
    if (e.key === 'Enter') {
      searchHandler()
    }
  })
})
