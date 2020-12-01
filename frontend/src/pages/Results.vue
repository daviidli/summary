<template>
	<div class="flex flex-wrap items-start justify-center">
		<Sentences v-if="results && results.textRank" :ranks="results.textRank.ranks" title="Text Rank" />
		<Sentences v-if="results && results.rake" :ranks="results.rake.ranks" title="Rake" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import Sentences from '@/components/Sentences.vue';
import {
	SummaryResult, SummarySelection, TextRankInfo, RakeInfo,
} from '../interfaces/SummaryResult';
import { Routes } from '../router';

const serverUrl = 'https://summsumm.herokuapp.com/summary/url/';

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

				this.results = this.calculatePercentage(results.data);
			} else {
				alert('No summarization methods selected.');
				this.$router.push(Routes.Home);
			}
		} catch (err) {
			alert(err);
			this.$router.push(Routes.Home);
		}
	}

	async created() {
		await this.queryServer();
	}

	@Watch('$route')
	async onChildChanged() {
		await this.queryServer();
	}
}
</script>
