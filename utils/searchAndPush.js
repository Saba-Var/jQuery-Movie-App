'use strict'

const searchAndPush = (fetchFunction) => {
  const searchValue = $('#search-input').val().trim()

  if (searchValue) {
    fetchFunction(searchValue)

    if (history.pushState) {
      let newUri =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        `?query=${searchValue}`

      window.history.pushState({ path: newUri }, '', newUri)
    }
  }
}

export default searchAndPush
