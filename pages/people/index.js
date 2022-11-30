'use strict'

import { fetchPeople } from '../../services/people-service.js'
import searchHandler from '../../utils/searchHandler.js'
import appendPeople from '../../utils/appendPeople.js'

jQuery(() => {
  let currentPage = 1

  const fetchPopularActors = async () => {
    try {
      const response = await fetchPeople('popular', currentPage)

      if (response?.status === 200) {
        appendPeople(response?.data?.results)
      }
    } catch (error) {
      console.log('actors fetch failed')
    }
  }

  fetchPopularActors()

  $('#load-more').on('click', async () => {
    currentPage++
    fetchPopularActors()
  })

  $('#search-icon').on('click', () => {
    searchHandler('people')
  })

  $('#search-input').on('keyup', (e) => {
    if (e.key === 'Enter') {
      searchHandler('people')
    }
  })
})
