'use strict'

import { searchMovies } from '../../../services/movie-service.js'
import searchAndPush from '../../../utils/searchAndPush.js'
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

  $('#search-icon').on('click', () => {
    searchAndPush(fetchMovies)
  })

  $('#search-input').on('keyup', (e) => {
    if (e.key === 'Enter') {
      searchAndPush(fetchMovies)
    }
  })
})
