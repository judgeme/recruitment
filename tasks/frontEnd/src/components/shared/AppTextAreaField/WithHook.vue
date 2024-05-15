<script setup lang="ts">
import { defineProps, withDefaults, defineOptions } from 'vue';
import { useField } from 'vee-validate';
import AppTextAreaField, { type Props } from '@/components/shared/AppTextAreaField/index.vue';

interface WithHooksProps extends Props {
  name: string; // name is required here
  required?: boolean;
}

defineOptions({
  name: 'AppTextAreaFieldWithHook' // set up display name in dev-tools
});

const props = withDefaults(defineProps<WithHooksProps>(), {});

const { value, errorMessage, handleBlur, handleChange } = useField<string>(
  () => props.name,
  undefined,
  {
    syncVModel: true
  }
);
</script>
<template>
  <app-text-area-field
    :label="label"
    :helper-text="errorMessage"
    :invalid="!!errorMessage"
    :name="name"
    :model-value="value"
    :id="id"
    :required="required"
    :disabled="disabled"
    @update:model-value="handleChange"
    @blur="handleBlur"
  />
</template>
