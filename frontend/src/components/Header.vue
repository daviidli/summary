<template>
	<div class="flex justify-between w-full p-4 pt-6 align-middle h-18">
		<h1 class="inline-block font-serif text-4xl subpixel-antialiased italic font-bold cursor-pointer text-rose-500 md:text-5xl dark:text-rose-600" @click="handleHome">
			Summary
		</h1>
		<div class="inline-block">
			<a href="https://github.com/daviidli/summary" target="_blank">
				<Button eventName="github" :icon="['fab', 'github']" message="Github"></Button>
			</a>
			<Button eventName="api" :icon="['fas', 'sitemap']" message="API" @api="handleApi"></Button>
			<Button eventName="dark" :icon="['fas', 'adjust']" message="Toggle Dark Mode" @dark="handleDarkMode"></Button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faAdjust } from '@fortawesome/free-solid-svg-icons/faAdjust';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import Button from './Button.vue';
import { Routes } from '../router';

library.add(faSitemap, faAdjust, faGithub);

@Component({
	components: {
		Button,
	},
})
export default class Header extends Vue {
	handleApi() {
		this.$emit('api');
	}

	handleDarkMode() {
		const html = document.querySelector('html');
		if (html && html.classList.contains('dark')) {
			html.classList.remove('dark');
		} else if (html) {
			html.classList.add('dark');
		}
	}

	handleHome() {
		this.$router.push(Routes.Home);
	}
}
</script>
