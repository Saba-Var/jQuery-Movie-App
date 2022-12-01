'use strict'

const searchHandler = (category) => {
  const searchValue = $('#search-input').val().trim()

  if (searchValue) {
    window.location.href = `/pages/${category}/search/index.html?query=${searchValue}`
  }
}

export default searchHandler
