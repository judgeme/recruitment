<script setup lang="ts">
import { defineProps, withDefaults, defineOptions, computed, toRefs } from 'vue';
import type { ButtonHTMLAttributes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import AppLink from '@/components/shared/AppLink/index.vue';

// extends ButtonHTMLAttributes to have access to native button props
interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  as?: 'button' | 'a';
  to?: RouteLocationRaw;
}

// set display name in dev-tools
defineOptions({
  name: 'AppButton'
});

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  as: 'button',
  to: ''
});

const { disabled, variant, fullWidth, loading } = toRefs(props);

const buttonClass = `
  py-3 px-6 md:px-9 border-2 border-transparent 
  appearance-none font-inherit inline-block
  align-middle outline-0 text-tiny 
  tracking-compact font-bold uppercase 
  transition-colors text-center
`;

const computedClass = computed(() => {
  return [
    buttonClass,
    {
      'cursor-pointer': !disabled.value,
      'bg-secondary hover:bg-secondary/80 text-primary': variant.value === 'secondary',
      'bg-danger hover:bg-danger/80 text-white': variant.value === 'danger',
      'bg-transparent text-black hover:text-black-80': variant.value === 'outline',
      'bg-primary hover:bg-black-80 text-white': variant.value === 'primary',
      'w-full': fullWidth.value,
      'bg-primary/70 hover:bg-primary/70': loading.value,
      'cursor-not-allowed opacity-70': disabled.value
    }
  ];
});
</script>
<template>
  <app-link v-if="as === 'a'" :to="to" :class="computedClass">
    <slot />
  </app-link>
  <button v-else :class="computedClass" :disabled="disabled">
    <slot />
  </button>
</template>
