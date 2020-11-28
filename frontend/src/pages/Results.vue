<template>
	<div class="flex items-center justify-center h-full">
		<Sentences v-if="results && results.textRank" :ranks="results.textRank.ranks" title="Text Rank"></Sentences>
		<Sentences v-if="results && results.rake" :ranks="results.rake.ranks" title="Rake"></Sentences>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import Sentences from '@/components/Sentences.vue';
import {
	SummaryResult, SummarySelection, TextRankInfo, RakeInfo,
} from '../interfaces/SummaryResult';

const serverUrl = 'http://localhost:8000/summary/url/';

@Component({
	components: {
		Sentences,
	},
})
export default class Results extends Vue {
	private results: SummaryResult = {};

	calculatePercentage(results: SummaryResult) {
		const parsedResults: SummaryResult = {};

		if (results.textRank !== undefined && results.textRank.ranks !== undefined) {
			let maxScore = Number.MIN_VALUE;
			let minScore = Number.MAX_VALUE;
			results.textRank.ranks.forEach((rank) => {
				if (rank.score !== undefined) {
					maxScore = maxScore > rank.score ? maxScore : rank.score;
					minScore = minScore < rank.score ? minScore : rank.score;
				}
			});

			parsedResults.textRank = {};
			parsedResults.textRank.ranks = results.textRank.ranks.map((rank) => ({
				...rank,
				percentage: rank.score === undefined ? undefined : (rank.score - minScore) / (maxScore - minScore),
			}));
		}

		if (results.rake !== undefined && results.rake.ranks !== undefined) {
			let maxScore = Number.MIN_VALUE;
			let minScore = Number.MAX_VALUE;
			results.rake.ranks.forEach((rank) => {
				if (rank.score !== undefined) {
					maxScore = maxScore > rank.score ? maxScore : rank.score;
					minScore = minScore < rank.score ? minScore : rank.score;
				}
			});

			parsedResults.rake = {};
			parsedResults.rake.ranks = results.rake.ranks.map((rank) => ({
				...rank,
				percentage: rank.score === undefined ? undefined : (rank.score - minScore) / (maxScore - minScore),
			}));
		}

		return parsedResults;
	}

	async queryServer() {
		const { url, textRank, rake } = this.$route.query;

		try {
			if (url && (textRank === '1' || rake === '1')) {
				const selections: SummarySelection = {};

				if (textRank === '1') {
					selections.textRank = [TextRankInfo.Ranks];
				}

				if (rake === '1') {
					selections.rake = [RakeInfo.Ranks];
				}

				const results = await axios.post(serverUrl, {
					url,
					selections,
				});

				const a = this.calculatePercentage(results.data);

				console.log(JSON.parse(JSON.stringify(a)));

				this.results = a;
			} else {
				// todo: show error message
				console.log('else');
			}
		} catch (err) {
			// todo: show error message
			console.log('err', err);
		}
	}

	async created() {
		await this.queryServer();
	}

	@Watch('$route')
	async onChildChanged(val: any, oldVal: any) {
		await this.queryServer();
	}
}
</script>