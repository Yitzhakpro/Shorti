import { endpointsConfig } from '../../config';
import { createEnhancedClient } from '../../utils';
import { parseAxiosError } from '../utils';
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
      return null;
    }
  }

  public async login(email: string, password: string): Promise<UserInfo> {
    try {
      const resp = await this.axiosClient.post<UserInfo>('/login', { email, password });

      return resp.data;
    } catch (error: any) {
      const LOGIN_ERROR_CODES_TRANSLATION = {
        WRONG_CREDENTIALS_ERROR: 'Wrong credentials.',
        ERROR_FAILED_TO_RETRIVE_USER_INFO: 'Failed to login, try again later.',
      };

      return parseAxiosError(error, LOGIN_ERROR_CODES_TRANSLATION);
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
    } catch (error) {
      const REGISTER_ERROR_CODES_TRANSLATION = {
        USER_CREATE_VALIDATION_ERROR: 'Incorrect register values.',
        USER_CREATE_ERROR: 'Failed to register, try again later.',
      };

      return parseAxiosError(error, REGISTER_ERROR_CODES_TRANSLATION);
    }
  }

  public async logout(): Promise<'Ok'> {
    try {
      const resp = await this.axiosClient.post<'Ok'>('/logout');

      return resp.data;
    } catch (error) {
      return 'Ok';
    }
  }
}

export default new AuthService();
