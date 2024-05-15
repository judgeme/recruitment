<script setup lang="ts">
import * as yup from 'yup';
import { useForgotPassword } from '@/composables/useAuth';

import AppTextFieldWithHook from '@/components/shared/AppTextField/WithHook.vue';
import AppForm from '@/components/shared/AppForm/index.vue';
import AppCard from '@/components/shared/AppCard/index.vue';
import AppButton from '@/components/shared/AppButton/index.vue';
import type { SubmissionContext } from 'vee-validate';

const initialValues = {
  email: ''
};

const validationSchema = yup.object({
  email: yup.string().required('email is required').email('please provide a valid email')
});

const { onRequestPassword } = useForgotPassword();

const onSubmit = async (
  values: typeof initialValues,
  actions: SubmissionContext<typeof initialValues>
) => {
  try {
    await onRequestPassword(values.email);
    actions.resetForm();
  } catch (error) {
    //
  }
};
</script>
<template>
  <div class="max-w-screen-xl mx-auto">
    <app-card class="m-auto w-full md:max-w-80 py-30">
      <p class="text-primary text-2xl tracking-wider font-bold text-center mb-10">
        Forgot Password
      </p>
      <app-form
        @submit="onSubmit"
        :initial-values="initialValues"
        :validation-schema="validationSchema"
        #default="{ meta }"
      >
        <app-text-field-with-hook
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email"
        />

        <app-button class="mt-4" fullWidth :disabled="!meta.valid">Submit</app-button>
      </app-form>
    </app-card>
  </div>
</template>
