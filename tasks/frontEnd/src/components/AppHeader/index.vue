<script setup lang="ts">
import { ref, watch, type Events } from 'vue';
import { useRoute } from 'vue-router';

import AppIcon from '@/components/shared/AppIcon/index.vue';
import AppLink from '@/components/shared/AppLink/index.vue';

const linkClass = `
  flex text-black-70 text-link 
  font-bold uppercase tracking-2px 
  m-0 hover:text-grey-40  
  font-bold tracking-link
  no-underline inline-flex 
  items-center gap-1 transition-colors
`;

const open = ref(false);
const route = useRoute();

function toggleMenu() {
  open.value = !open.value;
}

// close menu when click out the menu
function onCloseMenu(event: Events['onClick']) {
  const element = (event.target as HTMLElement).dataset.nonActive;
  if (element) {
    open.value = false;
  }
}

// close mobile menu if it's open when route changes
watch(
  () => route.fullPath,
  async () => {
    open.value = false;
  }
);
const user = {
  displayName: 'samson',
  email: 'samsoniyanda@yahoo.com'
};
</script>
<template>
  <header class="fixed top-0 left-0 right-0 w-full bg-white shadow-sm z-50">
    <div class="max-w-screen-xl mx-auto">
      <nav
        class="header__nav flex flex-wrap md:flex-nowrap justify-between md:justify-normal items-center lg:items-center px-6 py-7 md:py-8"
        aria-label="Main navigation"
      >
        <ul
          class="hidden md:flex flex-wrap md:justify-center p-0 m-0 list-none flex-row gap-5 md:gap-9 mb-5 md:mb-0"
        >
          <li class="flex justify-center text-center basis-full md:basis-auto">
            <app-link to="/" :class="linkClass" active-class="!text-grey-40">Products</app-link>
          </li>
          <li class="flex justify-center text-center basis-full md:basis-auto">
            <app-link to="/shops" :class="linkClass" active-class="!text-grey-40">Shops</app-link>
          </li>
        </ul>
        <ul
          class="flex relative flex-wrap md:justify-center p-0 m-0 list-none flex-row gap-5 md:gap-9 md:ml-auto"
          :class="user ? 'md:left-0' : 'md:-left-13'"
        >
          <li class="flex justify-center text-center basis-full md:basis-auto">
            <app-link
              to="/"
              class="flex text-white hover:text-primary transition-colors text-2xl font-bold uppercase tracking-2px m-0 py-1.5px"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:v="https://vecta.io/nano"
                width="52"
                height="52"
                fill="none"
              >
                <g clip-path="url(#D)">
                  <path d="M52 0H0V52H52V0Z" fill="url(#B)" />
                  <path
                    d="M31.026 36.363V7.726h3.182l14.319 44.547H27.844l-11.137-9.546 14.319-6.364z"
                    fill="url(#C)"
                  />
                  <g filter="url(#A)">
                    <path
                      d="M34.566 7.713v24.755c0 6.503-5.243 11.818-11.748 11.818S11.07 38.971 11.07 
                      32.468h6.783c0 2.727 2.238 4.965 4.965 4.965s4.965-2.238 4.965-4.965V14.497h-4.965V7.713h11.748z"
                      fill="currentColor"
                    />
                  </g>
                </g>

                <defs>
                  <filter
                    id="A"
                    x="-12.93"
                    y="-8.287"
                    width="63.496"
                    height="76.573"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="A" />
                    <feColorMatrix
                      in="SourceAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="B"
                    />
                    <feOffset dx="-4" dy="4" />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="B" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="A" />
                    <feBlend in="SourceGraphic" />
                  </filter>
                  <linearGradient
                    id="B"
                    x1="26"
                    y1="0"
                    x2="26"
                    y2="52"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#399" />
                    <stop offset="1" stop-color="#2d8396" />
                  </linearGradient>
                  <radialGradient
                    id="C"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(32.6165 29.9994) rotate(63.8254) scale(42.3301 30.2358)"
                  >
                    <stop stop-color="#395f5f" />
                    <stop offset="1" stop-color="#278888" stop-opacity="0" />
                  </radialGradient>
                  <clipPath id="D"><path fill="#fff" d="M0 0h52v52H0z" /></clipPath>
                  <clipPath id="E">
                    <path fill="#fff" transform="translate(62 11)" d="M0 0h148v33H0z" />
                  </clipPath>
                </defs>
              </svg>
            </app-link>
          </li>
        </ul>
        <ul
          class="hidden md:flex flex-wrap md:justify-center p-0 m-0 list-none flex-row gap-5 md:gap-9 md:mb-0 md:ml-auto"
        >
          <li v-if="user" class="flex justify-center text-center basis-full md:basis-auto">
            <button aria-label="username" role="button" :class="linkClass">
              <app-icon icon="user" :size="24" viewBox="0 0 512 512" />
              <span>{{ user.displayName || user.email }}</span>
            </button>
          </li>
          <li v-if="user" class="flex justify-center text-center basis-full md:basis-auto">
            <button aria-label="log out" :class="linkClass" type="button">Sign out</button>
          </li>
          <li v-else class="flex justify-center text-center basis-full md:basis-auto">
            <app-link
              :to="route.name === 'login' ? '/register' : '/login'"
              :class="linkClass"
              active-class="!text-grey-40"
            >
              {{ route.name === 'login' ? 'Sign Up' : 'Login' }}
            </app-link>
          </li>
        </ul>
        <button aria-label="menu" type="button" class="md:hidden" @click="toggleMenu">
          <app-icon icon="hamburger" :size="40" viewBox="0 0 512 512" />
        </button>
      </nav>
    </div>
    <!-- mobile menu -->
    <div
      class="fixed md:hidden transition-all top-0 bottom-0 right-0 h-full w-full bg-primary/10"
      :class="open ? 'translate-x-0' : 'translate-x-full'"
      data-non-active="true"
      @click="onCloseMenu"
    >
      <div class="w-4/5 h-full relative ml-auto py-14 bg-primary">
        <div
          class="absolute w-full top-0 left-0 right-0 flex flex-nowrap justify-between items-center"
        >
          <span
            v-if="user"
            aria-label="username"
            role="button"
            class="text-white text-link font-bold tracking-link no-underline inline-flex items-center gap-1 px-4 overflow-hidden"
          >
            <app-icon icon="user" :size="24" viewBox="0 0 512 512" />
            <span class="truncate">{{ user.displayName || user.email }}</span>
          </span>
          <button aria-label="menu" type="button" class="text-white p-2" @click="toggleMenu">
            <app-icon icon="close" :size="40" viewBox="0 0 512 512" />
          </button>
        </div>
        <ul class="p-0 m-0 list-none flex flex-col gap-4 mt-10">
          <li class="flex justify-center text-center basis-full md:basis-auto">
            <app-link
              to="/"
              class="text-white text-link font-bold tracking-link no-underline"
              active-class="!text-white/50"
              >Products</app-link
            >
          </li>
          <li class="flex justify-center text-center basis-full md:basis-auto">
            <app-link
              to="/shops"
              class="text-white text-link font-bold tracking-link no-underline"
              active-class="!text-white/50"
              >Shops</app-link
            >
          </li>
          <li v-if="user" class="flex justify-center text-center basis-full md:basis-auto">
            <button
              aria-label="log out"
              class="text-white text-link font-bold tracking-link no-underline"
              type="button"
            >
              Sign Out
            </button>
          </li>
          <li v-else class="flex justify-center text-center basis-full md:basis-auto">
            <app-link
              :to="route.name === 'login' ? '/register' : '/login'"
              class="text-white text-link font-bold tracking-link no-underline"
              active-class="!text-white/50"
            >
              {{ route.name === 'login' ? 'Sign Up' : 'Login' }}
            </app-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
