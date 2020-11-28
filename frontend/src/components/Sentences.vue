<template>
	<Card>
		<h1 class="mb-4 font-serif text-2xl italic font-bold md:text-3xl">{{ title }}</h1>
		<Sentence v-for="rank of ranks" :key="rank.sentence" :item="rank"></Sentence>
	</Card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Sentence from '@/components/Sentence.vue';
import { Rank } from '@/interfaces/SummaryResult';

@Component({
	components: {
		Card,
		Sentence,
	},
})
export default class Sentences extends Vue {
	@Prop() private ranks!: Rank[];

	@Prop() private title!: string;
}
</script>
