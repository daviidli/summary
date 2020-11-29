<template>
	<button
		@click="() => this.$emit('button-clicked')"
		class="border-0 rounded-full \
			focus:outline-none \
			dark:text-white dark:border-0"
		:title="message"
	>
		<font-awesome-icon :icon="icon" size="lg" class="inline-block" />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseButton extends Vue {
	@Prop() private icon!: string;

	@Prop() private message: string | undefined;
}
</script>
