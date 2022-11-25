import { endpointsConfig } from '../config';
import { createEnhancedClient } from '../utils';
import type { AxiosInstance } from 'axios';

const { apiURL } = endpointsConfig;

class AuthService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = createEnhancedClient({ baseURL: `${apiURL}/api/auth`, withCredentials: true });
  }

  public async isLoggedIn(): Promise<boolean> {
    try {
      const resp = await this.axiosClient.get<boolean>('/isLoggedIn');

      return resp.data;
    } catch (err) {
      throw new Error('Cant get is logged in info');
    }
  }
}

export default new AuthService();
