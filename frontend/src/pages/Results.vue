<template>
	<div class="flex items-center justify-center h-full">
		<h1>Hello world</h1>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import {
	SummaryResult, SummarySelection, TextRankInfo, RakeInfo,
} from '../interfaces/SummaryResult';

const serverUrl = 'http://localhost:4000/summary/url/';

@Component
export default class Results extends Vue {
	private results: SummaryResult = {};

	async queryServer() {
		const { url, textRank, rake } = this.$route.query;

		try {
			if (url && (textRank || rake)) {
				const selections: SummarySelection = {};

				if (textRank) {
					selections.textRank = [TextRankInfo.Text, TextRankInfo.Sentences, TextRankInfo.Ranks];
				}

				if (rake) {
					selections.rake = [RakeInfo.Text, RakeInfo.Sentences, RakeInfo.Ranks, RakeInfo.Keywords];
				}

				this.results = await axios.post(serverUrl, {
					url,
					selections,
				});
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
