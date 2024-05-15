<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

import AppIcon from '@/components/shared/AppIcon/index.vue';
import AppLink from '@/components/shared/AppLink/index.vue';

type Props = {
  productUrl: string;
  shopUrl: string;
  imageUrl?: string;
  productName: string;
  price: string | number;
  extras?: {
    status: string;
    discount: string;
  };
};

defineProps<Props>();
// set display name in dev-tools
defineOptions({
  name: 'AppProductCard'
});
</script>
<template>
  <div class="bg-white relative w-full overflow-hidden group">
    <!-- media section -->
    <app-link
      :to="productUrl"
      class="w-full block h-[380px] relative overflow-hidden"
      :title="productName"
    >
      <figure class="w-full h-full transition-all group-hover:opacity-70">
        <img :src="imageUrl" class="w-full h-full block" :alt="productName" decoding="async" />
      </figure>
      <div v-if="extras" class="absolute top-0 left-0 right-0 py-4 px-6 flex justify-between">
        <span class="text-primary text-tiny leading-6 tracking-[1px] font-medium">{{
          extras.status
        }}</span>
        <span class="text-primary text-tiny leading-6 tracking-[1px] font-medium">{{
          extras.discount
        }}</span>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 w-full px-4 flex justify-center items-center h-7 transition-all md:translate-y-full md:group-hover:translate-y-0"
      >
        <span
          class="inline-flex items-center bg-black text-white py-0.5 px-4 text-small font-bold h-full uppercase tracking-mono"
        >
          <span>Quick Look</span>
        </span>
        <span
          class="relative inline-flex align-middle m-0 py-0.5 px-2 bg-grey-deep justify-center items-center h-full text-center text-white"
        >
          <app-icon icon="eye" :size="16" viewBox="0 0 512 512" />
        </span>
      </div>
    </app-link>
    <!-- info section -->
    <div class="relative w-full mt-6 px-6 text-center">
      <p class="uppercase text-sm tracking-double text-primary mb-2">{{ productName }}</p>
      <div
        class="text-grey-80 text-sm transition-all md:opacity-100 md:group-hover:opacity-0 md:group-hover:translate-x-15"
      >
        <bdi>
          <span>$</span>
          {{ price }}
        </bdi>
      </div>
      <div
        class="font-semibold md:absolute md:bottom-0 md:left-1/2 transition-all md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-x-1/2 md:-translate-x-full"
      >
        <app-link :to="shopUrl" class="text-xs uppercase text-grey-80 transition-colors"
          >Visit Store</app-link
        >
      </div>
    </div>
  </div>
</template>
