<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import AppButton from '@/components/shared/AppButton/index.vue';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';
import AppReviewCard from '@/components/shared/AppCard/AppReviewCard.vue';
import AppPagination from '@/components/shared/AppPagination/index.vue';
import AppSelect from '@/components/shared/AppSelect/index.vue';
import AppReviewForm from '@/feature/review/AppReviewForm.vue';
import type { ProductModel, ReviewModel } from '@/models';
import ReviewService from '@/services/review';

interface Props {
  product: ProductModel;
}

type Params = {
  search: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
};

const props = defineProps<Props>();
const reviewService = new ReviewService();

const loading = ref(false);

// use review for update purpose
const review = ref<ReviewModel>();
const showAddReviewModal = ref(false);

// use reviews for listing purpose
const reviews = ref<ReviewModel[]>([]);
const params = reactive({
  search: '',
  sortBy: '',
  order: 'asc',
  page: 1,
  limit: 3
});

// pagination options
const totalCount = ref(0);

async function getReviews(args: { productId: string; shopId: string; params: Params }) {
  loading.value = true;

  try {
    const response = await reviewService.getReviews(args);
    reviews.value = response.data.items;
    totalCount.value = response.data.count;
  } catch (err) {
    //
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.product,
  (newProduct) => {
    const { shopId, id } = newProduct;
    getReviews({
      productId: id,
      shopId,
      params
    });
  },
  { immediate: true }
);

// fetch reviews when pagination page changes
const onPageChange = (num: number) => {
  // update params
  params.page = num;
  const { shopId, id } = props.product;
  // fetch all reviews
  getReviews({
    productId: id,
    shopId,
    params
  });
};

const onSortBy = (value: string) => {
  // update params
  params.sortBy = value;
  params.page = 1;
  const { shopId, id } = props.product;
  // fetch all reviews
  getReviews({
    productId: id,
    shopId,
    params
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpenImage = (_img: string) => {
  // todo:  add implementation to view images
};

const onEditReview = (record: ReviewModel) => {
  review.value = record;
  showAddReviewModal.value = true;
};

const onHideReviewModal = () => {
  showAddReviewModal.value = false;
};

const onDeleteReview = async (reviewId: string) => {
  const confirmed = window.confirm('Are you sure you want to do this?');
  if (!confirmed) {
    return;
  }
  const product = props.product;
  try {
    await reviewService.deleteReview(reviewId, product);
    // get all the reviews again...
    const { shopId, id } = product;
    getReviews({
      productId: id,
      shopId,
      params
    });
  } catch (error) {
    // error reporter
  }
};
</script>
<template>
  <div class="-mt-15">
    <ul class="max-w-screen-xl mx-auto px-6">
      <li>
        <app-button type="button" class="h-15">Reviews</app-button>
      </li>
    </ul>
  </div>
  <app-activity-loader :loading="loading">
    <div class="bg-white py-25 border-grey-60 border-b border-t">
      <div class="max-w-screen-xl mx-auto px-6">
        <!-- filters -->
        <div class="flex gap-6 justify-end px-6 md:p-0 mb-10">
          <div class="w-1/2 md:w-50">
            <app-select
              aria-label="sort items"
              name="sort"
              placeholder="Sort Reviews"
              :options="[
                { value: 'productName', text: 'Product Name' },
                {
                  value: 'createdAt',
                  text: 'Created Date'
                }
              ]"
              :model-value="params.sortBy"
              @update:model-value="onSortBy"
            />
          </div>
        </div>
        <!-- reviews here -->
        <div class="mb-12">
          <app-review-card
            v-for="review in reviews"
            :key="review.id"
            v-bind="review"
            @open-image="onOpenImage"
            @on-edit-review="onEditReview"
            @on-delete-review="onDeleteReview"
          />
        </div>
        <div class="flex justify-end mt-10">
          <app-pagination
            :total-count="totalCount"
            :current-page="params.page"
            :page-size="params.limit"
            @on-page-change="onPageChange"
          />
        </div>
      </div>
    </div>
  </app-activity-loader>
  <!-- modals for editing review take note mode is edit -->
  <app-review-form
    v-if="product"
    mode="edit"
    :show-modal="showAddReviewModal"
    :product="product as ProductModel"
    :review="review"
    @hide="onHideReviewModal"
  />
</template>
