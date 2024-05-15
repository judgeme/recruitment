<script setup lang="ts">
import { defineProps, withDefaults, defineModel, defineOptions, defineEmits } from 'vue';
import type { SelectHTMLAttributes } from 'vue';

import AppFormItem from '@/components/shared/AppFormItem/index.vue';

// extends SelectHTMLAttributes to have access to native input props
export interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
  id?: string;
  name?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  helperText?: string;
  placeholder?: string;
  autoComplete?: string;
  options?: {
    value: string;
    text: string;
  }[];
}

withDefaults(defineProps<Props>(), {
  autoComplete: 'off'
});

defineOptions({
  name: 'AppSelect', // set up display name in dev-tools
  inheritAttrs: false
});

defineEmits<{
  blur: [value: FocusEvent];
  'update:model-value': [value: string];
}>();

const modelValue = defineModel<string>({
	default: ''
});
</script>
<template>
  <app-form-item
    :htmlFor="id"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :required="required"
  >
    <span
      class="group relative block w-full"
      >
			<select
        v-model="modelValue"
        v-bind="$attrs"
        :class="invalid ? 'border-danger' : 'border-grey-60'"
        :id="id"
        :required="required"
        :name="name"
        :autocomplete="autoComplete"
        @blur="$emit('blur', $event)"
        class="appearance-none block w-full py-[15px] px-5 font-inherit font-light text-input text-grey-40 bg-white border outline-0 transition-colors focus:bg-fairy"
      >
        <slot>
          <option value="" selected class="opacity-10">{{ placeholder }}</option>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </slot>
      </select>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          class="size-5 stroke-zinc-500 group-has-[[data-disabled]]:stroke-zinc-600 sm:size-4 forced-colors:stroke-[CanvasText]"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M5.75 10.75L8 13L10.25 10.75"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M10.25 5.25L8 3L5.75 5.25"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>
    </span>
  </app-form-item>
</template>
