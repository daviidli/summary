<template>
	<Card class="lg:max-w-lg">
		<div class="flex justify-between w-full mb-5 align-start">
			<h1 class="font-serif text-2xl italic font-bold md:text-3xl">{{ title }}</h1>
			<div class="inline-block">
				<CardButton
					v-if="this.rankOrder"
					eventName="inorder"
					:icon="['fas', 'sort-numeric-down']"
					message="Sort By Text Order"
					@inorder="toggleOrder"
				/>
				<CardButton
					v-if="!this.rankOrder"
					eventName="rankorder"
					:icon="['fas', 'sort-amount-down']"
					message="Sort By Rank Order"
					@rankorder="toggleOrder"
				/>
				<CardButton
					v-if="this.summaryShown"
					eventName="full"
					:icon="['fas', 'expand-alt']"
					message="Show Full Text"
					@full="toggleSummary"
				/>
				<CardButton
					v-if="!this.summaryShown"
					eventName="summary"
					:icon="['fas', 'compress-alt']"
					message="Show Summary Only"
					@summary="toggleSummary"
				/>
			</div>
		</div>
		<Sentence v-for="rank of currentRanks" :key="rank.sentence" :item="rank" />
	</Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons/faSortNumericDown';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons/faSortAmountDown';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import Card from '@/components/Card.vue';
import Sentence from '@/components/Sentence.vue';
import CardButton from '@/components/CardButton.vue';
import { Rank } from '@/interfaces/SummaryResult';

library.add(faSortNumericDown, faSortAmountDown, faExpandAlt, faCompressAlt);

@Component({
	components: {
		Card,
		Sentence,
		CardButton,
	},
})
export default class Sentences extends Vue {
	@Prop() private ranks!: Rank[];

	@Prop() private title!: string;

	private rankOrder = true;

	private summaryShown = true;

	get currentRanks() {
		let result = this.ranks;

		if (this.summaryShown) {
			result = result.slice(0, 3);
		}

		if (!this.rankOrder) {
			result = [...result].sort((a, b) => {
				if (a.sentenceIndex < b.sentenceIndex) return -1;
				if (a.sentenceIndex > b.sentenceIndex) return 1;
				return 0;
			});
		}

		return result;
	}

	toggleOrder() {
		this.rankOrder = !this.rankOrder;
	}

	toggleSummary() {
		this.summaryShown = !this.summaryShown;
	}
}
</script>
