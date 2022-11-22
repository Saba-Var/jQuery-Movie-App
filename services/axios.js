import theMovieDbConfig from './the-movie-db-config.js'

const axiosInstance = axios.create({
  baseURL: theMovieDbConfig.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
