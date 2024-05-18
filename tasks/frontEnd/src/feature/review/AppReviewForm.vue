<script setup lang="ts">
import { computed, defineEmits, withDefaults, defineProps, ref, toRefs } from 'vue';
import * as yup from 'yup';
import { useCurrentUser } from 'vuefire';
import type { FormState, SubmissionContext } from 'vee-validate';

import AppModal from '@/components/shared/AppModal/index.vue';
import AppTextFieldWithHook from '@/components/shared/AppTextField/WithHook.vue';
import AppForm from '@/components/shared/AppForm/index.vue';
import AppCard from '@/components/shared/AppCard/index.vue';
import AppButton from '@/components/shared/AppButton/index.vue';
import AppTextAreaFieldWithHook from '@/components/shared/AppTextAreaField/WithHook.vue';
import AppCheckboxWithHook from '@/components/shared/AppCheckbox/WithHook.vue';
import AppRatingWithHook from '@/components/shared/AppRating/WithHook.vue';
import AppFileInputWithHook from '@/components/shared/AppFileInput/WithHook.vue';
import AppActivityLoader from '@/components/shared/AppActivityLoader/index.vue';
import ReviewService from '@/services/review';

import type { ReviewModel, ProductModel } from '@/models';

type Props = {
  showModal: boolean;
  product: ProductModel;
  review?: ReviewModel;
  mode?: 'add' | 'edit';
};

const emit = defineEmits<{
  hide: [];
}>();

const props = withDefaults(defineProps<Props>(), {
  mode: 'add'
});
const reviewService = new ReviewService();
const loading = ref(false);

const onHide = () => {
  emit('hide');
};

const user = useCurrentUser();
const { product, review: record } = toRefs(props);

const initialValues = computed(() => {
  const { shopName, name } = product.value;
  const { displayName, email } = user.value || {};
  const { review, reviewer } = record.value || {};

  return {
    shopName: shopName || '',
    productName: name || '',
    review: review
      ? {
          ...review,
          // notice sometimes this is a string, todo create a util function to fix this easily
          rating: typeof review.rating === 'string' ? parseInt(review.rating) : review.rating
        }
      : {
          rating: 0,
          reviewBody: '',
          reviewImages: [],
          reviewTitle: '',
          verifiedPurchase: false
        },
    reviewer: reviewer || {
      name: displayName || '',
      email: email || ''
    }
  };
});

const validationSchema = yup.object({
  shopName: yup.string().required('Please provide the shop name'),
  productName: yup.string().required('Please provide the product name'),
  review: yup.object({
    rating: yup.number().required('Please select your rating'),
    reviewBody: yup.string().required('Enter review body'),
    reviewTitle: yup.string().required('Enter review title')
  }),
  reviewer: yup.object({
    name: yup.string().required('Please provide your full name'),
    email: yup.string().required('Please provide your email').email()
  })
});

const onRestForm = (resetForm: (value: Partial<FormState<typeof initialValues.value>>) => void) => {
  resetForm(initialValues.value as Partial<FormState<typeof initialValues.value>>);
};

const onSubmit = async (
  values: typeof initialValues.value,
  actions: SubmissionContext<typeof initialValues.value>
) => {
  loading.value = true;
  try {
    if (props.mode === 'add') {
      await reviewService.addReview(values, product.value);
      actions.resetForm(initialValues as Partial<FormState<typeof initialValues.value>>);
    } else {
      // get review id as it's not available in form object
      const review = props.review as ReviewModel;
      await reviewService.editReview(
        {
          ...values,
          id: review?.id
        },
        product.value
      );
    }
    emit('hide');
  } catch (error) {
    // todo add a ui toaster
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <app-modal
    :show="showModal"
    aria-label="add review"
    aria-labelledby="review modal"
    @hide="onHide"
  >
    <app-activity-loader :loading="loading" data-non-active="true">
      <app-card class="md:max-w-[60%] max-h-[500px] mx-auto overflow-auto p-15">
        <p class="text-xl text-primary mb-10 font-semibold">
          {{ mode === 'add' ? 'Add Review' : 'Edit Review' }}
        </p>
        <app-form
          @submit="onSubmit"
          :initial-values="initialValues"
          :validation-schema="validationSchema"
          #default="{ meta, resetForm }"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <app-text-field-with-hook
              id="shopName"
              label="Shop Name"
              name="shopName"
              aria-label="shop name"
              placeholder="shop name"
              disabled
            />
            <app-text-field-with-hook
              id="productName"
              label="Product Name"
              name="productName"
              aria-label="shop name"
              placeholder="shop name"
              disabled
            />

            <app-text-field-with-hook
              id="reviewerEmail"
              label="Reviewer Email"
              name="reviewer.email"
              type="email"
              aria-label="email"
              placeholder="Email"
              disabled
              required
            />
            <app-text-field-with-hook
              id="reviewerName"
              label="Reviewer Name"
              name="reviewer.name"
              aria-label="email"
              placeholder="Full Name"
              required
            />
          </div>
          <hr class="bg-fairy my-10" />
          <div>
            <app-rating-with-hook
              id="reviewRating"
              label="Review Rating"
              name="review.rating"
              required
            />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
              <app-text-field-with-hook
                id="reviewTitle"
                label="Review Title"
                name="review.reviewTitle"
                aria-label="review title"
                placeholder="Review Title"
                required
              />
              <app-file-input-with-hook
                id="review images"
                label="Review Images"
                aria-label="review images"
                name="review.reviewImages"
                placeholder="Upload Images"
                multiple
              />
              <app-checkbox-with-hook
                id="verifiedPurchase"
                label="Verified Purchase"
                name="review.verifiedPurchase"
                aria-label="verified purchase"
                required
              />
            </div>

            <app-text-area-field-with-hook
              id="reviewBody"
              label="Review Body"
              name="review.reviewBody"
              aria-label="review body"
              placeholder="Review Body"
              required
              rows="4"
            />
          </div>
          <div class="flex flex-wrap justify-end gap-2 md:gap-6 mt-10">
            <app-button class="mt-4 basis-full md:basis-auto" :disabled="!meta.valid">
              {{ mode === 'add' ? 'Submit Review' : 'Edit Review' }}
            </app-button>
            <app-button
              variant="danger"
              class="mt-4 basis-full md:basis-auto"
              type="button"
              @click="onRestForm(resetForm)"
              >reset</app-button
            >
          </div>
        </app-form>
      </app-card>
    </app-activity-loader>
  </app-modal>
</template>
