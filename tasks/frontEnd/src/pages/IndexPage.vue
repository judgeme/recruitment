<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';

import AppProductCard from '@/components/shared/AppCard/AppProductCard.vue';
import AppTextField from '@/components/shared/AppTextField/index.vue';
import AppSelect from '@/components/shared/AppSelect/index.vue';
import AppPagination from '@/components/shared/AppPagination/index.vue';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';

import ProductService from '@/services/product';
import type { ProductModel } from '@/models';
import { debounce } from '@/utils';

type Params = {
  search: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
};

const loading = ref(false);

// search params...
const params = reactive({
  search: '',
  sortBy: '',
  order: 'asc',
  page: 1,
  limit: 5
});

// pagination options
const totalCount = ref(0);

const products = ref<ProductModel[]>([]);
// create new instance of product service
const productService = new ProductService();

async function getAllProducts(params: Params) {
  loading.value = true;
  try {
    const response = await productService.getProducts(params);
    products.value = response.data.items;
    totalCount.value = response.data.count;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    // handle errors here..
  }
}

// fetch products when pagination page changes
const onPageChange = (num: number) => {
  // update params
  params.page = num;
  // fetch all products
  getAllProducts(params);
};

// fetch products when user search for a match
const onSearch = debounce((value: string) => {
  // update params
  params.search = value;
  params.page = 1;
  // fetch all products
  getAllProducts(params);
}, 800);

const onSortBy = (value: string) => {
  // update params
  params.sortBy = value;
  params.page = 1;
  // fetch all products
  getAllProducts(params);
};

onMounted(() => {
  // fetch all product on initial load...
  getAllProducts(params);
});

onUnmounted(() => {
  productService.destroy(); // clear all timers
});
</script>
<template>
  <div
    class="bg-grey-light h-50 md:h-100 flex items-center justify-center max-w-screen-2xl mx-auto p-6"
  >
    <h1 class="text-3xl md:text-5xl text-center capitalize font-semibold">Product listing</h1>
  </div>
  <div class="max-w-screen-xl px-6 mx-auto mt-20">
    <!-- filters -->
    <div class="flex gap-6 justify-end px-6 md:p-0 mb-10">
      <div class="w-1/2 md:w-50">
        <app-text-field
          aria-label="search items"
          name="search"
          placeholder="search"
          :model-value="params.search"
          @update:model-value="onSearch"
        />
      </div>
      <div class="w-1/2 md:w-50">
        <app-select
          aria-label="sort items"
          name="sort"
          placeholder="Sort Products"
          :options="[
            { value: 'name', text: 'Product Name' },
            { value: 'price', text: 'Price' }
          ]"
          :model-value="params.sortBy"
          @update:model-value="onSortBy"
        />
      </div>
    </div>
    <!-- products -->
    <app-activity-loader :loading="loading">
      <div class="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
        <app-product-card
          v-for="product in products"
          :key="product.id"
          :product-name="product.name"
          :price="product.price"
          :image-url="product.imageUrl"
          :product-url="`/product/${product.id}`"
          :shop-url="`/shop/${product.shopId}`"
        />
      </div>
    </app-activity-loader>
    <!-- pagination -->
    <div class="flex justify-end mt-10">
      <app-pagination
        :total-count="totalCount"
        :current-page="params.page"
        :page-size="params.limit"
        @onPageChange="onPageChange"
      />
    </div>
  </div>
</template>
