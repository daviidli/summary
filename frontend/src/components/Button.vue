<template>
	<button
		@click="handleClick"
		class="w-10 h-10 p-1 mx-1 border-0 rounded-full shadow-md bg-warmGray-100 md:p-2 md:mx-3 md:w-12 md:h-12 \
			hover:bg-pink-700 hover:text-white focus:outline-none focus:border-pink-800 \
			dark:bg-trueGray-800 dark:text-white dark:border-0 dark:hover:bg-pink-700"
		:title="message"
	>
		<font-awesome-icon :icon="icon" size="lg" class="inline-block" />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
	@Prop() private icon!: string;

	@Prop() private eventName!: string;

	@Prop() private message: string | undefined;

	handleClick() {
		this.$emit(this.eventName);
	}
}
</script>
