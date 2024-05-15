<script setup lang="ts">
import { defineProps, withDefaults, defineOptions, type InputHTMLAttributes } from 'vue';

import AppIcon from '@/components/shared/AppIcon/index.vue';
import AppFormItem from '@/components/shared/AppFormItem/index.vue';

export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  name?: string;
  disabled?: boolean;
  value?: string;
  label?: string;
  id?: string;
  helperText?: string;
  invalid?: boolean;
  required?: boolean;
}

defineOptions({ name: 'AppCheckbox', inheritAttrs: false });

withDefaults(defineProps<Props>(), {});

const modelValue = defineModel();
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
      class="
        inline-flex items-center 
        justify-center relative 
        bg-transparent outline-none 
        border-none m-0 cursor-pointer 
        select-none align-middle appearance-none 
        no-underline rounded-full"
    >
      <input
        v-model="modelValue"
        v-bind="$attrs"
        class="absolute opacity-0 w-full h-full inset-0 m-0 p-0 z-1"
        type="checkbox"
        :name="name"
        :value="value"
        :id="id"
      />

      <div
        v-if="modelValue"
        class="w-6 h-6 rounded-sm text-white bg-primary inline-flex items-center justify-center"
      >
        <app-icon :aria-hidden="modelValue" icon="check" :size="18" />
      </div>
      <div
        v-else
        class="w-6 h-6 rounded-sm ring-1 ring-grey-100/25 bg-white dark:bg-black-300"
      ></div>

      <span class="overflow-hidden pointer-events-none absolute z-0 inset-0 rounded-full"></span>
    </span>
  </app-form-item>
</template>
