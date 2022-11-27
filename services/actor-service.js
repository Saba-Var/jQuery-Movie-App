'use strict'

import apiKeyParam from '../constants/apiKeyParam.js'
import axiosInstance from './axios.js'

export const fetchActors = (uri, page = 1) => {
  return axiosInstance.get(`/person/${uri}?${apiKeyParam}&page=${page}`)
}
