<script setup lang="ts">
import { defineProps, withDefaults, defineOptions } from 'vue';
import { useField } from 'vee-validate';
import AppTextField, { type Props } from '@/components/shared/AppTextField/index.vue';

interface WithHooksProps extends Props {
  name: string; // name is required here
  type?: 'email' | 'number' | 'password' | 'text';
  required?: boolean;
}

defineOptions({
  name: 'AppTextFieldWithHook' // set up display name in dev-tools
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
  <app-text-field
    :label="label"
    :helper-text="errorMessage"
    :invalid="!!errorMessage"
    :name="name"
    :model-value="value"
    :id="id"
    :type="type"
    :required="required"
    :disabled="disabled"
    @update:model-value="handleChange"
    @blur="handleBlur"
  />
</template>