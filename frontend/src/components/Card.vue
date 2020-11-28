<template>
	<div class="p-2 m-3 mb-8 rounded-lg shadow-lg w-12/12 md:w-11/12 md:p-6 bg-trueGray-200 dark:bg-trueGray-700 dark:text-white">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {}
</script>
