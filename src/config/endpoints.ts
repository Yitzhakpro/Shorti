const { REACT_APP_API_URL } = process.env;

const endpointsConfig = {
  apiURL: REACT_APP_API_URL || 'http://localhost:8080',
};

export default endpointsConfig;
