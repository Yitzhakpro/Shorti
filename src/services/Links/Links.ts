import { endpointsConfig } from '../../config';
import { createEnhancedClient } from '../../utils';
import type { UrlInfo } from '../../types';
import type { UrlInfoResponse } from './types';
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

  public async getOwnShortUrls(): Promise<UrlInfo[]> {
    try {
      const resp = await this.axiosClient.get<UrlInfoResponse[]>('/getUrls');
      const urlsInfo: UrlInfo[] = resp.data.map((urlInfo) => {
        const { id, fullUrl: responseFullUrl, linkId, views, createdAt } = urlInfo;

        return {
          id,
          fullUrl: responseFullUrl,
          linkId,
          views,
          createdAt: new Date(createdAt),
        };
      });

      return urlsInfo;
    } catch (err) {
      console.log(err);
      throw new Error('cant get own short url');
    }
  }

  // TODO: add response type object
  public async createShortUrl(fullUrl: string): Promise<UrlInfo> {
    try {
      const resp = await this.axiosClient.post<UrlInfoResponse>('/createShortUrl', { fullUrl });
      const { id, fullUrl: responseFullUrl, linkId, views, createdAt } = resp.data;

      return {
        id,
        fullUrl: responseFullUrl,
        linkId,
        views,
        createdAt: new Date(createdAt),
      };
    } catch (err) {
      console.log(err);
      throw new Error('cant create new short url');
    }
  }
}

export default new LinksService();
