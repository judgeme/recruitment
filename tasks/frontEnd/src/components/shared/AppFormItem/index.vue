<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

type Props = {
  htmlFor?: string;
  label?: string;
  helperText?: string;
  invalid?: boolean;
  required?: boolean;
};

// set display name in dev-tools
defineOptions({
  name: 'AppFormItem'
});

defineProps<Props>();
const labelclass = 'block tracking-wide text-primary text-anchor font-medium mt-0';
</script>
<template>
  <div class="mb-2.5 w-full">
    <div class="relative">
      <slot name="label-tag">
        <label v-if="label" :class="`${labelclass} mb-1`" :for="htmlFor">
          <span class="text-ellipsis">{{ label }}</span>
          <span v-if="required" class="whitespace-nowrap ml-1">*</span>
        </label>
      </slot>
      <slot />
    </div>
    <div
      v-if="helperText"
      role="alert"
      class="text-xs mt-0.5"
      :class="invalid ? 'text-danger italic' : 'text-primary'"
    >
      {{ helperText }}
    </div>
  </div>
</template>
