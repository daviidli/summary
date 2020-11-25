<template>
	<div id="app">
		<div class="flex justify-center w-screen h-screen bg-white dark:bg-trueGray-900">
			<div class="flex flex-col w-full h-full max-w-full lg:max-w-6xl">
				<Header @api="handleApiButton" />
				<Home v-if="state === 0" class="flex-grow mt-2 mb-6" @summarize="handleSummarize" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import axios from 'axios';
import Header from './components/Header.vue';
import AppState from './enums/AppState';
import Home from './pages/Home.vue';
import SummaryRequest from './interfaces/SummaryRequest';
import 'tailwindcss/tailwind.css';

@Component({
	components: {
		Header,
		Home,
	},
})
export default class App extends Vue {
	private state: AppState = AppState.Home;

	handleApiButton() {
		this.state = this.state === AppState.API ? AppState.Home : AppState.API;
	}

	handleSummarize(info: SummaryRequest) {
		console.log(info);
		// axios.post()
	}
}
</script>
