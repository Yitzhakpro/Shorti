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
      console.log(err);
      throw new Error('Cant get is logged in user info');
    }
  }

  // TODO: add type of user info
  public async login(email: string, password: string): Promise<any> {
    try {
      const resp = await this.axiosClient.post<any>('/login', { email, password });

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant login');
    }
  }

  public async register(email: string, username: string, password: string): Promise<any> {
    try {
      const resp = await this.axiosClient.post<any>('/register', { email, username, password });

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant register');
    }
  }
}

export default new AuthService();
