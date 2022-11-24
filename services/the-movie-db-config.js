const theMovieDbConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'd7a9e66cac90c567fa383e840bb624d8',

  getImageUri: (path) => {
    return `https://image.tmdb.org/t/p/original${path}`
  },

  getW500ImageUri: (path) => {
    return `https://image.tmdb.org/t/p/w500${path}`
  },
}

export default theMovieDbConfig
