import axios from 'axios';
import type { AxiosInstance, CreateAxiosDefaults } from 'axios';

const createEnhancedClient = (axiosConfig?: CreateAxiosDefaults): AxiosInstance => {
  const client = axios.create(axiosConfig);

  return client;
};

export default createEnhancedClient;
