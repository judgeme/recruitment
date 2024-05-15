<script setup lang="ts" generic="T extends GenericObject">
import { defineProps, defineEmits, defineOptions } from 'vue';
import { useForm } from 'vee-validate';
import type {
  GenericObject,
  SubmissionContext,
  InvalidSubmissionContext,
  FormOptions,
  TypedSchema,
  FlattenAndSetPathsType,
  GenericValidateFunction
} from 'vee-validate';

type FormSchema<TValues extends Record<string, unknown>> =
  | FlattenAndSetPathsType<TValues, GenericValidateFunction | string | GenericObject>
  | undefined;

type Props = FormOptions<T, unknown, FormSchema<T> | TypedSchema<T, unknown>>;

// set display name in dev-tools
defineOptions({
  name: 'AppForm'
});

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [values: T, actions: SubmissionContext<T>];
  onError: [ctx: InvalidSubmissionContext<T>];
}>();

const {
  isValidating,
  isSubmitting,
  isFieldDirty,
  isFieldTouched,
  isFieldValid,
  meta,
  handleSubmit,
  resetForm
} = useForm<T>(props);

const onSubmit = handleSubmit(
  (values, actions) => {
    emit('submit', values, actions);
  },
  (ctx) => emit('onError', ctx)
);
</script>
<template>
  <form @submit="onSubmit">
    <slot
      :meta="meta"
      :isValidating="isValidating"
      :isSubmitting="isSubmitting"
      :isFieldDirty="isFieldDirty"
      :isFieldTouched="isFieldTouched"
      :isFieldValid="isFieldValid"
      :resetForm="resetForm"
    />
  </form>
</template>
