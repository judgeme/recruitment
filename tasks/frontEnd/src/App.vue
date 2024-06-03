<script setup lang="ts">
import { RouterView } from 'vue-router'
import locales from '@ownego/polaris-vue/dist/locales/en.json'
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'

  

</script>

<template>
  <AppProvider :i18n="locales" class="body">
    <NavBar />
    <main class="container">
      <RouterView />
    </main>
    <FooterComponent/>
  </AppProvider>
</template>

<style lang="scss" scoped>
.container {
  padding: 0.5rem 0.5rem;

  @media (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
