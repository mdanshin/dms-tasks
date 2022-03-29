import axios from 'axios'

export const API_URL = process.env.REACT_APP_API_URL

const $api = axios.create({
  baseURL: API_URL
})

export default $api
