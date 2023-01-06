const { VITE_API_URL } = import.meta.env;

const endpointsConfig = {
  apiURL: VITE_API_URL || 'http://localhost:8080',
};

export default endpointsConfig;
