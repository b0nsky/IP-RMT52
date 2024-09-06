import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `https://8entertainment.ronnybons.space`
})

export default axiosInstance
