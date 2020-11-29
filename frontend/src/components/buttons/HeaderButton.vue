<template>
	<BaseButton
		class="w-10 h-10 p-1 mx-1 shadow-md bg-warmGray-100 \
			md:p-2 md:mx-2 md:w-12 md:h-12 \
			hover:bg-pink-700 hover:text-white \
			focus:border-pink-800 \
			dark:bg-trueGray-800 dark:hover:bg-pink-700"
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
export default class HeaderButton extends Vue {
	@Prop() private icon!: string;

	@Prop() private eventName!: string;

	@Prop() private message: string | undefined;
}
</script>
