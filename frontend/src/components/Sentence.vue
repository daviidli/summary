<template>
	<div
		class="p-1 my-2 font-sans rounded-md md:p-2 text-md md:text-xl"
		:style="percentageColour"
		:title="'Sentence ' + item.sentenceIndex + '\nScore: ' + item.score + '\nPercentage: ' + (item.percentage * 100).toFixed(1) + '%'"
	>
		{{ item.sentence.charAt(0).toUpperCase() + item.sentence.slice(1) + '. ' }}
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Rank } from '@/interfaces/SummaryResult';

const percentColours = [
	{ percent: 1.0, color: { r: 34, g: 197, b: 94 } },
	{ percent: 0.0, color: { r: 239, g: 68, b: 68 } },
];

@Component
export default class Sentence extends Vue {
	@Prop() private item!: Rank;

	get percentageColour() {
		const percent = this.item.percentage;

		if (percent === undefined) {
			return '#000';
		}

		let i;
		for (i = 1; i < percentColours.length - 1; i += 1) {
			if (percent <= percentColours[i].percent) {
				break;
			}
		}

		const lower = percentColours[i - 1];
		const upper = percentColours[i];
		const range = upper.percent - lower.percent;
		const rangePct = (percent - lower.percent) / range;
		const pctLower = 1 - rangePct;
		const pctUpper = rangePct;
		const colour = {
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
		};

		return {
			backgroundColor: `rgb(${[colour.r, colour.g, colour.b, 0.5].join(',')})`,
		};
	}
}
</script>
