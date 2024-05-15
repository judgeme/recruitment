<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults, defineOptions } from 'vue';

import { usePagination, DOTS } from '@/composables/usePagination';

// set display name in dev-tools
defineOptions({
  name: 'AppPagination'
});

const props = withDefaults(
  defineProps<{
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
  }>(),
  {
    siblingCount: 1
  }
);

const emit = defineEmits<{
  (event: 'onPageChange', num: number): void;
}>();

const { paginationRange } = usePagination(props);

const showPagination = computed(() => {
  // If there are less than 2 times in pagination range we shall not render the component
  // if (props.currentPage === 0 || paginationRange.value.length < 2) {
  //   return false;
  // }
  return true;
});

const onNext = () => {
  emit('onPageChange', props.currentPage + 1);
};

const onPrevious = () => {
  emit('onPageChange', props.currentPage - 1);
};

const lastPage = computed(() => paginationRange.value[paginationRange.value.length - 1]);

const anchorClass = `
	relative block bg-transparent 
	px-3 py-1.5 text-sm text-primary 
	transition-all duration-300 hover:bg-neutral-100 
`;
</script>
<template>
  <nav v-show="showPagination" aria-label="pagination">
    <ul class="list-style-none flex">
      <li @click="onPrevious">
        <button
          :class="[anchorClass, `${currentPage === 1 ? 'cursor-not-allowed' : ''}`]"
          aria-label="previous"
          :disabled="currentPage === 1"
        >
          <span class="page-link">Previous</span>
        </button>
      </li>
      <template v-for="pageNumber in paginationRange" :key="pageNumber">
        <li v-if="pageNumber === DOTS" :class="anchorClass">
          <span class="page-link">&#8230;</span>
        </li>
        <li v-else class="page-item">
          <button
            :class="[anchorClass, `${currentPage === pageNumber ? '!bg-primary !text-white' : ''}`]"
            :aria-label="`page number ${pageNumber}`"
            @click="$emit('onPageChange', pageNumber as number)"
          >
            {{ pageNumber }}
          </button>
        </li>
      </template>
      <li class="page-item">
        <button
          :class="[anchorClass, `${currentPage === lastPage ? 'cursor-not-allowed' : ''}`]"
          aria-label="next"
          :disabled="currentPage === lastPage"
          @click="onNext"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
