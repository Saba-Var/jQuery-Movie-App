'use strict'

import apiKeyParam from '../constants/apiKeyParam.js'
import axiosInstance from './axios.js'

export const fetchPeople = (uri, page = 1) => {
  return axiosInstance.get(`/person/${uri}?${apiKeyParam}&page=${page}`)
}

export const fetchPerson = (id) => {
  return axiosInstance.get(`/person/${id}?${apiKeyParam}`)
}

export const movieCredits = (id) => {
  return axiosInstance.get(`/person/${id}/movie_credits?${apiKeyParam}`)
}
