<script setup lang="ts">
import { defineProps, withDefaults, defineModel, defineOptions, defineEmits, computed } from 'vue';
import type { InputHTMLAttributes } from 'vue';

import AppFormItem from '@/components/shared/AppFormItem/index.vue';

// extends InputHTMLAttributes to have access to native input props
export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id?: string;
  name?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  type?: 'email' | 'number' | 'password' | 'text';
  required?: boolean;
  invalid?: boolean;
  helperText?: string;
  autoComplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  autoComplete: 'off'
});

defineOptions({
  name: 'AppTextField', // set up display name in dev-tools
  inheritAttrs: false
});

defineEmits<{
  blur: [value: FocusEvent];
  'update:model-value': [value: string];
}>();

const modelValue = defineModel<string>();

const computedClass = computed(() => {
  const invalidStyles = props.invalid ? 'border-danger' : 'border-grey-60';
  const disabledStyles = { '!bg-fairy': props.disabled };
  return [invalidStyles, disabledStyles];
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
    <input
      v-model="modelValue"
      v-bind="$attrs"
      class="appearance-none block w-full py-[15px] px-5 font-inherit font-light text-input text-primary bg-white border outline-0 transition-colors focus:bg-fairy placeholder:text-grey-40 disabled:cursor-not-allowed"
      :class="computedClass"
      :id="id"
      :required="required"
      :name="name"
      :type="type"
      :disabled="disabled"
      :autocomplete="autoComplete"
      @blur="$emit('blur', $event)"
    />
  </app-form-item>
</template>
