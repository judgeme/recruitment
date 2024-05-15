<script setup lang="ts">
import { defineProps, withDefaults, defineOptions } from 'vue';
import { useField } from 'vee-validate';

import AppSelect, { type Props } from '@/components/shared/AppSelect/index.vue';

interface WithHooksProps extends Props {
  name: string; // name is required here
}

defineOptions({
  name: 'AppSelectWithHook', // set up display name in dev-tools
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
  <app-select
    :label="label"
    :helper-text="errorMessage"
    :invalid="!!errorMessage"
    :name="name"
    :model-value="value"
    :id="id"
    @update:model-value="handleChange"
    @blur="handleBlur"
  />
</template>
