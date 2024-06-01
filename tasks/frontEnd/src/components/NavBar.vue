<script lang="ts" setup>
import logo from '@/assets/images/judgemelogo.avif'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar" id="navbar">
    <div class="logo">
      <span>
        <img :src="logo" alt="Judge me logo" />
      </span>
    </div>
    <RouterLink to="/"> <div class="title">Manage Reviews</div></RouterLink>
  </nav>
  <Divider  borderColor="border" borderWidth="050"/>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.navbar {
  display: flex;
  padding: 16px;
  gap: 0.5rem;
}

.title {
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.logo {
  display: flex;
  align-items: center;
}

span {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 0.35rem;
}
</style>
