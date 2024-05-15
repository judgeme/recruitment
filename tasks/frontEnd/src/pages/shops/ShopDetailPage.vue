<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ShopService from '@/services/shop';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';
import AppProductsListing from '@/feature/product/AppProductsListing.vue';

import type { ShopModel } from '@/models';

const route = useRoute();
const shopService = new ShopService();

const shop = ref<ShopModel>();
const loading = ref(false);

async function getShop(shopId: string) {
  loading.value = true;
  try {
    const response = await shopService.getShop(shopId);
    shop.value = response.data;
  } catch (err) {
    // todo add a ui toaster
  } finally {
    loading.value = false;
  }
}

// watch the params of the route to fetch the data again
watch(
  () => route.params.id,
  (newId) => {
    getShop(newId as string);
  },
  { immediate: true }
);
</script>
<template>
  <div class="bg-fairy flex items-center justify-center">
    <app-activity-loader :loading="loading">
      <div
        class="max-w-screen-xl px-4 py-20 lg:py-40 mx-auto flex flex-col lg:flex-row justify-center lg:items-center"
      >
        <div>
          <h1 class="text-primary text-heading-3 font-bold mb-2">{{ shop?.shopName }}</h1>
          <p class="font-light text-sm text-grey-40">
            {{ shop?.shopDescription }}
          </p>
          <p class="font-light text-sm italic text-grey-40">({{ shop?.location }})</p>
        </div>
      </div>
    </app-activity-loader>
  </div>
  <!-- products -->
  <app-products-listing v-if="shop?.id" :shop-id="shop?.id" />
</template>
