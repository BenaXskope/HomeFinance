export const BASE_URL = '/api'

export default {
  CSRF: `${BASE_URL}/csrf`,
  AUTH: {
    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
    CHECK: `${BASE_URL}/test-auth`,
  },
  CATEGORIES: {
    BASE: `${BASE_URL}/category`,
    STATISTICS: `${BASE_URL}/category_stat`,
  },
  PAYOUTS: {
    BASE: `${BASE_URL}/payout`,
  },
  FAST_PAYOUTS: {
    BASE: `${BASE_URL}/fast_payout`,
  },
  CURRENCIES: {
    BASE: `${BASE_URL}/currency`,
  },
  GRAPH_POINTS: {
    BASE: `${BASE_URL}/graph_points`,
  },
}
