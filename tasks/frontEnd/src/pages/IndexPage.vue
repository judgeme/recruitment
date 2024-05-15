<script setup lang="ts">
import AppProductsListing from '@/feature/product/AppProductsListing.vue';
</script>
<template>
  <div
    class="bg-grey-light h-50 md:h-100 flex items-center justify-center max-w-screen-2xl mx-auto p-6"
  >
    <h1 class="text-3xl md:text-5xl text-center capitalize font-semibold">Product listing</h1>
  </div>
  <app-products-listing />
</template>
