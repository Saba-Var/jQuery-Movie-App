import axiosInstance from '../../services/axios.js'

jQuery(() => {
  axiosInstance
    .get('/movie/popular?api_key=d7a9e66cac90c567fa383e840bb624d8')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      alert(error?.response?.data?.status_message)
    })
})
