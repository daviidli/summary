<template>
	<div class="flex flex-col items-center justify-center h-full">
		<p class="text-3xl dark:text-white">Page doesn't exist 😱</p>
		<button class="p-2 mt-3 font-semibold text-white rounded-lg bg-rose-600" @click="goHome">Go Home</button>
	</div>
</template>

<script lang="ts">
import { Routes } from '@/router';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Any extends Vue {
	goHome() {
		this.$router.push(Routes.Home);
	}
}
</script>
