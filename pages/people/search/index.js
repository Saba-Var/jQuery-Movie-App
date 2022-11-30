'use strict'

import { searchPerson } from '../../../services/people-service.js'
import searchAndPush from '../../../utils/searchAndPush.js'
import appendPeople from '../../../utils/appendPeople.js'
import queryParams from '../../../utils/queryParams.js'

jQuery(() => {
  const searchQuery = queryParams.query

  const fetchPeople = async (query) => {
    try {
      $('#people-list').html(
        `<p class="text-3xl mt-5 text-slate-400">Loading ...</p>`
      )

      const response = await searchPerson(query || searchQuery)

      if (response?.status === 200) {
        const peopleList = response?.data?.results

        if (peopleList.length === 0) {
          $('#actors-list').html(
            `<p class="text-3xl  mt-5 text-main-red">No results found</p>`
          )
        } else {
          $('#actors-list').html('')
          appendPeople(peopleList)
        }
      }
    } catch (error) {
      console.log('people fetch failed')
    }
  }

  if (searchQuery) {
    $('#search-input').val(searchQuery)
    fetchPeople()
  }

  $('#search-icon').on('click', () => {
    searchAndPush(fetchPeople)
  })

  $('#search-input').on('keyup', (e) => {
    if (e.key === 'Enter') {
      searchAndPush(fetchPeople)
    }
  })
})
