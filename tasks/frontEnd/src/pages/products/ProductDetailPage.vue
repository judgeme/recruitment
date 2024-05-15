<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppButton from '@/components/shared/AppButton/index.vue';
import AppReviewTemplate from '@/feature/review/AppReviewTemplate.vue';
import ProductService from '@/services/product';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';
import AppReviewForm from '@/feature/review/AppReviewForm.vue';

import type { ProductModel } from '@/models';

const route = useRoute();
const productService = new ProductService();

const product = ref<ProductModel>();
const loading = ref(false);
const showAddReviewModal = ref(false);

async function getProduct(productId: string) {
  loading.value = true;
  try {
    const response = await productService.getProduct(productId);
    product.value = response.data;
  } catch (err) {
    // error handling
  } finally {
    loading.value = false;
  }
}

// watch the params of the route to fetch the data again
watch(
  () => route.params.id,
  (newId) => {
    getProduct(newId as string);
  },
  { immediate: true }
);

const onAddReview = () => {
  showAddReviewModal.value = true;
};
const onHideReviewModal = () => {
  showAddReviewModal.value = false;
};
</script>
<template>
  <div class="bg-fairy flex items-center justify-center">
    <app-activity-loader :loading="loading">
      <div
        class="max-w-screen-xl mx-auto px-6 pt-25 pb-40 flex justify-between items-center gap-40"
      >
        <figure class="w-[530px] h-[530px] overflow-hidden">
          <img
            :src="product?.imageUrl"
            class="w-full h-full block"
            :alt="product?.name"
            decoding="async"
          />
        </figure>
        <div class="flex-1">
          <h1 class="text-primary text-heading-3 font-bold mb-2">{{ product?.name }}</h1>
          <p class="text-primary text-lg mb-15">
            <bdi>
              <span>$</span>
              {{ product?.price }}
            </bdi>
          </p>
          <p class="font-light text-sm text-grey-40 mb-9">
            {{ product?.description }}
          </p>

          <ul class="flex gap-6 items-center">
            <li>
              <app-button as="a" :to="`/shop/${product?.shopId}`" class="!leading-[13px]"
                >Visit Store</app-button
              >
            </li>
            <li>
              <app-button class="!leading-[13px]" variant="secondary" @click="onAddReview"
                >Add Review
              </app-button>
            </li>
          </ul>
        </div>
      </div>
    </app-activity-loader>
  </div>

  <!-- review template here -->
  <app-review-template v-if="product" :product="product" />
  <!-- add review modal -->
  <app-review-form
    v-if="product"
    :show-modal="showAddReviewModal"
    :product="product as ProductModel"
    @hide="onHideReviewModal"
  />
</template>
