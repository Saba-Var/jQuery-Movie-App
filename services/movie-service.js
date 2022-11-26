import apiKeyParam from '../constants/apiKeyParam.js'
import axiosInstance from './axios.js'

export const fetchMovies = (uri, page = 1) => {
  return axiosInstance.get(`/${uri}?${apiKeyParam}&page=${page}`)
}

export const fetchMovieDetails = (id) => {
  return axiosInstance.get(`/${id}?${apiKeyParam}`)
}

export const fetchActors = (id) => {
  return axiosInstance.get(`/${id}/credits?${apiKeyParam}`)
}

export const fetchVideos = (id) => {
  return axiosInstance.get(`/${id}/videos?${apiKeyParam}`)
}
