import type { AxiosResponse } from 'axios';

import HttpClient from ".";
import type { ShopModel } from '@/models';

type ResponseType = {
  requestId: string
  items: ShopModel[]
  count: number
}

class ShopService extends HttpClient {
  timeoutRef: NodeJS.Timeout | null = null;

  async getShops(params?: Record<string, unknown>) {
    // prepare the key for localstorage...
    const cacheKey = JSON.stringify({
      ...params,
      key: 'SHOP_API'
    });

    // Check if data is already in localStorage
    const record = localStorage.getItem(cacheKey);
    // if there's a record use it 
    if (record) {
      const items = JSON.parse(record) as ResponseType;
      const response = {
        data: items,
        status: 200,
      } as AxiosResponse<ResponseType>;

      return new Promise<AxiosResponse<ResponseType, any>>((resolve) => {
        // add set time out to mimic normal request 
        this.timeoutRef = setTimeout(() => {
          resolve(response);
        }, 1000);
      });
    }

    // make api call if no existing data found
    const response = await this.get<ResponseType>('/shops', {
      params
    });

    // save the new data to local storage
    localStorage.setItem(cacheKey, JSON.stringify(response.data));

    return new Promise<AxiosResponse<ResponseType, any>>((resolve) => {
      resolve(response);
    });
  }
  
  // clear timeout to prevent leakage
  destroy() {
    if(this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }
}

export default ShopService;