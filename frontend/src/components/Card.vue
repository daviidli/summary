<template>
	<div class="p-4 m-4 rounded-lg shadow-lg md:p-8 bg-trueGray-200 dark:bg-trueGray-700 dark:text-white">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {}
</script>
