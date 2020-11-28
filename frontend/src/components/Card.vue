<template>
	<div class="flex items-center h-32 rounded-lg shadow-lg justify-evenly bg-trueGray-200 dark:bg-trueGray-700">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {}
</script>
