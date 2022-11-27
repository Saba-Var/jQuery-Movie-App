'use strict'

const theMovieDbConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'd7a9e66cac90c567fa383e840bb624d8',

  imageStorage: 'https://image.tmdb.org/t/p',

  getImageUri: (path) => {
    return `${theMovieDbConfig.imageStorage}/original${path}`
  },

  getW500ImageUri: (path) => {
    return `${theMovieDbConfig.imageStorage}/w500${path}`
  },
}

export default theMovieDbConfig
