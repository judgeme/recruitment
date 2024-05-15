<script setup lang="ts">
import { defineProps, withDefaults, defineModel, defineOptions, defineEmits } from 'vue';
import type { TextareaHTMLAttributes } from 'vue';

import AppFormItem from '@/components/shared/AppFormItem/index.vue';

// extends InputHTMLAttributes to have access to native input props
export interface Props extends /* @vue-ignore */ TextareaHTMLAttributes {
  id?: string;
  name?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  helperText?: string;
  autoComplete?: string;
}

withDefaults(defineProps<Props>(), {
  autoComplete: 'off'
});

defineOptions({
  name: 'AppTextAreaField', // set up display name in dev-tools
  inheritAttrs: false
});

defineEmits<{
  blur: [value: FocusEvent];
  'update:model-value': [value: string];
}>();

const modelValue = defineModel<string>();
</script>
<template>
  <app-form-item
    :htmlFor="id"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :required="required"
  >
    <textarea
      v-model="modelValue"
      v-bind="$attrs"
      class="
        appearance-none block w-full 
        py-[15px] px-5 font-inherit font-light 
        text-input text-primary bg-white 
        border outline-0 transition-colors 
        focus:bg-fairy placeholder:text-grey-40
        disabled:cursor-not-allowed
      "
      :class="invalid ? 'border-danger' : 'border-grey-60'"
      :id="id"
      :required="required"
      :name="name"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @blur="$emit('blur', $event)"
    />
  </app-form-item>
</template>
