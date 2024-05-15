<script setup lang="ts">
import { defineOptions, withDefaults, defineProps } from 'vue';

import AppLoader from '@/components/shared/AppLoader/index.vue';

// set display name in dev-tools
defineOptions({
  name: 'AppActivityLoader'
});

withDefaults(defineProps<{
  loading?: boolean
}>(), {
  loading: false
});
</script>
<template>
  <div class="relative w-full overflow-hidden min-h-50">
    <div v-if="loading" class="absolute inset-0 flex justify-center items-center z-10 bg-white/55">
      <app-loader />
    </div>
    <slot />
  </div>
</template>
