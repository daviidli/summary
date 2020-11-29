<template>
	<BaseButton
		class="w-7 h-7 p-1 mx-1 shadow-none \
			md:p-1 md:w-9 md:h-9 \
			hover:bg-rose-400 hover:bg-opacity-50 hover:shadow-md"
		:icon="icon"
		:message="message"
		@button-clicked="() => this.$emit(eventName)"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseButton from '@/components/buttons/BaseButton.vue';

@Component({
	components: {
		BaseButton,
	},
})
export default class Sentence extends Vue {
	@Prop() private icon!: string;

	@Prop() private eventName!: string;

	@Prop() private message: string | undefined;
}
</script>
