export const BASE_URL = '/api'

export default {
  CSRF: `${BASE_URL}/csrf`,
  AUTH: {
    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
  },
  CATEGORIES: {
    BASE: `${BASE_URL}/category`,
  },
  PAYOUTS: {
    BASE: `${BASE_URL}/payout`,
  },
  FAST_PAYOUTS: {
    BASE: `${BASE_URL}/fast_payout`,
  },
}