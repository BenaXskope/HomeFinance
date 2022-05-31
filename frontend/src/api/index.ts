import axios from 'axios'
import URL_CONFIG from './urls.config'
import router from '@/router'
import { getCsrfCookie } from '@/utils/cookie'

const CSRF_ERROR = 'CSRF Failed: CSRF cookie not set.'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  if (config.url === URL_CONFIG.CSRF) return config

  const csrfToken = getCsrfCookie()
  config.headers!['X-CSRFToken'] = csrfToken!
  return config
})

instance.interceptors.response.use(response => response
  , (error) => {
    const { response, config } = error
    if (response.status === 500)
      router.push({ name: 'login' })

    if (response.status === 403 && response.data.detail === CSRF_ERROR) {
      return axios.get(URL_CONFIG.CSRF).then(() => {
        return instance(config)
      })
    }

    return Promise.reject(error)
  })

export default instance
