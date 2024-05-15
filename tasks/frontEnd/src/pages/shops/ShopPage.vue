<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';

import AppShopCard from '@/components/shared/AppCard/AppShopCard.vue';
import AppTextField from '@/components/shared/AppTextField/index.vue';
import AppSelect from '@/components/shared/AppSelect/index.vue';
import AppPagination from '@/components/shared/AppPagination/index.vue';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';

import ShopService from '@/services/shop';
import type { ShopModel } from '@/models';
import { debounce } from '@/utils';

type Params = {
  search: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
};

const loading = ref(true);

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

const shops = ref<ShopModel[]>([]);
// create new instance of shop service
const shopService = new ShopService();

async function getAllShops(params: Params) {
  loading.value = true;
  try {
    const response = await shopService.getShops(params);
    shops.value = response.data.items;
    totalCount.value = response.data.count;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    // handle errors here..
  }
}

// fetch shops when pagination page changes
const onPageChange = (num: number) => {
  // update params
  params.page = num;
  // fetch all shops
  getAllShops(params);
};

// fetch shops when user search for a match
const onSearch = debounce((value: string) => {
  // update params
  params.search = value;
  params.page = 1;
  // fetch all shops
  getAllShops(params);
}, 800);

const onSortBy = (value: string) => {
  // update params
  params.sortBy = value;
  params.page = 1;
  // fetch all shops
  getAllShops(params);
};

onMounted(() => {
  // fetch all shop on initial load...
  getAllShops(params);
});

onUnmounted(() => {
  shopService.destroy(); // clear all timers
});
</script>
<template>
  <div
    class="bg-grey-light h-50 md:h-100 flex items-center justify-center max-w-screen-2xl mx-auto p-6"
  >
    <h1 class="text-3xl md:text-5xl text-center capitalize font-semibold">Shop listing</h1>
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
          placeholder="sort by"
          :options="[
            { value: 'shopName', text: 'Shop Name' },
            { value: 'location', text: 'Location' }
          ]"
          :model-value="params.sortBy"
          @update:model-value="onSortBy"
        />
      </div>
    </div>
    <!-- shops -->
    <app-activity-loader :loading="loading">
      <div class="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
        <app-shop-card
          v-for="shop in shops"
          :key="shop.id"
          :shop-name="shop.shopName"
          :image-url="shop.imageUrl"
          :location="shop.location"
          :shop-url="`/shop/${shop.id}`"
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
