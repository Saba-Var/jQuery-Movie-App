'use strict'

import apiKeyParam from '../constants/apiKeyParam.js'
import axiosInstance from './axios.js'

export const fetchMovies = (uri, page = 1) => {
  return axiosInstance.get(`/movie/${uri}?${apiKeyParam}&page=${page}`)
}

export const fetchPeople = (id) => {
  return axiosInstance.get(`/movie/${id}/credits?${apiKeyParam}`)
}

export const fetchMovieDetails = (id) => {
  return axiosInstance.get(`/movie/${id}?${apiKeyParam}`)
}

export const fetchVideos = (id) => {
  return axiosInstance.get(`/movie/${id}/videos?${apiKeyParam}`)
}
