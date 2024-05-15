<script setup lang="ts">
import { defineOptions } from 'vue';

// set display name in dev-tools
defineOptions({
  name: 'AppLoader'
});
</script>
<template>
	<span
		class="
			loader w-12 h-12 rounded-full 
			inline-block relative border-solid border-[3px]
			border-t-primary border-r-primary 
			border-b-transparent border-l-transparent
			after:absolute before:absolute 
			after:inset-0 before:inset-0
			after:m-auto before:m-auto 
			after:border-solid after:border-[3px]
			before:border-solid before:border-[3px] 
			after:border-t-transparent after:border-r-transparent
			after:border-b-primary after:border-l-primary
			after:w-10 after:h-10 after:rounded-full before:rounded-full
			before:w-8 before:h-8 before:border-t-primary
			before:border-r-primary
			before:border-b-transparent before:border-l-transparent
			animate-spin
		"
	>
	</span>
</template>
<style lang="css" scoped>
.loader::after,
.loader::before {
	content: '';
	animation: rotationBack 0.5s linear infinite;
	transform-origin: center center;
}
.loader::before {
	animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
@keyframes rotationBack {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(-360deg);
	}
}
</style>
