// API utility for consistent base URL handling
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production
  : 'http://localhost:5000';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default apiCall;
