export const BASE_URL = '/api'

export default {
  CSRF: `${BASE_URL}/csrf`,
  AUTH: {
    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
  },
  CATEGORIES: {
    ALL: `${BASE_URL}/category`,
  },
}
