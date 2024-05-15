<script setup lang="ts">
import { defineProps, withDefaults, defineOptions, defineEmits, computed } from 'vue';
import type { InputHTMLAttributes } from 'vue';

import AppFormItem from '@/components/shared/AppFormItem/index.vue';

// extends InputHTMLAttributes to have access to native input props
export interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id?: string;
  name?: string;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  helperText?: string;
  autoComplete?: string;
  modelValue?: string | string[];
  multiple?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  autoComplete: 'off'
});

defineOptions({
  name: 'AppFileInput', // set up display name in dev-tools
  inheritAttrs: false
});

const emit = defineEmits<{
  blur: [value: FocusEvent];
  'update:model-value': [value: string | string[]];
}>();

const computedClass = computed(() => {
  const invalidStyles = props.invalid ? 'border-danger' : 'border-grey-60';
  const disabledStyles = { '!bg-fairy': props.disabled };
  return [invalidStyles, disabledStyles];
});

const onChange = (event: Event) => {
  // todo: change logic for production purpose
  const target = event.target as HTMLInputElement;
  if (props.multiple) {
    const values = target.files ? Array.from(target.files).map((file) => file.name) : [];
    emit('update:model-value', values);
    return;
  }
  emit('update:model-value', target.value);
};
</script>
<template>
  <app-form-item :label="label" :helper-text="helperText" :invalid="invalid" :required="required">
    <template #label-tag>
      <small class="block tracking-wide text-primary text-anchor font-medium mt-0 mb-1">{{
        label
      }}</small>
    </template>
    <label
      :for="id"
      class="appearance-none block w-full py-[15px] px-5 font-inherit font-light text-input text-primary bg-fairy border outline-0 transition-colors disabled:cursor-not-allowed"
      :class="computedClass"
    >
      <span v-if="modelValue && modelValue.length > 0 && multiple"
        >{{ modelValue.length }} items uploaded</span
      >
      <span v-else>{{ placeholder }}</span>
      <input
        v-bind="$attrs"
        class="sr-only"
        :id="id"
        :required="required"
        :name="name"
        type="file"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :multiple="multiple"
        @blur="$emit('blur', $event)"
        @change="onChange"
      />
    </label>
  </app-form-item>
</template>
