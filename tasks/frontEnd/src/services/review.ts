import type { AxiosResponse } from 'axios';

import HttpClient from ".";
import type { ProductModel, ReviewModel } from '@/models';

type ResponseType = {
  requestId: string
  items: ReviewModel[]
  count: number
}

class ReviewService extends HttpClient {
  timeoutRef: NodeJS.Timeout | null = null;

  async getReviews(args: {
    productId: string, shopId: string, params: Record<string, unknown>
  }) {
    const {
      productId,
      shopId,
      params
    } = args;
    // prepare the key for localstorage...
    const cacheKey = JSON.stringify({
      ...params,
      key: 'REVIEW_API'
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
    const response = await this.get<ResponseType>(`/shops/${shopId}/products/${productId}/reviews`, {
      params
    });

    // save the new data to local storage
    localStorage.setItem(cacheKey, JSON.stringify(response.data));

    return new Promise<AxiosResponse<ResponseType, any>>((resolve) => {
      resolve(response);
    });
  }

  async addReview(review: Omit<ReviewModel, 'id'>, product: ProductModel) {
    const { id: productId, shopId } = product;
    return this.post(`/shops/${shopId}/products/${productId}/reviews`, review);
  }

  async editReview(review: ReviewModel, product: ProductModel) {
    const { id: productId, shopId } = product;
    return this.put(`/shops/${shopId}/products/${productId}/reviews/${review.id}`, review);
  }

  async deleteReview(reviewId: string, product: ProductModel) {
    const { id: productId, shopId } = product;
    return this.delete(`/shops/${shopId}/products/${productId}/reviews/${reviewId}`);
  }

  // clear timeout to prevent leakage
  destroy() {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }
}

export default ReviewService;