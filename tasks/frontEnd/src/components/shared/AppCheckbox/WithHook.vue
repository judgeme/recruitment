<script setup lang="ts">
import { defineProps, withDefaults, defineOptions } from 'vue';
import { useField } from 'vee-validate';
import AppCheckbox, { type Props } from '@/components/shared/AppCheckbox/index.vue';

interface WithHooksProps extends Props {
  name: string; // name is required here
  required?: boolean;
}

defineOptions({
  name: 'AppCheckboxWithHook' // set up display name in dev-tools
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
  <app-checkbox
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
