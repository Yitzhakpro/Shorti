import { endpointsConfig } from '../../config';
import { createEnhancedClient } from '../../utils';
import type { AxiosInstance } from 'axios';

const { apiURL } = endpointsConfig;

class LinksService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = createEnhancedClient({
      baseURL: `${apiURL}/api/links`,
      withCredentials: true,
    });
  }

  public async getOwnShortUrls(): Promise<any[]> {
    try {
      const resp = await this.axiosClient.get('/getShortUrls');

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('cant get own short url');
    }
  }

  // TODO: add response type object
  public async createShortUrl(fullUrl: string): Promise<any> {
    try {
      const resp = await this.axiosClient.post('/createShortUrl', { fullUrl });

      return resp.data;
    } catch (err) {
      console.log(err);
      throw new Error('cant create new short url');
    }
  }
}

export default new LinksService();
