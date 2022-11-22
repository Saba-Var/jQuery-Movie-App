const theMovieDbConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'd7a9e66cac90c567fa383e840bb624d8',

  imageStorageBaseUrl: 'https://image.tmdb.org/t/p',

  originalImage: (originalImagePath) => {
    return `${this.imageStorageBaseUrl}/original/${originalImagePath}`
  },

  w500Image: (w500ImagePath) => {
    return `${this.imageStorageBaseUrl}/w500/${w500ImagePath}`
  },
}

export default theMovieDbConfig
