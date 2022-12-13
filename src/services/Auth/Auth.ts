import { endpointsConfig } from '../../config';
import { createEnhancedClient } from '../../utils';
import type { UserInfo } from '../../types';
import type { AxiosInstance } from 'axios';

const { apiURL } = endpointsConfig;

class AuthService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = createEnhancedClient({
      baseURL: `${apiURL}/api/auth`,
      withCredentials: true,
    });
  }

  public async isLoggedIn(): Promise<UserInfo | null> {
    try {
      const resp = await this.axiosClient.get<UserInfo>('/isLoggedIn');

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant get is logged in user info');
    }
  }

  public async login(email: string, password: string): Promise<UserInfo> {
    try {
      const resp = await this.axiosClient.post<UserInfo>('/login', { email, password });

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant login');
    }
  }

  public async register(email: string, username: string, password: string): Promise<UserInfo> {
    try {
      const resp = await this.axiosClient.post<UserInfo>('/register', {
        email,
        username,
        password,
      });

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant register');
    }
  }

  public async logout(): Promise<'Ok'> {
    try {
      const resp = await this.axiosClient.post<'Ok'>('/logout');

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('Cant logout');
    }
  }
}

export default new AuthService();
