<template>
	<div class="flex items-center justify-center">
		<div class="flex flex-col items-center justify-center w-full">
			<input
				placeholder="URL to summarize"
				v-model="url"
				class="w-11/12 px-3 py-2 mx-1 text-2xl bg-gray-100 border-2 border-gray-200 border-opacity-100 border-solid rounded-lg md:w-6/12 dark:bg-gray-800 dark:text-white dark:border-gray-700"
			>
			<div class="flex items-center justify-around w-11/12 mt-4 md:w-6/12">
				<label
					for="textrank"
					class="p-3 px-5 m-2 bg-gray-100 rounded-full w-44 dark:bg-gray-800 dark:text-white dark:border-gray-700"
				>
					<input
						id="textrank"
						type="checkbox"
						v-model="textRank"
						class="text-blue-600"
					>
					<span class="w-full h-full px-4 font-medium text-black dark:text-white">Text Rank</span>
				</label>
				<label
					for="rake"
					class="p-3 px-5 m-2 bg-gray-100 rounded-full w-44 dark:bg-gray-800 dark:text-white dark:border-gray-700"
				>
					<input
						id="rake"
						type="checkbox"
						v-model="rake"
						class="checked:bg-blue-600"
					>
					<span class="px-4 font-medium text-black dark:text-white">Rake</span>
				</label>
			</div>
			<button
				class="p-3 px-8 m-4 font-bold text-white rounded-lg shadow-md bg-rose-500 dark:bg-rose-600 disabled:opacity-50"
				:disabled="disabled"
				@click="summarize"
			>
				SUMMARIZE
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SummaryRequest from '../interfaces/SummaryRequest';

@Component
export default class Home extends Vue {
	private url = '';

	private textRank = false;

	private rake = false;

	get disabled() {
		return !(this.rake || this.textRank) || this.url.length === 0;
	}

	summarize() {
		console.log(this.url, this.textRank, this.rake);
		const info: SummaryRequest = {
			url: this.url,
			textRank: this.textRank,
			rake: this.rake,
		};
		this.$emit('summarize', info);
	}
}
</script>
