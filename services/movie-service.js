import theMovieDbConfig from './the-movie-db-config.js'
import axiosInstance from './axios.js'

export const fetchMovies = (uri, page = 1) => {
  return axiosInstance.get(
    `/movie/${uri}?api_key=${theMovieDbConfig.apiKey}&page=${page}`
  )
}
