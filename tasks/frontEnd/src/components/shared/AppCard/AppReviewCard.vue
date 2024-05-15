<script setup lang="ts">
import { defineProps, withDefaults, defineOptions, computed } from 'vue';
import AppRating from '@/components/shared/AppRating/index.vue';
import AppIcon from '@/components/shared/AppIcon/index.vue';
import type { ReviewModel } from '@/models';

// set display name in dev-tools
defineOptions({
  name: 'AppReviewCard'
});

const emit = defineEmits<{
  openImage: [value: string];
  onEditReview: [value: ReviewModel];
  onDeleteReview: [value: string];
}>();

const props = withDefaults(defineProps<ReviewModel>(), {});

/*notice api ratings are greater than 5, 
and they are strings instead of numbers
maybe not be needed in other scenario */
const rating = computed(() => {
  const value = props.review.rating;
  const newValue = typeof value === 'string' ? parseInt(value) : value;
  if (newValue > 5 && newValue < 10) {
    return newValue / 2;
  }
  return newValue;
});

const onOpenImage = (img: string) => {
  emit('openImage', img);
};
const onEditReview = () => {
  // emit the current review object
  emit('onEditReview', props);
};
const onDeleteReview = (id: string) => {
  emit('onDeleteReview', id);
};
</script>
<template>
  <div
    class="flex flex-col md:flex-row justify-start gap-10 border-grey-60 last-of-type:border-0 last-of-type:pb-0 border-b py-6"
  >
    <div class="w-full md:w-60">
      <p class="text-sm text-primary font-medium mb-2 truncate" :title="reviewer.name">
        {{ reviewer.name }}
      </p>
      <p class="text-xs font-light text-primary truncate mb-4" :title="reviewer.email">
        {{ reviewer.email }}
      </p>
      <p class="text-xs font-light text-primary truncate mb-4" v-if="review.verifiedPurchase">
        Verified Purchase ✔️
      </p>
      <span class="text-xs font-light text-white truncate p-2 bg-primary" :title="reviewer.email">
        {{ shopName }}
      </span>
      <div class="flex gap-5 mt-10">
        <button
          class="p-2 text-danger transition-colors rounded-full bg-white shadow-lg hover:bg-primary"
          @click="onDeleteReview(id)"
        >
          <app-icon icon="trash" :size="20" />
        </button>
        <button
          class="p-2 text-primary transition-colors rounded-full bg-white shadow-lg hover:bg-primary hover:text-white"
          @click="onEditReview"
        >
          <app-icon icon="pen" :size="20" />
        </button>
      </div>
    </div>
    <!-- rating and body -->
    <div class="w-100 max-w-100">
      <!-- stars -->
      <div class="mb-4">
        <app-rating :model-value="rating" disabled />
      </div>
      <p class="text-sm text-primary font-medium mb-2">{{ review.reviewTitle }}</p>
      <div class="text-xs font-light text-primary">{{ review.reviewBody }}</div>
    </div>
    <!-- photos -->
    <div class="flex-1">
      <ul class="flex flex-wrap gap-3">
        <li
          v-for="reviewImage in review.reviewImages"
          :key="reviewImage"
          class="flex basis-full md:basis-1/4 items-center w-25 h-25"
        >
          <button
            class="bg-grey-60 h-full w-full border-grey-80 overflow-hidden"
            @click="onOpenImage(reviewImage)"
          >
            <img class="w-full h-full" :src="reviewImage" :alt="reviewImage" decoding="async" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
