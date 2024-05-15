<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

import AppLink from '@/components/shared/AppLink/index.vue';

type Props = {
  shopUrl: string;
  imageUrl?: string;
  shopName: string;
  location?: string;
};

defineProps<Props>();
// set display name in dev-tools
defineOptions({
  name: 'AppShopCard'
});
</script>
<template>
  <div class="bg-white relative w-full overflow-hidden group">
    <!-- media section -->
    <app-link
      :to="shopUrl"
      class="w-full block h-50 relative overflow-hidden"
      :title="shopName"
    >
      <figure class="w-full h-full transition-all group-hover:opacity-70">
        <img :src="imageUrl" class="w-full h-full block" :alt="shopName" decoding="async" />
      </figure>
    </app-link>
    <!-- info section -->
    <div class="relative w-full mt-6 px-6 text-center">
      <p class="uppercase text-sm tracking-double text-primary mb-2">{{ shopName }}</p>
      <p class="uppercase text-xs text-primary mb-2">({{ location }})</p>
      <div class="font-semibold transition-all">
        <app-link :to="shopUrl" class="text-xs uppercase text-grey-80 transition-colors"
          >Visit Store</app-link
        >
      </div>
    </div>
  </div>
</template>
