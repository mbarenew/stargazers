import axios, {AxiosInstance} from 'axios';

type RequestConfig = {
  headers?: Record<string, any>;
  params?: Record<string, any>;
};

export type HTTPResponse<T = any> = {
  data: T;
  headers?: Record<string, string>;
};

const BASE_URL = 'https://api.github.com/repos';

export class Api {
  private axiosClient: AxiosInstance;
  /**
   * Creates the api.
   */
  constructor() {
    const axiosClient = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
    });
    this.axiosClient = axiosClient;
  }

  async get(url: string, config?: RequestConfig): Promise<HTTPResponse> {
    const response = await this.axiosClient.get(`${BASE_URL}/${url}`, config);
    return response;
  }
}

export const api = new Api();
