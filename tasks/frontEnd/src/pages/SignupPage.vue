<script setup lang="ts">
import * as yup from 'yup';
import type { SubmissionContext } from 'vee-validate';

import AppTextFieldWithHook from '@/components/shared/AppTextField/WithHook.vue';
import AppForm from '@/components/shared/AppForm/index.vue';
import AppCard from '@/components/shared/AppCard/index.vue';
import AppButton from '@/components/shared/AppButton/index.vue';
import AppIcon from '@/components/shared/AppIcon/index.vue';
import { useSignUpEmailPassword, useProviderAuth } from '@/composables/useAuth';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = yup.object({
  email: yup.string().required('email is required').email('please provide a valid email'),
  password: yup
    .string()
    .required('password is required')
    .min(6, 'password should be a minimum of 6 characters')
});

const { onSignUp } = useSignUpEmailPassword();

const { onAuthApp } = useProviderAuth();
const { onAuthApp: onAuthAppGoogle } = useProviderAuth('google');

const onSubmit = async (
  values: typeof initialValues,
  actions: SubmissionContext<typeof initialValues>
) => {
  try {
    await onSignUp(values);
    actions.resetForm();
  } catch (error) {
    //
  }
};
</script>
<template>
  <div class="max-w-screen-xl mx-auto">
    <app-card class="m-auto w-full md:max-w-80 py-30">
      <p class="text-primary text-2xl tracking-wider font-bold text-center mb-10">Sign Up</p>
      <app-form
        @submit="onSubmit"
        :initial-values="initialValues"
        :validation-schema="validationSchema"
        #default="{ meta }"
      >
        <app-text-field-with-hook
          name="email"
          type="email"
          aria-label="email"
          placeholder="Email"
          required
        />
        <app-text-field-with-hook
          name="password"
          aria-label="password"
          type="password"
          placeholder="Password"
          required
        />
        <app-button class="mt-4" fullWidth :disabled="!meta.valid">Sign up</app-button>
      </app-form>
      <div class="my-10 relative">
        <span
          class="absolute inline-block text-sm bg-white px-3 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
          >Or</span
        >
        <hr class="bg-grey-light" />
      </div>
      <div class="flex gap-4 justify-center">
        <button
          class="rounded-full border-grey-light border p-2 inline-flex transition-colors items-center justify-center hover:bg-fairy scale-105"
          @click="onAuthApp"
        >
          <span class="sr-only">Sign In using Github</span>
          <app-icon :size="24" icon="github" />
        </button>
        <button
          class="rounded-full border-grey-light border p-2 inline-flex transition-colors items-center justify-center hover:bg-fairy scale-105"
          @click="onAuthAppGoogle"
        >
          <span class="sr-only">Sign In using Google</span>
          <app-icon :size="24" icon="google" />
        </button>
      </div>
    </app-card>
  </div>
</template>
