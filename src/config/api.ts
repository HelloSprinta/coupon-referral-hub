export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    COUPONS: {
      MY_COUPONS: '/refferals/coupons/my-coupons',
      CREATE: '/refferals/coupons',
      BY_ORGANIZATION: '/refferals/coupons',
      FORM_DATA: '/refferals/coupons/form-data'
    },
    ORGANIZATIONS: {
      MINE: '/organizations/mine'
    }
  },
  HEADERS: {
    'Content-Type': 'application/json'
  }
};


export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('authToken') || '';
  return {
    ...API_CONFIG.HEADERS,
    'Authorization': `Bearer ${token}`
  };
};
