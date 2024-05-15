<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue';
import AppFooter from '@/components/AppFooter/index.vue';
</script>

<template>
  <section class="py-27 md:py-29">
    <app-header />
    <router-view />
  </section>
  <app-footer />
</template>
