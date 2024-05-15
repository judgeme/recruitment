<script setup lang="ts">
import { withDefaults } from 'vue';

import AppIcon from '@/components/shared/AppIcon/index.vue';
import AppFormItem from '@/components/shared/AppFormItem/index.vue';

export type Props = {
  id?: string;
  label?: string;
  helperText?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  ratings?: number;
  name?: string;
};

const props = withDefaults(defineProps<Props>(), {
  ratings: 5
});

const modelValue = defineModel<number>({
  default: 0
});

const setRating = (value: number) => {
  if (props.disabled) return;
  modelValue.value = value;
};
</script>

<template>
  <app-form-item
    :htmlFor="id"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :required="required"
  >
    <input :id="id" type="range" :name="name" min="0" :max="ratings" class="sr-only" />
    <div class="flex gap-1">
      <button
        v-for="star in ratings"
        :key="star"
        type="button"
        :aria-label="label"
        @click="setRating(star)"
        :class="{ 'text-secondary': star <= modelValue }"
        class="cursor-pointer text-grey-80"
      >
        <app-icon icon="star" :size="20" />
      </button>
    </div>
  </app-form-item>
</template>
