<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
//@ts-ignore
import StarRating from 'vue-star-rating'

const rating = ref(4)
const emit = defineEmits(['update:rating'])

watch(rating, (newRating) => {
  emit('update:rating', newRating)
})


</script>

<template>
  <star-rating
    v-model:rating="rating"
    activeColor="#308d97"
    :showRating="false"
    :roundedCorners="true"
    :borderWidth="3"
    borderColor="#308d97"
    :starSize="20"
    inactiveColor="#fff"
  />
</template>
