<script setup lang="ts">
import { defineOptions } from 'vue';

// set display name in dev-tools
defineOptions({
  name: 'AppFooter'
});
</script>
<template>
  <footer class="px-6 py-12 md:p-12 bg-primary absolute left-0 right-0 bottom-0 w-full">
    <div class="max-w-screen-xl px-6 mx-auto">
      <p class="text-white text-sm">Check Docs folder for project breakdown</p>
    </div>
  </footer>
</template>
