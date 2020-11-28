<template>
	<span>{{ item.sentence }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Rank } from '@/interfaces/SummaryResult';

@Component
export default class Sentence extends Vue {
	@Prop() private item!: Rank;
}
</script>
