<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
  name: 'AppCard'
});
</script>
<template>
  <div class="w-full block bg-white p-6">
    <slot />
  </div>
</template>