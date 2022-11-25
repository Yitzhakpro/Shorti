import { endpointsConfig } from '../config';
import { createEnhancedClient } from '../utils';
import type { AxiosInstance } from 'axios';

const { apiURL } = endpointsConfig;

class AuthService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = createEnhancedClient({ baseURL: `${apiURL}/api/auth`, withCredentials: true });
  }

  // TODO: add type of user info
  public async isLoggedIn(): Promise<any> {
    try {
      const resp = await this.axiosClient.get<any>('/isLoggedIn');

      return resp.data;
    } catch (err) {
      throw new Error('Cant get is logged in user info');
    }
  }
}

export default new AuthService();
