<script setup lang="ts">
import { toRefs, withDefaults, defineProps, defineEmits, defineOptions } from 'vue';
import type { Events } from 'vue';

// define component models
interface Props {
  show?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  defaultValue?: boolean;
  modalPositionClass?: string;
}
// set display name in dev-tools
defineOptions({
  name: 'AppModal'
});

// set default props
const props = withDefaults(defineProps<Props>(), {
  show: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  modalPositionClass: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4'
});
const emit = defineEmits(['hide']);

const { show } = toRefs(props);

const onClose = (event: Events['onClick']) => {
  // simple click outside logic...
  const nonActive = (event.target as HTMLElement).dataset.nonActive;
  if (nonActive) {
    emit('hide', false);
  }
};
</script>
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        role="presentation"
        aria-labelledby="ariaLabelledby"
        aria-describedby="ariaDescribedby"
        class="fixed z-[1000] inset-0"
        @click="onClose"
      >
        <div
          aria-hidden="true"
          class="fixed inset-0 flex justify-center items-center bg-black/60 w-full transition-opacity"
          data-non-active="true"
        ></div>
        <div
          class="absolute opacity-100"
          :class="modalPositionClass"
          data-non-active="true"
          tabindex="-1"
        >
          <slot :show="show" :on-close="onClose"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="css" scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
